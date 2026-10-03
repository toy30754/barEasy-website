#!/usr/bin/env python3
"""Read-only static SEO checks. Python 3 standard library; no build required."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
from collections import Counter
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://bareasytaichung.shop'
errors = []

def check(ok, message):
    if not ok:
        errors.append(message)

class Document(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.tags, self.ids, self.headings, self.schemas = [], [], [], []
        self.title = ''
        self.in_title = False
        self.in_json = False
        self.json_text = ''
        self.feed(path.read_text(encoding='utf-8'))

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.tags.append((tag, a))
        if 'id' in a: self.ids.append(a['id'])
        if re.fullmatch('h[1-6]', tag): self.headings.append(int(tag[1]))
        if tag == 'title': self.in_title = True
        if tag == 'script' and a.get('type') == 'application/ld+json':
            self.in_json = True
            self.json_text = ''

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.in_json: self.json_text += data

    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'script' and self.in_json:
            try: self.schemas.append(json.loads(self.json_text))
            except ValueError as exc: errors.append(f'{self.path}: invalid JSON-LD: {exc}')
            self.in_json = False

    def meta(self, name):
        return [a.get('content', '') for t,a in self.tags if t == 'meta' and name in [a.get('name'), a.get('property')]]

docs = {p.resolve(): Document(p) for p in sorted(ROOT.rglob('*.html')) if '.git' not in p.parts}
titles, descriptions, canonicals = [], [], []
refs_checked = 0

def target_for(source, url):
    u = urlparse(url)
    if u.scheme and u.netloc != 'bareasytaichung.shop': return None, u.fragment
    if u.netloc and u.netloc != 'bareasytaichung.shop': return None, u.fragment
    p = (ROOT / u.path.lstrip('/')) if u.path.startswith('/') else source.parent / u.path
    if not u.path: p = source
    if p.is_dir(): p = p / 'index.html'
    return p.resolve(), unquote(u.fragment)

for path, d in docs.items():
    label = str(path.relative_to(ROOT))
    check(d.headings.count(1) == 1, f'{label}: expected exactly one H1')
    check(len(set(d.ids)) == len(d.ids), f'{label}: duplicate IDs')
    check(all(b <= a + 1 for a,b in zip(d.headings, d.headings[1:])), f'{label}: heading level jump')
    check(len(d.meta('description')) == 1 and bool(d.meta('description')[0]), f'{label}: missing/duplicate description')
    check(len(d.meta('viewport')) == 1, f'{label}: missing viewport')
    canonical = [a['href'] for t,a in d.tags if t == 'link' and a.get('rel') == 'canonical']
    if path.name != '404.html':
        check(len(canonical) == 1, f'{label}: missing/duplicate canonical')
    expected = ORIGIN + '/' + label.replace('index.html', '')
    if canonical:
        check(canonical[0] == expected, f'{label}: canonical {canonical[0]} != {expected}')
        check(d.meta('og:url') == canonical, f'{label}: OG URL mismatch')
    for key in ['og:title','og:description','og:image','og:image:alt','twitter:card']:
        check(len(d.meta(key)) == 1 and bool(d.meta(key)[0]), f'{label}: missing {key}')
    check(d.meta('og:title') == [d.title], f'{label}: title / OG mismatch')
    check(d.meta('og:description') == d.meta('description'), f'{label}: description / OG mismatch')
    favicon = [a for t,a in d.tags if t == 'link' and a.get('rel') == 'icon']
    check(bool(favicon), f'{label}: missing favicon')
    if path.name != '404.html':
        check(not any('noindex' in r.lower() for r in d.meta('robots')), f'{label}: indexable page is noindex')
        titles.append(d.title)
        descriptions.extend(d.meta('description'))
        canonicals.extend(canonical)
    else:
        check(any('noindex' in r.lower() for r in d.meta('robots')), '404 must be noindex')
    for t,a in d.tags:
        if t == 'img':
            check('alt' in a, f'{label}: image missing alt')
            check(a.get('width','').isdigit() and a.get('height','').isdigit(), f'{label}: image missing dimensions')
        if t == 'th': check(a.get('scope') in ['col','row','colgroup','rowgroup'], f'{label}: table header missing scope')
        if t == 'a' and 'data-web-href' in a:
            check(a['data-web-href'].startswith('/'), f'{label}: clean route lost')
            one,frag1 = target_for(path,a['href'])
            two,frag2 = target_for(path,a['data-web-href'])
            check((one,frag1) == (two,frag2), f'{label}: local / clean link mismatch')
        for key in ['href','src','data-web-href','srcset']:
            value = a.get(key)
            if not value: continue
            values = [v.strip().split()[0] for v in value.split(',')] if key == 'srcset' else [value]
            for url in values:
                check(not url.startswith(('http://bareasytaichung.shop','http://www.bareasytaichung.shop','https://www.bareasytaichung.shop')), f'{label}: noncanonical host reference')
                target, fragment = target_for(path,url)
                if target is None: continue
                refs_checked += 1
                check(target.exists(), f'{label}: broken {key}: {url}')
                if fragment and target in docs: check(fragment in docs[target].ids, f'{label}: broken fragment {url}')
    for key in ['og:image','twitter:image']:
        for url in d.meta(key):
            target,_ = target_for(path,url)
            check(url.startswith(ORIGIN+'/assets/') and target and target.is_file(), f'{label}: bad social image')
    check(bool(d.schemas), f'{label}: missing structured data')
    nodes = [n for g in d.schemas for n in g.get('@graph',[])]
    bar = next((n for n in nodes if n.get('@type') == 'BarOrPub'), {})
    check(all(bar.get(k) for k in ['name','url','logo','image','address','telephone','openingHoursSpecification','sameAs']), f'{label}: incomplete BarOrPub')
    check(bar.get('@id') == ORIGIN+'/#bar', f'{label}: inconsistent business identity')
    if len(path.relative_to(ROOT).parts) == 3 and path.relative_to(ROOT).parts[0] == 'blog':
        articles = [n for n in nodes if n.get('@type') == 'BlogPosting']
        check(len(articles) == 1, f'{label}: expected one BlogPosting')
        if articles:
            article = articles[0]
            check(article.get('datePublished') <= article.get('dateModified'), f'{label}: invalid article date order')
            check(article.get('@id') == expected+'#article', f'{label}: article ID mismatch')
            check(all(article.get(k) for k in ['headline','description','image','author','publisher','mainEntityOfPage','articleSection']), f'{label}: incomplete BlogPosting')
            times = [a.get('datetime') for t,a in d.tags if t == 'time']
            check(article.get('datePublished') in times and article.get('dateModified') in times, f'{label}: hidden article dates')

for name, values in [('titles',titles),('descriptions',descriptions),('canonicals',canonicals)]:
    check(all(v == 1 for v in Counter(values).values()), f'Duplicate {name}')
tree = ET.parse(ROOT/'sitemap.xml')
urls = [n.text for n in tree.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
check(set(urls) == set(canonicals), 'Sitemap must contain every indexable canonical and no others')
check(len(urls) == len(set(urls)), 'Duplicate sitemap entries')
robots = (ROOT/'robots.txt').read_text()
check('Sitemap: '+ORIGIN+'/sitemap.xml' in robots, 'robots.txt sitemap missing')
check(not re.search(r'^Disallow:\s*/\s*$',robots,re.M), 'robots.txt blocks website')
check('Allow: /' in robots, 'robots.txt must allow pages')
blog = docs[ROOT/'blog/index.html']
list_node = next(n for g in blog.schemas for n in g['@graph'] if n.get('@type') == 'ItemList')
check(list_node['numberOfItems'] == 10 and len(list_node['itemListElement']) == 10, 'Blog list must have ten articles')
dates = []
for item in list_node['itemListElement']:
    target,_=target_for(ROOT/'blog/index.html',item['url'])
    check(target in docs,'Blog list target missing')
    if target in docs:
        node=next(n for g in docs[target].schemas for n in g['@graph'] if n.get('@type')=='BlogPosting')
        dates.append(node['datePublished'])
check(dates == sorted(dates,reverse=True),'Blog articles must be newest first by original publication date')
for url in re.findall(r'url\([\'"]?([^\)\'\"]+)',(ROOT/'styles.css').read_text()):
    if not url.startswith('data:'):
        target,_=target_for(ROOT/'styles.css',url)
        if target:check(target.exists(),'Missing CSS asset: '+url)

if errors:
    print('\n'.join('FAIL: '+x for x in errors))
    raise SystemExit(1)
print(f'PASS: {len(docs)} HTML pages, {len(urls)} indexable URLs, 10 BlogPosting articles, {refs_checked} internal references.')
print('PASS: unique metadata; canonical/OG; headings; dimensions/alt; schema fields; local/clean links; sitemap; robots; article dates.')
print('Scope: static validation only. Use a browser for layout/interaction and the deployed host for redirect, status and performance checks.')

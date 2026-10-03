/* Progressive enhancement only. Content, navigation and FAQ work without JS. */
(() => {
  // Disk previews use explicit local index.html files. On the web, keep the
  // original clean routes so navigation does not need an index.html redirect.
  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    document.querySelectorAll('a[data-web-href]').forEach(link => {
      link.setAttribute('href', link.dataset.webHref);
    });
  }

  const header = document.querySelector('.site-header');
  if (document.body.classList.contains('home')) {
    const update = () => header.classList.toggle('scrolled', window.scrollY > 110);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  const navMenu = document.querySelector('.nav-menu');
  navMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { navMenu.open = false; });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navMenu?.open) {
      navMenu.open = false;
      navMenu.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', event => {
    if (navMenu?.open && !navMenu.contains(event.target)) navMenu.open = false;
  });

  const dialog = document.querySelector('#menu-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const dialogImage = document.querySelector('#dialog-image');
    const title = document.querySelector('#menu-dialog-title');
    const original = document.querySelector('#dialog-original');
    let trigger = null;
    document.querySelectorAll('[data-menu-image]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        trigger = link;
        dialogImage.src = link.dataset.menuImage;
        dialogImage.alt = link.dataset.title + '原始酒單';
        title.textContent = link.dataset.title;
        original.href = link.dataset.menuImage;
        dialog.showModal();
        document.body.classList.add('dialog-is-open');
        document.querySelector('#dialog-close').focus();
      });
    });
    document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) {
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
      }
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-is-open');
      trigger?.focus();
    });
  }

  const copyButton = document.querySelector('[data-copy-booking]');
  copyButton?.addEventListener('click', async () => {
    const message = document.querySelector('#booking-message');
    const status = document.querySelector('#copy-status');
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(message.innerText);
      status.textContent = '已複製。請貼到 Instagram、填妥資料，再由你送出。';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(message);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = '已選取範本文字，請手動複製後貼到 Instagram。';
    }
  });
})();

/* ==========================================================
   BAR EASY
   PURE JAVASCRIPT 3D FLIP BOOK
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const book =
            document.getElementById(
                "easyBook"
            );

        const prevButton =
            document.getElementById(
                "easyBookPrev"
            );

        const nextButton =
            document.getElementById(
                "easyBookNext"
            );

        const pageStatus =
            document.getElementById(
                "easyBookPage"
            );

        const openButton =
            document.getElementById(
                "easyBookOpen"
            );


        /*
            如果不是 Menu 頁，
            就直接停止。

            所以這段 JS 放在全站 script.js
            也沒問題。
        */
        if (
            !book ||
            !prevButton ||
            !nextButton ||
            !pageStatus
        ) {
            return;
        }


        /* ==================================================
           菜單圖片

           menu/index.html
           所以圖片路徑是：

           ../assets/menu/1.jpg

           如果你的檔名不同，
           只修改這裡。
        ================================================== */

        const menuPages = [

            {
                src:
                    "../assets/menu/1.jpg",

                alt:
                    "Bar Easy Taichung 特色調酒菜單"
            },

            {
                src:
                    "../assets/menu/2.jpg",

                alt:
                    "Bar Easy Taichung 特色調酒菜單第二頁"
            },

            {
                src:
                    "../assets/menu/3.jpg",

                alt:
                    "Bar Easy Taichung 經典調酒菜單"
            },

            {
                src:
                    "../assets/menu/4.jpg",

                alt:
                    "Bar Easy Taichung Whisky 威士忌菜單"
            },

            {
                src:
                    "../assets/menu/5.jpg",

                alt:
                    "Bar Easy Taichung Bottle 酒類菜單"
            },

            {
                src:
                    "../assets/menu/6.jpg",

                alt:
                    "Bar Easy Taichung 經典調酒菜單第二頁"
            },

            {
                src:
                    "../assets/menu/7.jpg",

                alt:
                    "Bar Easy Taichung 無酒精飲品與啤酒菜單"
            },

            {
                src:
                    "../assets/menu/8.jpg",

                alt:
                    "Bar Easy Taichung 主食披薩與甜點菜單"
            },

            {
                src:
                    "../assets/menu/9.jpg",

                alt:
                    "Bar Easy Taichung 炸物與佐酒小點菜單"
            }

        ];


        /* ==================================================
           DESKTOP / MOBILE
        ================================================== */

        const mobileQuery =
            window.matchMedia(
                "(max-width: 720px)"
            );


        let mobileMode =
            mobileQuery.matches;


        /* ==================================================
           STATE
        ================================================== */

        /*
            Desktop：

            currentSheet = 已經翻過幾張紙

            0
            = 封面還沒打開

            1
            = 封面翻開

            2
            = 第一張菜單紙翻開

            ...

        */

        let currentSheet = 0;


        /*
            Mobile：

            -1 = 封面

             0 = 菜單第 1 頁
             1 = 菜單第 2 頁
             ...
        */

        let mobilePage = -1;


        let isAnimating = false;


        /* ==================================================
           CREATE ELEMENT
        ================================================== */

        function createElement(
            tag,
            className
        ) {

            const element =
                document.createElement(
                    tag
                );


            if (className) {

                element.className =
                    className;

            }


            return element;

        }


        /* ==================================================
           MENU IMAGE
        ================================================== */

        function createImagePage(
            page
        ) {

            const wrapper =
                createElement(
                    "div",
                    "easy-menu-image-page"
                );


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                page.src;


            image.alt =
                page.alt;


            image.loading =
                "lazy";


            image.decoding =
                "async";


            image.draggable =
                false;

            // Intrinsic size reserves the menu image ratio before decoding.
            image.width = 750;
            image.height = 1235;


            wrapper.appendChild(
                image
            );


            return wrapper;

        }


        /* ==================================================
           COVER FRONT
        ================================================== */

        function createCover() {

            const cover =
                createElement(
                    "div",
                    "easy-book-cover"
                );


            cover.innerHTML = `

                <div
                    class="easy-cover-content"
                >

                    <p
                        class="easy-cover-small"
                    >
                        BAR EASY TAICHUNG
                    </p>


                    <h2
                        class="easy-cover-title"
                    >
                        Take it
                        <br>
                        <em>Easy.</em>
                    </h2>


                    <span
                        class="easy-cover-divider"
                    ></span>


                    <p
                        class="easy-cover-type"
                    >
                        COCKTAILS · WHISKY · FOOD
                    </p>


                    <p
                        class="easy-cover-year"
                    >
                        Menu Book · 2026
                    </p>

                </div>

            `;


            return cover;

        }


        /* ==================================================
           INSIDE COVER
        ================================================== */

        function createInsideCover() {

            const inside =
                createElement(
                    "div",
                    "easy-inside-cover"
                );


            inside.innerHTML = `

                <strong>
                    Welcome to Easy.
                </strong>

                <span></span>

                <p>
                    不必先懂酒。
                    告訴我們你喜歡的味道，
                    慢慢找到今晚想喝的一杯。
                </p>

            `;


            return inside;

        }


        /* ==================================================
           END PAGE
        ================================================== */

        function createEndPage() {

            const end =
                createElement(
                    "div",
                    "easy-end-page"
                );


            end.innerHTML = `

                <strong>
                    Take it Easy.
                </strong>

                <span>
                    SEE YOU TONIGHT
                </span>

            `;


            return end;

        }


        /* ==================================================
           CREATE FACE
        ================================================== */

        function createFace(
            type,
            content
        ) {

            const face =
                createElement(
                    "div",
                    `easy-book-face easy-book-${type}`
                );


            face.appendChild(
                content
            );


            return face;

        }


        /* ==================================================
           CREATE SHEET
        ================================================== */

        function createSheet(
            frontContent,
            backContent,
            index
        ) {

            const sheet =
                createElement(
                    "div",
                    "easy-book-sheet"
                );


            sheet.dataset.index =
                String(index);


            const front =
                createFace(
                    "front",
                    frontContent
                );


            const back =
                createFace(
                    "back",
                    backContent
                );


            sheet.appendChild(
                front
            );


            sheet.appendChild(
                back
            );


            return sheet;

        }


        /* ==================================================
           BUILD DESKTOP BOOK
        ================================================== */

        function buildDesktopBook() {

            book.innerHTML = "";


            currentSheet = 0;


            /*
                Sheet 0
                = 封面 + 封面內頁
            */

            const coverSheet =
                createSheet(

                    createCover(),

                    createInsideCover(),

                    0
                );


            book.appendChild(
                coverSheet
            );


            /*
                接下來：

                Front:
                1 / 3 / 5 / 7 / 9

                Back:
                2 / 4 / 6 / 8 / END

                翻頁後：

                左頁會看到 back
                右頁會看到下一張 front
            */

            let sheetIndex = 1;


            for (
                let i = 0;
                i < menuPages.length;
                i += 2
            ) {

                const frontPage =
                    createImagePage(
                        menuPages[i]
                    );


                let backPage;


                if (
                    menuPages[i + 1]
                ) {

                    backPage =
                        createImagePage(
                            menuPages[
                                i + 1
                            ]
                        );

                } else {

                    backPage =
                        createEndPage();

                }


                const sheet =
                    createSheet(
                        frontPage,
                        backPage,
                        sheetIndex
                    );


                book.appendChild(
                    sheet
                );


                sheetIndex++;

            }


            /*
                如果最後不是 End，
                再做一本後封概念。

                我們現在有 9 頁，
                所以上面最後 back 已經是 End。
            */


            updateDesktopBook();

        }


        /* ==================================================
           DESKTOP SHEETS
        ================================================== */

        function getSheets() {

            return Array.from(

                book.querySelectorAll(
                    ".easy-book-sheet"
                )

            );

        }


        /* ==================================================
           UPDATE DESKTOP
        ================================================== */

        function updateDesktopBook() {

            const sheets =
                getSheets();


            const total =
                sheets.length;


            sheets.forEach(
                function (
                    sheet,
                    index
                ) {

                    const flipped =
                        index <
                        currentSheet;


                    sheet.classList.toggle(
                        "is-flipped",
                        flipped
                    );


                    /*
                        Z-index：

                        還沒翻：
                        前面的紙在最上方。

                        已經翻：
                        越晚翻的紙
                        越靠左側上方。
                    */

                    if (flipped) {

                        sheet.style.zIndex =
                            String(
                                index + 1
                            );

                    } else {

                        sheet.style.zIndex =
                            String(
                                total +
                                (
                                    total -
                                    index
                                )
                            );

                    }

                }
            );


            book.classList.toggle(

                "is-closed",

                currentSheet === 0

            );


            book.classList.toggle(

                "is-finished",

                currentSheet === total

            );


            prevButton.disabled =
                currentSheet === 0;


            nextButton.disabled =
                currentSheet === total;


            if (openButton) {

                openButton.classList.toggle(

                    "is-hidden",

                    currentSheet !== 0

                );

            }


            updateDesktopStatus();

        }


        /* ==================================================
           DESKTOP PAGE STATUS
        ================================================== */

        function updateDesktopStatus() {

            if (
                currentSheet === 0
            ) {

                pageStatus.textContent =
                    "MENU BOOK";

                return;

            }


            const totalMenuPages =
                menuPages.length;


            /*
                打開封面時：

                左 = Inside Cover
                右 = Menu page 1
            */

            if (
                currentSheet === 1
            ) {

                pageStatus.textContent =
                    `PAGE 1 / ${totalMenuPages}`;

                return;

            }


            /*
                currentSheet 2

                已經翻過：
                cover + sheet 1

                左頁：
                menu 2

                右頁：
                menu 3
            */

            const leftPage =
                (
                    currentSheet - 1
                ) * 2;


            const rightPage =
                leftPage + 1;


            if (
                leftPage >
                totalMenuPages
            ) {

                pageStatus.textContent =
                    "END";

                return;

            }


            if (
                rightPage >
                totalMenuPages
            ) {

                pageStatus.textContent =
                    `PAGE ${leftPage} / ${totalMenuPages}`;

                return;

            }


            pageStatus.textContent =
                `PAGE ${leftPage} — ${rightPage}`;

        }


        /* ==================================================
           TURN NEXT DESKTOP
        ================================================== */

        function desktopNext() {

            if (isAnimating) {
                return;
            }


            const sheets =
                getSheets();


            if (
                currentSheet >=
                sheets.length
            ) {

                return;

            }


            const target =
                sheets[
                    currentSheet
                ];


            isAnimating = true;


            /*
                提升正在翻的紙
            */

            target.style.zIndex =
                "999";


            target.classList.add(
                "is-turning"
            );


            /*
                開始翻頁
            */

            target.classList.add(
                "is-flipped"
            );


            currentSheet++;


            /*
                讓動畫完成後
                重新整理正常 z-index
            */

            window.setTimeout(
                function () {

                    target.classList.remove(
                        "is-turning"
                    );


                    isAnimating = false;


                    updateDesktopBook();

                },

                950
            );


            /*
                狀態可以先更新
            */

            book.classList.remove(
                "is-closed"
            );


            updateDesktopStatus();


            prevButton.disabled =
                false;

        }


        /* ==================================================
           TURN PREVIOUS DESKTOP
        ================================================== */

        function desktopPrev() {

            if (isAnimating) {
                return;
            }


            if (
                currentSheet <= 0
            ) {

                return;

            }


            const sheets =
                getSheets();


            currentSheet--;


            const target =
                sheets[
                    currentSheet
                ];


            isAnimating = true;


            target.style.zIndex =
                "999";


            target.classList.add(
                "is-turning"
            );


            /*
                從左翻回右
            */

            target.classList.remove(
                "is-flipped"
            );


            book.classList.remove(
                "is-finished"
            );


            window.setTimeout(
                function () {

                    target.classList.remove(
                        "is-turning"
                    );


                    isAnimating = false;


                    updateDesktopBook();

                },

                950
            );


            updateDesktopStatus();


            nextButton.disabled =
                false;

        }


        /* ==================================================
           MOBILE

           手機不做真正左右雙書頁，
           因為字會太小。

           改成：
           一頁一頁 3D 翻動。

           仍然是 rotateY 3D。
        ================================================== */

        function buildMobileBook() {

            book.innerHTML = "";


            mobilePage = -1;


            renderMobilePage(
                "none"
            );

        }


        /* ==================================================
           MOBILE COVER
        ================================================== */

        function renderMobilePage(
            direction
        ) {

            book.innerHTML = "";


            const sheet =
                createElement(
                    "div",
                    "easy-book-sheet easy-mobile-sheet"
                );


            /*
                Mobile sheet
                使用 front 即可。

                翻頁動畫在 JS 控制。
            */

            const front =
                createElement(
                    "div",
                    "easy-book-face easy-book-front"
                );


            if (
                mobilePage === -1
            ) {

                front.appendChild(
                    createCover()
                );

            } else {

                front.appendChild(
                    createImagePage(
                        menuPages[
                            mobilePage
                        ]
                    )
                );

            }


            sheet.appendChild(
                front
            );


            /*
                手機只有單頁，
                CSS 覆寫成 width 100%
            */

            sheet.style.zIndex =
                "10";


            /*
                新頁進場
            */

            if (
                direction === "next"
            ) {

                sheet.style.transform =
                    "rotateY(70deg)";

                sheet.style.opacity =
                    "0";

            }


            if (
                direction === "prev"
            ) {

                sheet.style.transform =
                    "rotateY(-70deg)";

                sheet.style.opacity =
                    "0";

            }


            book.appendChild(
                sheet
            );


            requestAnimationFrame(
                function () {

                    requestAnimationFrame(
                        function () {

                            sheet.style.transition =
                                "transform 650ms cubic-bezier(.22,.72,.24,1), opacity 400ms ease";


                            sheet.style.transform =
                                "rotateY(0deg)";


                            sheet.style.opacity =
                                "1";

                        }
                    );

                }
            );


            updateMobileStatus();

        }


        /* ==================================================
           MOBILE STATUS
        ================================================== */

        function updateMobileStatus() {

            prevButton.disabled =
                mobilePage === -1;


            nextButton.disabled =
                mobilePage >=
                menuPages.length - 1;


            if (
                mobilePage === -1
            ) {

                pageStatus.textContent =
                    "MENU BOOK";


                if (openButton) {

                    openButton.classList.remove(
                        "is-hidden"
                    );

                }

            } else {

                pageStatus.textContent =
                    `PAGE ${mobilePage + 1} / ${menuPages.length}`;


                if (openButton) {

                    openButton.classList.add(
                        "is-hidden"
                    );

                }

            }

        }


        /* ==================================================
           MOBILE NEXT
        ================================================== */

        function mobileNext() {

            if (isAnimating) {
                return;
            }


            if (
                mobilePage >=
                menuPages.length - 1
            ) {

                return;

            }


            const oldSheet =
                book.querySelector(
                    ".easy-mobile-sheet"
                );


            isAnimating = true;


            /*
                舊頁向左翻走
            */

            if (oldSheet) {

                oldSheet.style.transition =
                    "transform 500ms cubic-bezier(.22,.72,.24,1), opacity 350ms ease";


                oldSheet.style.transform =
                    "rotateY(-85deg)";


                oldSheet.style.opacity =
                    "0";

            }


            window.setTimeout(
                function () {

                    mobilePage++;


                    renderMobilePage(
                        "next"
                    );


                    isAnimating = false;

                },

                430
            );

        }


        /* ==================================================
           MOBILE PREVIOUS
        ================================================== */

        function mobilePrev() {

            if (isAnimating) {
                return;
            }


            if (
                mobilePage <= -1
            ) {

                return;

            }


            const oldSheet =
                book.querySelector(
                    ".easy-mobile-sheet"
                );


            isAnimating = true;


            if (oldSheet) {

                oldSheet.style.transition =
                    "transform 500ms cubic-bezier(.22,.72,.24,1), opacity 350ms ease";


                oldSheet.style.transform =
                    "rotateY(85deg)";


                oldSheet.style.opacity =
                    "0";

            }


            window.setTimeout(
                function () {

                    mobilePage--;


                    renderMobilePage(
                        "prev"
                    );


                    isAnimating = false;

                },

                430
            );

        }


        /* ==================================================
           NEXT
        ================================================== */

        function nextPage() {

            if (mobileMode) {

                mobileNext();

            } else {

                desktopNext();

            }

        }


        /* ==================================================
           PREVIOUS
        ================================================== */

        function previousPage() {

            if (mobileMode) {

                mobilePrev();

            } else {

                desktopPrev();

            }

        }


        /* ==================================================
           BUTTON EVENTS
        ================================================== */

        nextButton.addEventListener(
            "click",
            nextPage
        );


        prevButton.addEventListener(
            "click",
            previousPage
        );


        if (openButton) {

            openButton.addEventListener(
                "click",
                nextPage
            );

        }


        /* ==================================================
           CLICK BOOK

           Desktop:

           點右頁 → 下一頁
           點左頁 → 上一頁

           封面 → 打開
        ================================================== */

        book.addEventListener(
            "click",
            function (event) {

                /*
                    手機直接點頁面
                    不自動翻，
                    避免誤觸。
                */

                if (mobileMode) {

                    if (
                        mobilePage === -1
                    ) {

                        nextPage();

                    }

                    return;

                }


                const rect =
                    book.getBoundingClientRect();


                const clickX =
                    event.clientX -
                    rect.left;


                /*
                    封面狀態
                */

                if (
                    currentSheet === 0
                ) {

                    nextPage();

                    return;

                }


                /*
                    右半 → 下一頁
                */

                if (
                    clickX >
                    rect.width / 2
                ) {

                    nextPage();

                }


                /*
                    左半 → 上一頁
                */

                else {

                    previousPage();

                }

            }
        );


        /* ==================================================
           KEYBOARD
        ================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                const active =
                    document.activeElement;


                /*
                    使用者正在輸入文字時
                    不處理鍵盤翻頁
                */

                if (
                    active &&
                    (
                        active.tagName ===
                        "INPUT" ||

                        active.tagName ===
                        "TEXTAREA" ||

                        active.tagName ===
                        "SELECT"
                    )
                ) {

                    return;

                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    nextPage();

                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    previousPage();

                }

            }
        );


        /* ==================================================
           TOUCH SWIPE
        ================================================== */

        let touchStartX = 0;

        let touchStartY = 0;


        book.addEventListener(
            "touchstart",
            function (event) {

                touchStartX =
                    event.changedTouches[0]
                        .clientX;


                touchStartY =
                    event.changedTouches[0]
                        .clientY;

            },

            {
                passive: true
            }
        );


        book.addEventListener(
            "touchend",
            function (event) {

                const endX =
                    event.changedTouches[0]
                        .clientX;


                const endY =
                    event.changedTouches[0]
                        .clientY;


                const deltaX =
                    endX -
                    touchStartX;


                const deltaY =
                    endY -
                    touchStartY;


                /*
                    如果上下移動比左右還大，
                    當作使用者正在捲動網站。
                */

                if (
                    Math.abs(deltaY) >
                    Math.abs(deltaX)
                ) {

                    return;

                }


                /*
                    太短不處理
                */

                if (
                    Math.abs(deltaX) <
                    45
                ) {

                    return;

                }


                /*
                    左滑
                    = 下一頁
                */

                if (
                    deltaX < 0
                ) {

                    nextPage();

                }


                /*
                    右滑
                    = 上一頁
                */

                else {

                    previousPage();

                }

            },

            {
                passive: true
            }
        );


        /* ==================================================
           RESPONSIVE SWITCH
        ================================================== */

        function rebuildBook() {

            mobileMode =
                mobileQuery.matches;


            isAnimating =
                false;


            if (mobileMode) {

                buildMobileBook();

            } else {

                buildDesktopBook();

            }

        }


        /*
            Chrome / Safari
        */

        if (
            mobileQuery.addEventListener
        ) {

            mobileQuery.addEventListener(
                "change",
                rebuildBook
            );

        }


        /*
            舊 Safari
        */

        else if (
            mobileQuery.addListener
        ) {

            mobileQuery.addListener(
                rebuildBook
            );

        }


        /* ==================================================
           INIT
        ================================================== */

        rebuildBook();

    }
);
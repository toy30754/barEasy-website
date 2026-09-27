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


/* =====================================================
   BAR EASY MENU BOOK
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const menuBook =
        document.getElementById("menuBook");

    const prevButton =
        document.getElementById("menuPrev");

    const nextButton =
        document.getElementById("menuNext");

    const pageNumber =
        document.getElementById("menuPageNumber");

    const openBookButton =
        document.getElementById("menuOpenBook");


    /* 如果這個頁面沒有 Menu Book，就不要執行 */
    if (
        !menuBook ||
        !prevButton ||
        !nextButton ||
        !pageNumber
    ) {
        return;
    }


    /* =================================================
       菜單圖片

       如果你的圖片不是 1.jpg ~ 9.jpg，
       只需要修改這裡。
    ================================================= */

    const menuPages = [

        {
            image: "../assets/menu/1.jpg",
            alt: "Bar Easy Taichung Special Signature 新歡特色調酒菜單"
        },

        {
            image: "../assets/menu/2.jpg",
            alt: "Bar Easy Taichung Old Signature 舊愛特色調酒菜單"
        },

        {
            image: "../assets/menu/3.jpg",
            alt: "Bar Easy Taichung Classic 經典調酒菜單"
        },

        {
            image: "../assets/menu/4.jpg",
            alt: "Bar Easy Taichung Whisky 威士忌單杯與單瓶菜單"
        },

        {
            image: "../assets/menu/5.jpg",
            alt: "Bar Easy Taichung Bottle 酒類單杯與單瓶菜單"
        },

        {
            image: "../assets/menu/6.jpg",
            alt: "Bar Easy Taichung Classic 經典調酒第二頁"
        },

        {
            image: "../assets/menu/7.jpg",
            alt: "Bar Easy Taichung Soft Drink 無酒精飲品與 Beer 啤酒菜單"
        },

        {
            image: "../assets/menu/8.jpg",
            alt: "Bar Easy Taichung Food 主食披薩甜點菜單"
        },

        {
            image: "../assets/menu/9.jpg",
            alt: "Bar Easy Taichung Food 炸物與佐酒小點菜單"
        }

    ];


    /* =================================================
       狀態
    ================================================= */

    /*
       Desktop：
       0 = 封面
       1 = 第 1、2 頁
       2 = 第 3、4 頁
       ...

       Mobile：
       0 = 封面
       1 = 圖片 1
       2 = 圖片 2
       ...
    */

    let currentPosition = 0;

    let previousPosition = 0;


    /* 判斷是不是手機 */
    function isMobile() {

        return window.matchMedia(
            "(max-width: 720px)"
        ).matches;

    }


    /* =================================================
       封面
    ================================================= */

    function renderCover(direction = "next") {

        menuBook.innerHTML = `

            <div
                class="menu-book-cover-wrap book-enter-${direction}"
            >

                <div
                    class="menu-book-cover"
                    id="bookCover"
                    role="button"
                    tabindex="0"
                    aria-label="翻開 Bar Easy Taichung 菜單"
                >

                    <span class="menu-cover-spine"></span>

                    <div class="menu-cover-content">

                        <p class="menu-cover-kicker">
                            BAR EASY TAICHUNG
                        </p>

                        <h2 class="menu-cover-title">
                            Take it<br>
                            <em>Easy.</em>
                        </h2>

                        <span class="menu-cover-line"></span>

                        <p class="menu-cover-subtitle">
                            COCKTAILS · WHISKY · FOOD
                        </p>

                        <p class="menu-cover-tagline">
                            Menu Book · 2026
                        </p>

                    </div>

                </div>

            </div>

        `;


        pageNumber.textContent =
            "MENU BOOK";


        prevButton.disabled = true;

        nextButton.disabled = false;


        if (openBookButton) {

            openBookButton.classList.remove(
                "is-hidden"
            );

        }


        const cover =
            document.getElementById("bookCover");


        /* 點封面打開 */
        if (cover) {

            cover.addEventListener(
                "click",
                function () {

                    goNext();

                }
            );


            cover.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        goNext();

                    }

                }
            );

        }

    }


    /* =================================================
       Desktop 雙頁
    ================================================= */

    function renderDesktopSpread(direction) {

        const spreadIndex =
            currentPosition - 1;


        const leftIndex =
            spreadIndex * 2;


        const rightIndex =
            leftIndex + 1;


        const leftPage =
            menuPages[leftIndex];


        const rightPage =
            menuPages[rightIndex];


        let rightPageHTML = "";


        if (rightPage) {

            rightPageHTML = `

                <div class="menu-page menu-page-right">

                    <img
                        src="${rightPage.image}"
                        alt="${rightPage.alt}"
                        loading="lazy"
                        decoding="async"
                    >

                </div>

            `;

        } else {

            /* 奇數頁最後補一個漂亮尾頁 */

            rightPageHTML = `

                <div
                    class="
                        menu-page
                        menu-page-right
                        menu-page-empty
                    "
                >

                    <strong>
                        Take it Easy.
                    </strong>

                    <span>
                        SEE YOU TONIGHT
                    </span>

                </div>

            `;

        }


        menuBook.innerHTML = `

            <div
                class="
                    menu-spread
                    book-enter-${direction}
                "
            >

                <div class="menu-page menu-page-left">

                    <img
                        src="${leftPage.image}"
                        alt="${leftPage.alt}"
                        loading="lazy"
                        decoding="async"
                    >

                </div>

                ${rightPageHTML}

            </div>

        `;


        const displayLeft =
            leftIndex + 1;


        const displayRight =
            Math.min(
                rightIndex + 1,
                menuPages.length
            );


        if (
            displayLeft === displayRight
        ) {

            pageNumber.textContent =
                `PAGE ${displayLeft}`;

        } else {

            pageNumber.textContent =
                `PAGE ${displayLeft} — ${displayRight}`;

        }


        const maxSpread =
            Math.ceil(
                menuPages.length / 2
            );


        prevButton.disabled = false;


        nextButton.disabled =
            currentPosition >= maxSpread;


        if (openBookButton) {

            openBookButton.classList.add(
                "is-hidden"
            );

        }

    }


    /* =================================================
       Mobile 單頁
    ================================================= */

    function renderMobilePage(direction) {

        const pageIndex =
            currentPosition - 1;


        const page =
            menuPages[pageIndex];


        menuBook.innerHTML = `

            <div
                class="
                    menu-spread
                    book-enter-${direction}
                "
            >

                <div
                    class="
                        menu-page
                        menu-page-right
                        mobile-visible
                    "
                >

                    <img
                        src="${page.image}"
                        alt="${page.alt}"
                        loading="lazy"
                        decoding="async"
                    >

                </div>

            </div>

        `;


        pageNumber.textContent =
            `PAGE ${pageIndex + 1} / ${menuPages.length}`;


        prevButton.disabled = false;


        nextButton.disabled =
            currentPosition >= menuPages.length;


        if (openBookButton) {

            openBookButton.classList.add(
                "is-hidden"
            );

        }

    }


    /* =================================================
       Render
    ================================================= */

    function renderBook() {

        let direction =
            currentPosition >= previousPosition
                ? "next"
                : "prev";


        if (currentPosition === 0) {

            renderCover(direction);

            return;

        }


        if (isMobile()) {

            renderMobilePage(direction);

        } else {

            renderDesktopSpread(direction);

        }

    }


    /* =================================================
       下一頁
    ================================================= */

    function goNext() {

        previousPosition =
            currentPosition;


        if (isMobile()) {

            if (
                currentPosition <
                menuPages.length
            ) {

                currentPosition++;

            }

        } else {

            const maxSpread =
                Math.ceil(
                    menuPages.length / 2
                );


            if (
                currentPosition <
                maxSpread
            ) {

                currentPosition++;

            }

        }


        renderBook();

    }


    /* =================================================
       上一頁
    ================================================= */

    function goPrev() {

        previousPosition =
            currentPosition;


        if (
            currentPosition > 0
        ) {

            currentPosition--;

        }


        renderBook();

    }


    /* =================================================
       按鈕
    ================================================= */

    nextButton.addEventListener(
        "click",
        goNext
    );


    prevButton.addEventListener(
        "click",
        goPrev
    );


    if (openBookButton) {

        openBookButton.addEventListener(
            "click",
            function () {

                if (
                    currentPosition === 0
                ) {

                    goNext();

                }

            }
        );

    }


    /* =================================================
       鍵盤 ← →
    ================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            /*
                避免使用者正在 input 時
                被鍵盤翻頁
            */

            const active =
                document.activeElement;


            if (
                active &&
                (
                    active.tagName === "INPUT" ||
                    active.tagName === "TEXTAREA"
                )
            ) {

                return;

            }


            if (
                event.key === "ArrowRight"
            ) {

                goNext();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                goPrev();

            }

        }
    );


    /* =================================================
       手機 Swipe
    ================================================= */

    let touchStartX = 0;

    let touchEndX = 0;


    menuBook.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0]
                    .screenX;

        },
        {
            passive: true
        }
    );


    menuBook.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0]
                    .screenX;


            handleSwipe();

        },
        {
            passive: true
        }
    );


    function handleSwipe() {

        const distance =
            touchEndX -
            touchStartX;


        /*
            小於 45px 不處理，
            避免普通點擊被當翻頁
        */

        if (
            Math.abs(distance) < 45
        ) {

            return;

        }


        /*
            左滑 = 下一頁
        */

        if (distance < 0) {

            goNext();

        }


        /*
            右滑 = 上一頁
        */

        if (distance > 0) {

            goPrev();

        }

    }


    /* =================================================
       桌機 / 手機尺寸切換時重新計算
    ================================================= */

    let lastMobileState =
        isMobile();


    window.addEventListener(
        "resize",
        function () {

            const newMobileState =
                isMobile();


            if (
                newMobileState !==
                lastMobileState
            ) {

                lastMobileState =
                    newMobileState;


                /*
                    模式切換後回封面，
                    避免 Desktop spread index
                    跟手機 index 混在一起。
                */

                previousPosition = 0;

                currentPosition = 0;

                renderBook();

            }

        }
    );


    /* =================================================
       初次顯示
    ================================================= */

    renderBook();

});
document.addEventListener('DOMContentLoaded', () => {

    // ─── 元素選取 ───
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTop');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    // ─── 變數設定 ───
    let lastScrollTop = 0;
    const delta = 10;

    // ─── 整合後的捲動事件 ───
    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;

        // 1. 導覽列捲動隱藏/顯示邏輯
        if (Math.abs(lastScrollTop - st) > delta) {
            if (st > lastScrollTop && st > 80) {
                navbar.classList.add('nav-hidden');
            } else {
                navbar.classList.remove('nav-hidden');
            }
            lastScrollTop = st;
        }

        // 2. 回到頂部按鈕顯示邏輯 (超過 400px 顯示)
        if (st > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // ─── 滑鼠靠近頂部顯示 Navbar ───
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 50) navbar.classList.remove('nav-hidden');
    });

    // ─── 自動標示目前頁面導覽項目 ───
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link-item').forEach(link => {
        const href = (link.getAttribute('href') || '').split('/').pop();
        if (href && href === currentPath) link.classList.add('active-page');
    });

    // ─── 桌面版搜尋列 ───
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            if (!searchInput.classList.contains('open')) {
                searchInput.classList.add('open');
                searchInput.focus();
            } else {
                if (searchInput.value.trim()) alert('執行搜尋：' + searchInput.value);
                else searchInput.classList.remove('open');
            }
        });
    }

    // ─── 點擊按鈕回到最上方 ───
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });





    // ─── 登入邏輯（使用 sessionStorage 跨頁面保持狀態） ───
    const loginModal = document.getElementById('loginModal');
    const loginSubmit = document.getElementById('loginSubmit');
    const loginLinkDesktop = document.getElementById('loginLinkDesktop');
    const loginLinkMobile = document.getElementById('loginLinkMobile');
    const userDropdownWrap = document.getElementById('userDropdownWrap');
    const userDropdownBtn = document.getElementById('userDropdownBtn');
    const mobileUserMenu = document.getElementById('mobileUserMenu');
    const mobileWelcome = document.getElementById('mobileWelcome');

    if (!loginModal) return;

    // ── 確保 loginModal 在 <body> 最底層，不被 offcanvas 的 focus trap 影響 ──
    document.body.appendChild(loginModal);

    // ── 修正 loginModal：讓內部元素可以正常接收點擊與輸入 ──
    loginModal.style.pointerEvents = 'auto';
    loginModal.querySelector('div').style.pointerEvents = 'auto';

    const savedUsername = sessionStorage.getItem('dv_username');
    if (savedUsername) { updateNav(savedUsername); }

    // ─── 共用：開啟登入 modal ───
    function openLoginModal() {
        // 先關閉 offcanvas（手機版），再開 modal，避免 focus trap 衝突
        const offcanvasEl = document.getElementById('navMenu');
        if (offcanvasEl && window.bootstrap) {
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
                // 等 offcanvas 動畫結束後再顯示 modal
                offcanvasEl.addEventListener('hidden.bs.offcanvas', function onHidden() {
                    offcanvasEl.removeEventListener('hidden.bs.offcanvas', onHidden);
                    showModal();
                });
                return;
            }
        }
        showModal();
    }

    function showModal() {
        loginModal.style.display = 'flex';
        // 延遲一幀確保 display:flex 生效後再 focus
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const input = document.getElementById('loginName');
                if (input) {
                    input.focus();
                    // iOS Safari 需要額外觸發 click 才能彈出鍵盤
                    input.click();
                }
            });
        });
    }

    loginLinkDesktop?.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        openLoginModal();
    });

    loginLinkMobile?.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        openLoginModal();
    });

    // 點擊遮罩關閉
    loginModal.addEventListener('click', e => {
        if (e.target === loginModal) loginModal.style.display = 'none';
    });

    // 登入送出
    if (loginSubmit) {
        loginSubmit.addEventListener('click', () => {
            const nameInput = document.getElementById('loginName').value.trim();
            if (nameInput) {
                sessionStorage.setItem('dv_username', nameInput);
                loginModal.style.display = 'none';
                updateNav(nameInput);
            }
        });
    }

    // Enter 鍵送出
    const loginNameInput = document.getElementById('loginName');
    if (loginNameInput) {
        loginNameInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') loginSubmit?.click();
        });
    }

    function updateNav(username) {
        if (loginLinkDesktop) loginLinkDesktop.style.display = 'none';
        if (userDropdownWrap) {
            userDropdownWrap.style.display = 'block';
            if (userDropdownBtn) userDropdownBtn.textContent = `歡迎, ${username} ▾`;
        }
        if (loginLinkMobile) loginLinkMobile.style.display = 'none';
        if (mobileUserMenu) mobileUserMenu.classList.add('visible');
        if (mobileWelcome) mobileWelcome.textContent = `歡迎, ${username}`;
    }

    document.getElementById('logoutBtn')?.addEventListener('click', e => {
        e.preventDefault();
        sessionStorage.removeItem('dv_username');
        location.reload();
    });
    document.getElementById('logoutBtnMobile')?.addEventListener('click', e => {
        e.preventDefault();
        sessionStorage.removeItem('dv_username');
        location.reload();
    });
});
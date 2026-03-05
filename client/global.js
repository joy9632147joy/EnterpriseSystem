document.addEventListener('DOMContentLoaded', () => {

    // ─── 導覽列捲動隱藏/顯示 ───
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    const delta = 10;

    window.addEventListener('scroll', () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(lastScrollTop - st) <= delta) return;
        navbar.classList.toggle('nav-hidden', st > lastScrollTop && st > 80);
        lastScrollTop = st;
    });

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
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    searchBtn.addEventListener('click', () => {
        if (!searchInput.classList.contains('open')) {
            searchInput.classList.add('open');
            searchInput.focus();
        } else {
            if (searchInput.value.trim()) alert('執行搜尋：' + searchInput.value);
            else searchInput.classList.remove('open');
        }
    });

});
// ES-Helper.js - 系統共用互動邏輯

document.addEventListener('DOMContentLoaded', () => {
    
    // ================= 1. 側邊欄開合邏輯 =================
    // 支援 id="sidebar" (如 main_page) 或 id="sidebarN" (如 attendance)
    const sidebar = document.getElementById('sidebar');
    const hamburgerBtn = document.getElementById('sidebar-hamburger');

    if (hamburgerBtn && sidebar) {
        hamburgerBtn.addEventListener('click', function () {
            // 切換寬度 (w-64 展開, w-20 收縮保留圖示)
            if (sidebar.classList.contains('w-64')) {
                sidebar.classList.remove('w-64');
                sidebar.classList.add('w-20');
            } else {
                sidebar.classList.remove('w-20');
                sidebar.classList.add('w-64');
            }
        });
    }

    // ================= 2. 使用者下拉選單邏輯 =================
    const userMenuBtn = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');

    if (userMenuBtn && userDropdown) {
        // 點擊頭像切換選單
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('hidden');
        });

        // 點擊畫面其他地方自動關閉選單
        document.addEventListener('click', (e) => {
            if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.add('hidden');
            }
        });
    }
});
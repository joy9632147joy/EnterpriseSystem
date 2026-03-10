/**
 * DREAM VENUES 狀態管理大腦
 * 功能：同步電腦/手機導覽列、處理 JWT 與 Session、記住帳號
 */

const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 小時過期

document.addEventListener('DOMContentLoaded', () => {
    // 1. 頁面啟動：檢查登入狀態
    checkAuthStatus();

    // 2. 初始化 UI (僅在登入頁面會生效)
    initLoginFeatures();

    // 3. 綁定登出按鈕 (桌機 & 手機)
    document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);
    document.getElementById('logoutBtnMobile')?.addEventListener('click', handleLogout);
});

/**
 * 核心：檢查現在是誰在線
 */
function checkAuthStatus() {
    const user = sessionStorage.getItem('dv_username') || localStorage.getItem('dv_username');
    const token = sessionStorage.getItem('dv_token') || localStorage.getItem('dv_token');

    // ✅ 修復 Bug 1：登入時間要跟 token 存在同一個地方，這裡也要兩邊都查
    const loginTime = sessionStorage.getItem('dv_login_time') || localStorage.getItem('dv_login_time');
    const now = Date.now();

    if (user && token) {
        if (loginTime && (now - loginTime > SESSION_TIMEOUT)) {
            forceLogout();
            return;
        }
        syncNavbarUI(true, user);
    } else {
        syncNavbarUI(false);
    }
}

/**
 * UI 變身：同步更新電腦與手機的導覽列
 */
function syncNavbarUI(isLoggedIn, username = "") {
    // --- 電腦版元素 ---
    const deskLogin = document.getElementById('loginLinkDesktop');
    const deskUserWrap = document.getElementById('userDropdownWrap');
    const deskUserBtn = document.getElementById('userDropdownBtn');

    // --- 手機版元素 ---
    const mobLogin = document.getElementById('loginLinkMobile');
    const mobUserMenu = document.getElementById('mobileUserMenu');
    const mobWelcome = document.getElementById('mobileWelcome');
    const mobLogout = document.getElementById('logoutBtnMobile'); 

    if (isLoggedIn) {
        if (deskLogin) deskLogin.style.setProperty('display', 'none', 'important');
        if (mobLogin) mobLogin.style.setProperty('display', 'none', 'important');

        if (deskUserWrap) deskUserWrap.style.display = 'block';
        if (deskUserBtn) deskUserBtn.textContent = `歡迎, ${username} ▾`;

        if (mobUserMenu) mobUserMenu.style.display = 'block';
        if (mobWelcome) mobWelcome.textContent = `歡迎, ${username}`;
        if (mobLogout) mobLogout.style.display = 'block';
    } else {
        if (deskLogin) deskLogin.style.display = 'block';
        if (mobLogin) mobLogin.style.display = 'block';

        if (deskUserWrap) deskUserWrap.style.display = 'none';
        if (mobUserMenu) mobUserMenu.style.display = 'none';
        if (mobLogout) mobLogout.style.display = 'none';
    }
}

/**
 * 登入執行 (Mock API 或真實 Fetch)
 */
async function performLoginAction() {
    const email = document.getElementById('loginName')?.value.trim();
    const pass = document.getElementById('passwordInput')?.value.trim();
    const rememberMe = document.getElementById('rememberMe')?.checked;

    if (!email || !pass) return alert('請完整填寫電子郵件與密碼');

    console.log("正在驗證身份...", { email, isRememberMe: rememberMe });

    // 模擬成功回傳
    const mockResponse = {
        success: true,
        token: "eyJhbGciOiJIUzI1Ni...",
        username: email.split('@')[0]
    };

    if (mockResponse.success) {
        const storage = rememberMe ? localStorage : sessionStorage;

        storage.setItem('dv_token', mockResponse.token);
        storage.setItem('dv_username', mockResponse.username);

        // ✅ 修復 Bug 1：登入時間存到同一個 storage，不再固定寫 sessionStorage
        storage.setItem('dv_login_time', Date.now());

        // ✅ 修復 Bug 2：記住我時寫入 email，取消記住時清掉
        if (rememberMe) {
            localStorage.setItem('dv_remember_email', email);
        } else {
            localStorage.removeItem('dv_remember_email');
        }

        alert('登入成功，歡迎回到 DREAM VENUES');
        window.location.href = './index.html';
    }
}

/**
 * 登出處理
 */
function handleLogout(e) {
    e.preventDefault();
    forceLogout();
}

function forceLogout() {
    localStorage.removeItem('dv_token');
    localStorage.removeItem('dv_username');
    localStorage.removeItem('dv_login_time'); // ✅ 補上清除 localStorage 的登入時間
    sessionStorage.clear();

    alert('您已成功登出');
    window.location.href = './index.html';
}

/**
 * UI 輔助功能 (密碼眼睛、Enter 鍵)
 */
function initLoginFeatures() {
    // ✅ 修復 Bug 2：有存 email 才自動填入
    const savedEmail = localStorage.getItem('dv_remember_email');
    const emailField = document.getElementById('loginName');
    if (savedEmail && emailField) emailField.value = savedEmail;

    document.getElementById('loginSubmitBtn')?.addEventListener('click', performLoginAction);

    document.getElementById('passwordInput')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') performLoginAction();
    });
}

// 密碼眼睛切換 (供 HTML 的 onclick 呼叫)
function togglePassword(btn) {
    const input = document.getElementById('passwordInput');
    const icon = btn.querySelector('.material-symbols-outlined');
    if (!input) return;
    const isPass = input.type === 'password';
    input.type = isPass ? 'text' : 'password';
    icon.textContent = isPass ? 'visibility' : 'visibility_off';
}
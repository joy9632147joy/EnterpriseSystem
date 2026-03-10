/**
 * 全站登入與狀態管理邏輯
 */

// --- 配置區 ---
const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 小時 (毫秒)
const API_CONFIG = {
    isMock: true, // 之後串 Spring Boot 改成 false
    loginUrl: '/api/login' // 之後後端的路徑
};

// --- 頁面啟動：每一頁都會執行的邏輯 ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. 檢查登入是否過期
    checkSession();

    // 2. 初始化登入 Modal (如果當前頁面有 Modal 的話)
    initLoginUI();

    // 3. 綁定登出按鈕 (桌機 & 手機)
    document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);
    document.getElementById('logoutBtnMobile')?.addEventListener('click', handleLogout);
});

/**
 * 檢查 Session 狀態並更新 Navbar
 */
function checkSession() {
    const username = sessionStorage.getItem('dv_username');
    const loginTime = sessionStorage.getItem('dv_login_time');
    const now = Date.now();

    // 邏輯：有名字、有時間、且不到 1 小時
    if (username && loginTime && (now - loginTime < SESSION_TIMEOUT)) {
        updateNavbarToUser(username);
    } else {
        // 如果過期了，就清空資料並顯示登入按鈕
        clearSession();
        updateNavbarToGuest();
    }
}

/**
 * 更新 Navbar：顯示歡迎訊息，隱藏登入按鈕
 */
function updateNavbarToUser(username) {
    // 隱藏登入連結 (建議 HTML 加上 auth-login-link 這個 class)
    const loginLinks = document.querySelectorAll('.auth-login-link, #loginLinkDesktop, #loginLinkMobile');
    loginLinks.forEach(el => el.style.display = 'none');

    // 顯示使用者選單
    const userWrap = document.getElementById('userDropdownWrap');
    const userBtn = document.getElementById('userDropdownBtn');
    if (userWrap) userWrap.style.display = 'block';
    if (userBtn) userBtn.textContent = `歡迎, ${username} ▾`;
}

/**
 * 更新 Navbar：恢復成登入按鈕
 */
function updateNavbarToGuest() {
    const loginLinks = document.querySelectorAll('.auth-login-link, #loginLinkDesktop, #loginLinkMobile');
    loginLinks.forEach(el => el.style.display = 'block');

    const userWrap = document.getElementById('userDropdownWrap');
    if (userWrap) userWrap.style.display = 'none';
}

/**
 * 處理登入動作 (綁定在 Modal 的登入按鈕)
 */
async function performLogin() {
    const emailInput = document.getElementById('loginName');
    const passInput = document.getElementById('passwordInput');
    const rememberCheck = document.getElementById('rememberMe');

    const email = emailInput.value.trim();
    const pass = passInput.value.trim();

    if (!email || !pass) return alert('請輸入電子郵件與密碼！');

    // --- 準備發送給 Spring Boot 的資料 ---
    const loginRequest = { username: email, password: pass };

    try {
        console.log('驗證中...', loginRequest);
        
        // 未來這裡換成： const response = await fetch(API_CONFIG.loginUrl, { ... });
        // 目前模擬成功：
        const isSuccess = true; 

        if (isSuccess) {
            // 1. 處理「記住帳號」 (LocalStorage)
            if (rememberCheck.checked) {
                localStorage.setItem('dv_remember_email', email);
            } else {
                localStorage.removeItem('dv_remember_email');
            }

            // 2. 處理「登入狀態」 (SessionStorage + 時間戳記)
            sessionStorage.setItem('dv_username', email);
            sessionStorage.setItem('dv_login_time', Date.now());

            alert('登入成功！');
            // 跳轉至首頁或重整
            window.location.href = './index.html';
        }
    } catch (err) {
        alert('登入失敗，請檢查網路或帳密');
    }
}

/**
 * 清除登入狀態
 */
function clearSession() {
    sessionStorage.removeItem('dv_username');
    sessionStorage.removeItem('dv_login_time');
}

/**
 * 登出按鈕事件
 */
function handleLogout(e) {
    e.preventDefault();
    clearSession();
    alert('您已登出');
    window.location.reload();
}

/**
 * UI 小助手：初始化登入窗 (密碼切換、自動填入)
 */
function initLoginUI() {
    // 自動填入記住的帳號
    const savedEmail = localStorage.getItem('dv_remember_email');
    const emailInput = document.getElementById('loginName');
    const rememberCheck = document.getElementById('rememberMe');
    if (savedEmail && emailInput) {
        emailInput.value = savedEmail;
        if (rememberCheck) rememberCheck.checked = true;
    }

    // 綁定登入按鈕點擊 (如果是原本的 ID loginSubmitBtn)
    document.getElementById('loginSubmitBtn')?.addEventListener('click', performLogin);

    // Enter 鍵觸發
    document.getElementById('passwordInput')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') performLogin();
    });
}

/**
 * 密碼顯示/隱藏切換 (你原本寫的)
 */
function togglePassword(btn) {
    const input = document.getElementById('passwordInput');
    if (!input) return;
    const icon = btn.querySelector('.material-symbols-outlined');
    const isPass = input.type === 'password';
    input.type = isPass ? 'text' : 'password';
    icon.textContent = isPass ? 'visibility' : 'visibility_off';
}
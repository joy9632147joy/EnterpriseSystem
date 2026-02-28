document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("sidebar-hamburger");
    const sidebar = document.getElementById("sidebarN");
    const content = document.getElementById("content");
    const navbar = document.querySelector(".navbar");


    function toggleSidebar(isCollapse) {
        if (isCollapse) {
            sidebar.classList.add("toggled");
            content.classList.add("expand");
            navbar.classList.add("expand");
        } else {
            sidebar.classList.remove("toggled");
            content.classList.remove("expand");
            navbar.classList.remove("expand");
        }
    }

    //導覽自動展開閉合
    function checkWidth() {
        if (window.innerWidth < 768) {
            toggleSidebar(true);
        } else {
            toggleSidebar(false);
        }
    }

    //手動切換
    if (btn && sidebar && content) {

        btn.addEventListener("click", () => {
            sidebar.classList.toggle("toggled");
            content.classList.toggle("expand");
            navbar.classList.toggle("expand");
        });

        window.addEventListener("resize", checkWidth);

        checkWidth();
    }




    // 權限設定
    const permissions = {
        admin: ["add-announcement"],
        staff:["view-announcement"]
    };

    // 目前登入者admin/staff
    const userRole = sessionStorage.getItem("userRole") || "staff";

    const userPermissions = permissions[userRole] || [];

    function applyPermissions() {
        document.querySelectorAll("[data-permission]").forEach(el => {
            const required = el.dataset.permission;
            if (!userPermissions.includes(required)) {
                el.style.display = "none";
            }
        });
    }
    applyPermissions();

});







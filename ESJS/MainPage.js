document.addEventListener("DOMContentLoaded", ()=> {
    const btn=document.getElementById("sidebar-hamburger");
    const sidebar=document.getElementById("sidebarN");
    const content=document.getElementById("content");
    const navbar=document.querySelector(".navbar");

    if (btn&&sidebar&&content) {
        btn.addEventListener("click",()=> {
            sidebar.classList.toggle("toggled");
            content.classList.toggle("expand");
            navbar.classList.toggle("expand");
        });
    }
});


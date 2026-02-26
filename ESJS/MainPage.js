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


document.addEventListener("DOMContentLoaded", function() {
    let dropdown = document.getElementsByClassName("dropdown-btn");
    let ix
   
    for (x = 0; x < dropdown.length; x++) {
        dropdown[x].addEventListener("click", function() {
           
            this.classList.toggle("active");
            let dropdownContent = this.nextElementSibling;

            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }
});





    function showMoreTasks() {
    const extraTasks = document.querySelectorAll('.extra-tasks');
    const btnMore = document.getElementById('btn-more');
    
    extraTasks.forEach(task => {
        task.classList.toggle('d-none');
    });

    if (btnMore.innerText.includes('查看更多')) {
        btnMore.innerHTML = '收合內容 <i class="bi bi-chevron-up"></i>';
    } else {
        btnMore.innerHTML = '查看更多 <i class="bi bi-chevron-down"></i>';
    }
}
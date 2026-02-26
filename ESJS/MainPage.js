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

function toggleTask(checkbox) {
        const taskItem = checkbox.closest('.task-item');
        const statusLabel = taskItem.querySelector('.completed-status');
        const badge = taskItem.querySelector('.badge');

        if (checkbox.checked) {
            taskItem.classList.add('task-completed');
            statusLabel.classList.remove('d-none');
        } else {
            taskItem.classList.remove('task-completed');
            statusLabel.classList.add('d-none');
        }
    }
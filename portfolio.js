// Loader

const loading = document.getElementById("loader");
const content = document.getElementById("content");

document.onload = setTimeout(showContent, 2000);

function showContent() {
    loading.classList.add("d-none");
    content.classList.remove("d-none");
    content.classList.add("d-block");
}


/**********
 * NAVBAR *
 **********/

const navItems = document.querySelectorAll(".nav-item");
const toggler = document.querySelector(".navbar-toggler");
for (item of navItems) {
    item.addEventListener("click", function () {
        toggler.click();
    });
}

// // Navbar

// const navbar = document.querySelector(".navbar");
// console.log(document.documentElement.scrollTop);
// window.onscroll = function () {

//     if (document.documentElement.scrollTop > 20 || document.body.scrollTop > 20) {
//         navbar.style.top = "0";
//     } else {
//         navbar.style.top = "-100px";
//     }
// };
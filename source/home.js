var menuButton = document.querySelector(".menu");
menuButton.addEventListener("click", showMenu, false);

var flyoutMenu = document.querySelector("#nav");

var navSpan = document.querySelector(".close-nav");
navSpan.addEventListener("click", hideMenu, false);

function showMenu(e) {
    flyoutMenu.classList.add("show");
}

function hideMenu(e) {
    flyoutMenu.classList.remove("show");
    e.stopPropagation();

    document.body.style.overflow = "auto";
}   

var modal = document.querySelector("#addForm");

var addBullet = document.querySelector(".add");
addBullet.addEventListener("click", openForm, false);

var span = document.querySelector(".close-form");
span.addEventListener("click", closeForm, false);

function openForm(e) {
    modal.style.display = "block";
}

function closeForm(e) {
    modal.style.display = "none";
}
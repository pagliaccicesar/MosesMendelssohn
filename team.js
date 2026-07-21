//  equipo
const cardControllers = document.querySelectorAll("[data-card-controller]");

cardControllers.forEach(controller => {
  controller.addEventListener("click", (e) => {
    const card = e.currentTarget.parentElement.parentElement;
    const isVisible = card.dataset.visible;

    if (isVisible === "false") {
      card.setAttribute("data-visible", true);
    } else {
      card.setAttribute("data-visible", false);
    }
  })
})


//  probando menu
'use strict';

const elemToggleFunc = function (elem) { elem.classList.toggle('active'); }

const navbar = document.querySelector('[data-navbar]');
const overlay = document.querySelector('[data-overlay]');
const navToggleBtn = document.querySelector('[data-nav-toggle-btn]');

const navElemArr = [overlay, navToggleBtn];

for(let i = 0; i < navElemArr.length; i++) {
    navElemArr[i].addEventListener('click', function () {
        elemToggleFunc(navbar);
        elemToggleFunc(overlay);
    });
}
// Header sticky  probando menu
const headerElem = document.querySelector('[data-header]');
let lastScrollPosition = 0;

window.addEventListener('scroll', function () {
    let scrollPosition = window.pageYOffset;

    if(scrollPosition > lastScrollPosition) { headerElem.classList.remove('active'); } else { headerElem.classList.add('active'); }

    lastScrollPosition = scrollPosition <= 0 ? 0 : scrollPosition;
    
});



// js de popup de cuentas de donaciones

const abrirPopup = document.getElementById("abrirPopup");
const popup = document.getElementById("popupArgentina");
const cerrarPopup = document.getElementById("cerrarPopup");

// Abrir
abrirPopup.addEventListener("click", () => {
    popup.classList.add("active");
});

// Cerrar con X
cerrarPopup.addEventListener("click", () => {
    popup.classList.remove("active");
});

// Cerrar haciendo click fuera
popup.addEventListener("click", (e) => {
    if(e.target === popup){
        popup.classList.remove("active");
    }

});
// Cerrar con Escape
document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape"){
        popup.classList.remove("active");
    }
});



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
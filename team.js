




// =====================================
// TARJETAS DEL EQUIPO
// =====================================

const cardControllers = document.querySelectorAll("[data-card-controller]");

cardControllers.forEach(controller => {

    controller.addEventListener("click", (e) => {

        const card = e.currentTarget.parentElement.parentElement;

        card.dataset.visible =
            card.dataset.visible === "true" ? "false" : "true";

    });

});


// =====================================
// POPUPS DE DONACIONES
// =====================================

// Donaciones desde Argentina
const abrirPopup = document.getElementById("abrirPopup");
const popupArgentina = document.getElementById("popupArgentina");
const cerrarPopup = document.getElementById("cerrarPopup");

// Donaciones desde el extranjero - PayPal
const abrirPopupPay = document.getElementById("abrirPopup-pay");
const popupPayPal = document.getElementById("popupArgentina-pay");
const cerrarPopupPay = document.getElementById("cerrarPopup-pay");


// Abrir popup Argentina
if (abrirPopup && popupArgentina) {

    abrirPopup.addEventListener("click", () => {
        popupArgentina.classList.add("active");
    });

}


// Cerrar popup Argentina
if (cerrarPopup && popupArgentina) {

    cerrarPopup.addEventListener("click", () => {
        popupArgentina.classList.remove("active");
    });

}


// Abrir popup PayPal
if (abrirPopupPay && popupPayPal) {

    abrirPopupPay.addEventListener("click", () => {
        popupPayPal.classList.add("active");
    });

}


// Cerrar popup PayPal
if (cerrarPopupPay && popupPayPal) {

    cerrarPopupPay.addEventListener("click", () => {
        popupPayPal.classList.remove("active");
    });

}


// Cerrar al hacer clic fuera de los cuadros
[popupArgentina, popupPayPal].forEach(popup => {

    if (popup) {

        popup.addEventListener("click", (e) => {

            if (e.target === popup) {
                popup.classList.remove("active");
            }

        });

    }

});


// Cerrar ambos popups con ESC
document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        popupArgentina?.classList.remove("active");
        popupPayPal?.classList.remove("active");

    }

});





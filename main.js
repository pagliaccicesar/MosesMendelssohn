'use strict';

/* ===============================
   Función auxiliar
================================= */
const elemToggleFunc = (elem) => {
    if (elem) elem.classList.toggle("active");
};

/* ===============================
   Menú Responsive
================================= */
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");

if (navbar && overlay && navToggleBtn) {

    const navElemArr = [overlay, navToggleBtn];

    navElemArr.forEach(elem => {
        elem.addEventListener("click", () => {
            elemToggleFunc(navbar);
            elemToggleFunc(overlay);
        });
    });

}

/* ===============================
   Header Sticky
================================= */
const headerElem = document.querySelector("[data-header]");

if (headerElem) {

    let lastScrollPosition = 0;

    window.addEventListener("scroll", () => {

        const scrollPosition = window.pageYOffset;

        if (scrollPosition > lastScrollPosition) {
            headerElem.classList.remove("active");
        } else {
            headerElem.classList.add("active");
        }

        lastScrollPosition = scrollPosition <= 0 ? 0 : scrollPosition;

    });

}

/* ===============================
   Newsletter
================================= */
const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = this.email.value;

        fetch("newsletter.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "email=" + encodeURIComponent(email)
        })
        .then(response => response.text())
        .then(res => {

            if (res.trim() === "OK") {

                alert("¡Gracias! En breve nos contactamos.");
                newsletterForm.reset();

            } else {

                alert("Error: " + res);

            }

        })
        .catch(error => {

            console.error(error);
            alert("No fue posible enviar el formulario.");

        });

    });

}

/* ===============================
   Botón Ir Arriba
================================= */
const goTopBtn = document.querySelector("[data-go-top]");

if (goTopBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 200) {
            goTopBtn.classList.add("active");
        } else {
            goTopBtn.classList.remove("active");
        }

    });

}

/* ===============================
   Popup Fotografías
================================= */
const popup = document.getElementById("imagePopup");
const popupImg = document.getElementById("popupImage");
const closePopup = document.querySelector(".popup-close");

if (popup && popupImg && closePopup) {

    document.querySelectorAll(".podcast-card").forEach(card => {

        card.addEventListener("click", function (e) {

            e.preventDefault();

            const img = this.querySelector("img");

            popupImg.src = img.src;
            popupImg.alt = img.alt;

            popup.classList.add("active");

        });

    });

    closePopup.addEventListener("click", () => {
        popup.classList.remove("active");
    });

    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.remove("active");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            popup.classList.remove("active");
        }
    });

}
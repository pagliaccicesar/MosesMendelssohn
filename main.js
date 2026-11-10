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
   Newsletter + Google reCAPTCHA v3
================================= */



/* ===============================
   Newsletter + Google reCAPTCHA v3
================================= */

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

    const SITE_KEY = "6Ld8ORcuAAAAAPB3xmLJq6Iip_EzW8ntVLE01ePD";

    newsletterForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const nombre = this.nombre.value.trim();
        const apellido = this.apellido.value.trim();
        const email = this.email.value.trim();

        const submitButton = this.querySelector('button[type="submit"]');

        submitButton.disabled = true;

        try {

            // Obtener token de Google reCAPTCHA v3
            const token = await new Promise((resolve, reject) => {

                grecaptcha.ready(() => {

                    grecaptcha.execute(SITE_KEY, {
                        action: "newsletter"
                    })
                    .then(resolve)
                    .catch(reject);

                });

            });

            // Preparar los datos
            const datos = new URLSearchParams();

            datos.append("nombre", nombre);
            datos.append("apellido", apellido);
            datos.append("email", email);
            datos.append("recaptcha_token", token);

            // Enviar a PHP
            const response = await fetch("newsletter.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: datos.toString()
            });

            const resultado = (await response.text()).trim();

            if (response.ok && resultado === "OK") {

                alert("¡Gracias por suscribirte! En breve recibirás nuestras novedades.");

                newsletterForm.reset();

            } else {

                alert("No fue posible completar la suscripción. Intentá nuevamente.");

            }

        } catch (error) {

            console.error("Error en Newsletter:", error);

            alert("Ocurrió un error de conexión. Intentá nuevamente.");

        } finally {

            submitButton.disabled = false;

        }

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
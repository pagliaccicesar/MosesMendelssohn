function crearBoton(planId, contenedor){

    if(!document.querySelector(contenedor)) return;

    paypal.Buttons({

        style:{
            shape:"rect",
            color:"gold",
            layout:"vertical",
            label:"subscribe"
        },

        createSubscription(data, actions){

            return actions.subscription.create({
                plan_id: planId
            });

        },

        onApprove(data){

            alert("¡Muchas gracias por colaborar con la Asociación!");

            console.log("ID:", data.subscriptionID);

        },

        onError(err){

            console.error(err);

            alert("No fue posible iniciar la suscripción.");

        }

    }).render(contenedor);

}

crearBoton(
    "P-9JD8514570182411TNIYX6TA",
    "#paypal-5"
);

crearBoton(
    "P-7FA657752S951364RNIYX7SA",
    "#paypal-10"
);

crearBoton(
    "P-1KD33679JY168532FNIY3FXY",
    "#paypal-15"
);


// Form validation
/*

document
.getElementById("newsletterForm")
.addEventListener("submit", function(e){
    e.preventDefault();
    const email = this.email.value;

    fetch("newsletter.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"email="+encodeURIComponent(email)
    })
    .then(r=>r.text())
    .then(res=>{
        alert("¡Gracias! En breve nos contactamos.");
        document
        .getElementById("newsletterForm")
        .reset();
    })

    .catch(err=>{
        alert("Error al enviar.");
    });
});
*/


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



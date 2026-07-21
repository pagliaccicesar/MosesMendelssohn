// ===============================
// BOTONES PAYPAL
// ===============================

function crearBoton(planId, contenedor) {

    paypal.Buttons({

        style: {
            shape: "rect",
            color: "gold",
            layout: "vertical",
            label: "subscribe"
        },

        createSubscription(data, actions) {

            return actions.subscription.create({
                plan_id: planId
            });

        },

        onApprove(data) {

            alert("¡Muchas gracias por tu donación!");

            console.log("Suscripción:", data.subscriptionID);

        },

        onError(err) {

            console.error(err);

            alert("Ocurrió un error al conectar con PayPal.");

        }

    }).render(contenedor);

}


//==============================
// 5 €
//==============================

crearBoton(
    "P-9JD8514570182411TNIYX6TA",
    "#paypal-5"
);


//==============================
//10 €
//==============================

crearBoton(
    "P-7FA657752S951364RNIYX7SA",
    "#paypal-10"
);


//==============================
//15 €
//==============================

crearBoton(
    "P-1KD33679JY168532FNIY3FXY",
    "#paypal-15"
);
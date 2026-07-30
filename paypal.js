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
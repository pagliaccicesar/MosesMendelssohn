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

// Header sticky
const headerElem = document.querySelector('[data-header]');
let lastScrollPosition = 0;

window.addEventListener('scroll', function () {
    let scrollPosition = window.pageYOffset;

    if(scrollPosition > lastScrollPosition) { headerElem.classList.remove('active'); } else { headerElem.classList.add('active'); }

    lastScrollPosition = scrollPosition <= 0 ? 0 : scrollPosition;
    
});

// Form validation

document
.getElementById("newsletterForm")
.addEventListener("submit", function(e){
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
                document.getElementById("newsletterForm").reset();
            } else {
                console.error(res);
                alert("Hubo un problema al enviar tu email.");
            }
        })
        .catch(err => {
            console.error(err);
            alert("Error al enviar.");
        });
});







// Go top
const goTopBtn = document.querySelector('[data-go-top]');
window.addEventListener('scroll', function () {
    window.scrollY > 200 ? goTopBtn.classList.add('active') : goTopBtn.classList.remove('active');
});


// Fotos de Fotografias
const popup = document.getElementById("imagePopup");
const popupImg = document.getElementById("popupImage");
const closePopup = document.querySelector(".popup-close");

document.querySelectorAll(".podcast-card").forEach(card => {
    card.addEventListener("click", function(e){
        e.preventDefault();
        const img = this.querySelector("img");
        popupImg.src = img.src;
        popupImg.alt = img.alt;
        popup.classList.add("active");
    });
});

closePopup.addEventListener("click", ()=>{
    popup.classList.remove("active");
});

popup.addEventListener("click",(e)=>{
    if(e.target===popup){
        popup.classList.remove("active");
    }
});

document.addEventListener("keydown",(e)=>{
    if(e.key==="Escape"){
        popup.classList.remove("active");
    }
});

















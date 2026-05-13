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

const input = document.querySelector('[data-input]');
const submitBtn = document.querySelector('[data-submit]');

input.addEventListener('input', function () {
    if(input.checkValidity()) { submitBtn.removeAttribute('disabled'); } else { submitBtn.setAttribute('disabled', ''); }
});

// Go top

const goTopBtn = document.querySelector('[data-go-top]');

window.addEventListener('scroll', function () {
    window.scrollY > 200 ? goTopBtn.classList.add('active') : goTopBtn.classList.remove('active');
});

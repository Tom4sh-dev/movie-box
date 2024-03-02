// Nav Links
const navBtn = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const menu = document.querySelectorAll('.menu');
const menuList = document.querySelectorAll('.menu__list');
const links = document.querySelectorAll('.nav__link');

// Main Section
const mainSection = document.querySelector('.main');
const headerTitle = document.querySelector('.header__title');

// const lang = document.querySelector('.lang');
// const langPl = document.querySelector('.lang__pl');
// const langEn = document.querySelector('.lang__en');
// langEn.addEventListener('click', (e) => {
// 	langPl.classList.toggle('lang__pl--active');
// });


// Navigation Behavior
function handleNav() {
	nav.classList.toggle('nav--active');
	mainSection.classList.toggle('main--active');
	headerTitle.classList.toggle('header__title--active');
	navBtn.classList.toggle('is-active');
}


// Event Listeners
navBtn.addEventListener('click', handleNav);
links.forEach((link) => { 
	link.addEventListener('click', handleNav);
});
headerTitle.addEventListener('click', () => window.location.reload());


menu.forEach((item, idx) =>
	item.addEventListener('mouseenter', () => {
		menuList[idx].classList.add('menu__list--active');
	})
);
menu.forEach((item, idx) =>
	item.addEventListener('mouseleave', () => {
		menuList[idx].classList.remove('menu__list--active');
	})
);

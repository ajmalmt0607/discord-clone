const btnsOpenMenu = document.querySelector(".menu-button");
const btnsCloseMenu = document.querySelector(".close-button");
const header = document.querySelector(".header");
const menu = document.querySelector(".middle-overlay");

// Mobile Menu

const openModal = function (e) {
	e.preventDefault();
	menu.classList.remove("hidden");
	document.body.style.overflow = "hidden";
};
const closeModal = function (e) {
	e.preventDefault();
	menu.classList.add("hidden");
	document.body.style.overflow = null;
};

btnsOpenMenu.addEventListener("click", openModal);
btnsCloseMenu.addEventListener("click", closeModal);

function closeMenuOnResize() {
	if (window.innerWidth > 980) {
		menu.classList.add("hidden");
		header.classList.remove("sticky");
		document.body.style.overflow = null;
	}
}
window.addEventListener("resize", closeMenuOnResize);

// sticky navigation

window.addEventListener("scroll", function (e) {
	if (window.scrollY > 45 && window.innerWidth < 980) {
		header.classList.add("sticky");
	} else {
		header.classList.remove("sticky");
	}
});

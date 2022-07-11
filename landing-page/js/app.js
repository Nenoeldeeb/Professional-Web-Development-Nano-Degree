/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/
document.addEventListener("DOMContentLoaded", () => {
	// Getting the list of the sections for later use.
	const sections = document.querySelectorAll("section");


	// Build menu

	// A simple dynamic navigation bar builder.
	function dynamicNavBar() {
		const navbarList = document.getElementById("navbar__list");
		const fragment = document.createDocumentFragment();

		for (let section of sections) {
			const menuItem = document.createElement("li");
			const menuLink = document.createElement("a");

			menuLink.classList.add("menu__link");
			menuLink.textContent = section.getAttribute("data-nav");

			menuItem.id = section.id + "-nav";

			menuItem.appendChild(menuLink);
			fragment.appendChild(menuItem);
		}

		navbarList.appendChild(fragment);
	}
	dynamicNavBar();

	// Scroll to section on link click

	// Set the scrolling from navigation bar to their specific section.
	document.querySelectorAll("nav ul li").forEach((ele) => {
		ele.addEventListener("click", (eve) => {
			eve.preventDefault();

			const sectionSelector = `[data-nav="${ele.firstElementChild.textContent}"]`;

			document.querySelector(sectionSelector).scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
		});
	});
	// Set sections as active

	// Get the highlight functionality to work on navigation bar & viewed section.
	// And setting up the top button.
	window.addEventListener("scroll", (eve) => {

		const top = document.querySelector("button#top");

		if (window.scrollY > 600) {
			top.classList.add("active");
		}
		else {
			top.classList.remove("active");
		}

		top.addEventListener("click", (e) => {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: "smooth" });
		});

		sections.forEach((section) => {
			const secPos = section.offsetTop;
			const secH = section.clientHeight;

			if (window.scrollY < (document.querySelector("section#section1").offsetTop - document.querySelector("section#section1").clientHeight / 3)) {
				toggleActiveState(sections, "none");
			}
			else if (window.scrollY >= (secPos - secH / 3)) toggleActiveState(sections, section.id);
		});
	});

	/**
	 * Set the active class on the section & their title in the navigation bar.
	 * And remove active class from others.
	 * @param sections The list of sections to check the active class state.
	 * @param id The current viewed section ID.
	 */
	function toggleActiveState(sectionList, id) {
		sectionList.forEach((section) => {
			document.querySelectorAll("nav ul li").forEach((navItem) => {

				if (section.id === id) {
					section.classList.add("active-section");

					if (navItem.id === id + "-nav") {
						navItem.firstElementChild.classList.add("active-nav-item");
					}
					else {
						navItem.firstElementChild.classList.remove("active-nav-item");
					}
				}
				else {
					section.classList.remove("active-section");

					if (navItem.id === id + "-nav") {
						navItem.firstElementChild.classList.add("active-nav-item");
					}
					else {
						navItem.firstElementChild.classList.remove("active-nav-item");
					}
				}
			});
		});
	}

	// Getting the navigation bar responsive in all screens.
	document.querySelector("#hamburger-menu").addEventListener("click", (e) => {
		document.querySelector(".navbar__menu ul").classList.toggle("active-mobile-navbar");
	});
});

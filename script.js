const btnsOpenMenu = document.querySelector(".menu-button");
const btnsCloseMenu = document.querySelector(".close-button");
const header = document.querySelector(".header");
const menu = document.querySelector(".middle-overlay");
///////////////////////
// Mobile Menu
//////////////////////
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
/////////////////////////////////////////
// sticky navigation
////////////////////////////////////////
window.addEventListener("scroll", function (e) {
	if (window.scrollY > 45 && window.innerWidth < 980) {
		header.classList.add("sticky");
	} else {
		header.classList.remove("sticky");
	}
});

//////////////////////
// Data Fetching
/////////////////////
var discover_server_bottom_right = document.getElementsByClassName(
	"discover-server-bottom-right"
)[0]; // Access the first element in the collection

fetch("data/discord_servers.json")
	.then((response) => response.json())
	.then((data) => {
		for (let i of data.data) {
			let tempElement = document.createElement("div");
			tempElement.innerHTML = `
                <div class="discover-server-bottom-content-box hide ${
					i.category
				}" data-category='${i.category}'>
                    <div class="discover-server-bottom-content-box-left">
                        <img src=${i.server_image} alt="" />
                    </div>
                    <div class="discover-server-bottom-content-box-left-980">
                        <img src=${i.logo} alt="" />
                    </div>
                    <div class="discover-server-bottom-content-box-right">
                        <div class="discover-server-bottom-content-box-right-top">
                            <span class="discover-server-bottom-content-box-right-top-logo">
                                <img src=${i.logo} alt="" />
                            </span>
                            <h6 class="server-name">${i.title}</h6>
                        </div>
                        <p>
                            ${i.description}
                        </p>
                        <div class="online-members">
                            <span class="online-count">${i.online} Online</span>
                            <span class="dot-icon"></span>
                            <span class="members-count">${
								i.members
							} Members</span>
                        </div>
                        ${
							i.verified
								? `
                        <div class="verified-server">
                            <span class="verified-icon">
                                <img src="images/logos/icons8-verified-48.png" alt="" />
                            </span>
                            <span>verified</span>
                        </div>
                        `
								: ""
						}
                    </div>
                </div>`;

			discover_server_bottom_right.appendChild(tempElement);
		}
	})
	.catch((error) => {
		console.error("Error fetching JSON data:", error);
	});

///////////////////////
// RESULTS FOUND COUNT
//////////////////////
let count = 0;
function count_element() {
	const elements = document.querySelectorAll(
		".discover-server-bottom-content-box"
	);
	const counter_span = document.querySelector(".no-of-results");
	count = 0;
	elements.forEach((element) => {
		if (!element.classList.contains("hide")) {
			count++;
		}
	});
	console.log(count);
	counter_span.innerHTML = count;
}

///////////////////////////////////////////////
// Servers counts for each category
//////////////////////////////////////////////
function serverCount(data) {
	const counts = {};
	data.forEach((item) => {
		counts[item.category] = (counts[item.category] || 0) + 1;
	});
	return counts;
}

fetch("data/discord_servers.json")
	.then((response) => response.json())
	.then((data) => {
		const products_count = serverCount(data.data);
		document.querySelectorAll(".server_count").forEach((element) => {
			const category = element.parentElement
				.getAttribute("onclick")
				.match(/'([^']+)'/)[1];
			element.textContent = products_count[category] || 0;
		});

		// Update count for 'All' category
		const totalCount = Object.values(products_count).reduce(
			(acc, count) => acc + count,
			0
		);

		let all_count = document.querySelectorAll(".all-count");
		all_count.forEach((element) => {
			element.textContent = totalCount || 0;
		});
	})
	.catch((error) => {
		console.error("Error fetching JSON file:", error);
	});

/////////////////////////////
//For clear Search button
////////////////////////////
function clearSearchInput() {
	document.getElementById("search-input").value = "";
	document.getElementById("clear-search").classList.remove("active");
}
const searchInput = document.getElementById("search-input");
const clearSearch = document.getElementById("clear-search");

searchInput.addEventListener("input", function () {
	if (searchInput.value.trim() !== "") {
		clearSearch.classList.add("active");
	} else {
		clearSearch.classList.remove("active");
	}
});

clearSearch.addEventListener("click", function (e) {
	e.preventDefault();
	searchInput.value = "";
	clearSearch.classList.remove("active");
});
/////////////////////////////
// Filter servers by category
/////////////////////////////
let selectedCategory = "all";

function filterProduct(value) {
	clearSearchInput();
	let button_container = document.querySelectorAll(
		".discover-server-bottom-btns"
	);
	///////////////////////////////
	let content_box = document.querySelectorAll(
		".discover-server-bottom-content-box"
	);
	////////////////////////////
	let category_attribute = document.querySelectorAll("[data-category]");

	let categoryButtons = document.querySelectorAll(
		".discover-server-bottom-left"
	);
	button_container.forEach((button, index) => {
		if (value.toUpperCase() == button.innerText.toUpperCase()) {
			categoryButtons[index].classList.add("active");
		} else {
			categoryButtons[index].classList.remove("active");
		}
	});

	selectedCategory = value;

	category_attribute.forEach((element) => {
		if (value == "all") {
			element.classList.remove("hide");
		} else {
			var attributevalue = element.getAttribute("data-category");
			if (attributevalue == value) {
				console.log(value);
				element.classList.remove("hide");
			} else {
				element.classList.add("hide");
			}
		}
	});
	count_element();
}

////////////////////////////
// Servers search
///////////////////////////
const search_btn = document.getElementById("search-btn");
const searcher = () => {
	let searchInput = document
		.getElementById("search-input")
		.value.toLowerCase();
	let server_name = document.querySelectorAll(".server-name");
	let content_box = document.querySelectorAll(
		".discover-server-bottom-content-box"
	);

	server_name.forEach((element, index) => {
		if (
			(element.innerText.toLowerCase().includes(searchInput) ||
				searchInput === "") &&
			(selectedCategory === "all" ||
				content_box[index].classList.contains(selectedCategory))
		) {
			content_box[index].classList.remove("hide");
		} else {
			content_box[index].classList.add("hide");
		}
	});
	count_element();
	clearSearchInput();
};

search_btn.addEventListener("click", searcher);

///////////////////////////////
// Modal window For Responsive
//////////////////////////////

const categoryModal_element = document.querySelector(".category-modal");
const categoryButton = document.querySelector(".category-botton-980-container");
const categoryModal = function (e) {
	e.preventDefault();
	if (window.innerWidth < 1022) {
		categoryModal_element.classList.remove("modal-hidden");
	}
};

const addActive = () => {
	const all = document.querySelector(".all-category");
	all.classList.add("active");
};

// Initially display all products
window.onload = () => {
	filterProduct("all");
	count_element();
	addActive();
};
categoryButton.addEventListener("click", categoryModal);

const discord_servers_btn = document.querySelectorAll(
	".discover-server-bottom-btns"
);

const remove_categoryModal = function (e) {
	e.preventDefault();
	categoryModal_element.classList.add("modal-hidden");
};

discord_servers_btn.forEach((btn) =>
	btn.addEventListener("click", remove_categoryModal)
);

window.addEventListener("resize", function (e) {
	if (window.innerWidth > 1022) {
		categoryModal_element.classList.add("modal-hidden");
	}
});

document.addEventListener("DOMContentLoaded", function () {
	const spanElement = document.querySelector(
		".category-botton-980 .category-names"
	);

	spanElement.textContent = "Categories";

	const buttons = document.querySelectorAll(
		".category-modal .discover-server-bottom-btns"
	);

	buttons.forEach((button) => {
		button.addEventListener("click", function () {
			const buttonText = this.textContent.trim();

			if (buttonText === "All") {
				spanElement.textContent = "Categories";
			} else {
				spanElement.textContent = buttonText;
			}
		});
	});
});
document.addEventListener("click", function (event) {
	if (
		!categoryModal_element.contains(event.target) &&
		!categoryButton.contains(event.target)
	) {
		categoryModal_element.classList.add("modal-hidden");
	}
});

//////////////////////////////
function togglePopup() {
	var button = document.querySelector(".bottom-pop-up-btn");
	var popupContainer = document.getElementById("popup-container");

	// Move the button down and hide it
	button.style.transition = "transform 0.5s ease-out";
	button.style.transform = "translateY(100px)";
	button.style.opacity = "0";

	// Show the popup after a short delay
	setTimeout(function () {
		popupContainer.style.display = "block";
	}, 300); // Adjust the delay as needed
}

function closePopup() {
	var popupContainer = document.getElementById("popup-container");

	// Hide the popup
	popupContainer.style.display = "none";

	var button = document.querySelector(".bottom-pop-up-btn");

	// Move the button back up and show it
	button.style.transition = "transform 0.5s ease-in";
	button.style.transform = "translateY(0)";
	button.style.opacity = "1";
}

////////////////
function searchFunction() {
	const searchInput = document
		.getElementById("popup-search-input")
		.value.trim()
		.toLowerCase();
	const searchResultContainer = document.getElementById(
		"search-result-container"
	);
	searchResultContainer.innerHTML = "";

	if (searchInput.length > 0) {
		// Check if search input is not empty
		fetch("./data/search_data.json")
			.then((response) => response.json())
			.then((jsonData) => {
				const matchedItems = [];
				jsonData.items.forEach((item) => {
					if (item.toLowerCase().includes(searchInput)) {
						matchedItems.push(item);
					}
				});
				if (matchedItems.length > 0) {
					// Display matched items if found
					const uniqueMatchedItems = [...new Set(matchedItems)]; // Remove duplicates
					uniqueMatchedItems.forEach((item, index) => {
						const listItem = document.createElement("li");
						listItem.textContent = `${index + 1}. ${item}`;
						listItem.classList.add("search-result-item"); // Add class name to <li>
						searchResultContainer.appendChild(listItem);
					});
				} else {
					// Display message if no matches found
					const noResultItem = document.createElement("li");
					noResultItem.textContent = "No matching items found.";
					noResultItem.classList.add("search-result-item"); // Add class name to <li>
					searchResultContainer.appendChild(noResultItem);
				}
			})
			.catch((error) => console.error("Error fetching data:", error));
	} else {
		// Display message if search input is empty
		const emptyInputItem = document.createElement("li");
		emptyInputItem.textContent = "Please enter a search term.";
		emptyInputItem.classList.add("search-result-item"); // Add class name to <li>
		searchResultContainer.appendChild(emptyInputItem);
	}
}

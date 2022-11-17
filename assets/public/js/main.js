const cartBtn = document.getElementById("cartBtn");
const cartDropdown = document.getElementById("cartDropdown");
const mainNavMenu = document.getElementById("navMenu");
const featureSubNavMenu = document.getElementById("featuresSubMenu");
const mainNavMenuButton = document.getElementById("navBtn");

function toggleCartDropdown() {
  cartDropdown.classList.toggle("nav-menu__cart-dropdown-content--show");
}

cartBtn.onclick = toggleCartDropdown;

mainNavMenuButton.onclick = () => {
  if (mainNavMenuButton.classList.contains("nav-menu__button--active")) {
    mainNavMenuButton.classList.remove("nav-menu__button--active");
    mainNavMenu.classList.replace(
      "nav-menu__list--show-vertical",
      "nav-menu__list--hide-vertical"
    );
    featureSubNavMenu.classList.replace(
      "nav-menu__list--show-horizontal",
      "nav-menu__list--hide-horizontal"
    );
  } else {
    mainNavMenuButton.classList.add("nav-menu__button--active");
    mainNavMenu.classList.replace(
      "nav-menu__list--hide-vertical",
      "nav-menu__list--show-vertical"
      );
  }
};

document.getElementById("featuresBtn").onclick = () => {
  mainNavMenu.classList.replace(
    "nav-menu__list--show-vertical",
    "nav-menu__list--hide-vertical"
  );
  featureSubNavMenu.classList.replace(
    "nav-menu__list--hide-horizontal",
    "nav-menu__list--show-horizontal"
  );
};

document.getElementById("backBtn").onclick = () => {
  mainNavMenu.classList.replace(
    "nav-menu__list--hide-vertical",
    "nav-menu__list--show-vertical"
  );
  featureSubNavMenu.classList.replace(
    "nav-menu__list--show-horizontal",
    "nav-menu__list--hide-horizontal"
  );
};

/* Cart dropdown menu */

const cartBtn = document.getElementById("cartBtn");
const cartDropdown = document.getElementById("cartDropdown");

function toggleCartDropdown() {
  cartDropdown.classList.toggle("nav-menu__cart-dropdown-content--show");
}

cartBtn.onclick = toggleCartDropdown;

/* Navigation menus */

const mainNavButtonId = "navBtn";
const featuresSubNavButtonId = "featuresBtn";
const backButtonId = "backBtn";

// Constructor for NavMenu object.
function NavMenu(element, showClasses, hideClasses) {
  this.element = element;
  this.showClasses = showClasses.split(" ");
  this.hideClasses = hideClasses.split(" ");

  this.Show = () => {
    this.hideClasses.forEach(c => this.element.classList.toggle(c, false));
    this.showClasses.forEach(c => this.element.classList.toggle(c, true));
  };

  this.Hide = () => {
    this.showClasses.forEach(c => this.element.classList.toggle(c, false));
    this.hideClasses.forEach(c => this.element.classList.toggle(c, true));
  };

  this.IsOpen = () => {
    let isOpen = true;

    this.showClasses.forEach(c => {
      if(this.element.classList.contains(c) == false) {
        isOpen = false;
      }
    });

    this.hideClasses.forEach(c => {
      if(this.element.classList.contains(c) == true) {
        isOpen = false;
      }
    });

    return isOpen;
  };

  // Default behaviour.
  this.Hide();
}

// Constructor for NavButton object.
function NavButton(element, navManager, targetMenu) {
  this.element = element;
  this.navManager = navManager;
  this.targetMenu = targetMenu;

  this.Toggle = () => {
    if(this.targetMenu.IsOpen()) {
      this.navManager.HideNavMenusOrExceptOne();
    } else {
      if(this.element.id != mainNavButtonId || this.navManager.IsAnyNavOpen() == false)
      {
        this.targetMenu.Show();
      }
      this.navManager.HideNavMenusOrExceptOne(targetMenu);
    }
  };

  // Default behaviour.
  this.element.onclick = this.Toggle;
}

// Constructor for NavManager object.
function NavManager(menuList, mainNavMenu) {
  this.menus = menuList;
  this.mainNav = mainNavMenu;

  this.HideNavMenusOrExceptOne = (exceptionMenu = null) => {
    this.menus.forEach(menu => {
      if(menu != exceptionMenu) {
        menu.Hide();
      }
    });
  };

  this.IsAnyNavOpen = () => this.menus.some(menu => menu.IsOpen());
}

// Objects for nav menu managment.
const navMenu = new NavMenu(document.getElementById("navMenu"), "nav-menu__list--show-vertical", "nav-menu__list--hide-vertical");
const featuresSideNavMenu = new NavMenu(document.getElementById("featuresSubMenu"), "nav-menu__list--show-horizontal",  "nav-menu__list--hide-horizontal");
const navManager = new NavManager([navMenu, featuresSideNavMenu], navMenu);
const navBtn = new NavButton(document.getElementById(mainNavButtonId), navManager, navMenu);
const featuresSubNavBtn = new NavButton(document.getElementById(featuresSubNavButtonId), navManager, featuresSideNavMenu);
const backBtn = new NavButton(document.getElementById(backButtonId), navManager, navMenu);

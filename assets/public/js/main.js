const cartBtn = document.getElementById("cartBtn");
const cartDropdown = document.getElementById("cartDropdown");
const mainNavButtonId = "navBtn";
const navMenu = new NavMenu(
  document.getElementById("navMenu"),
  "nav-menu__list--show-vertical",
  "nav-menu__list--hide-vertical"
);
const featuresSideNavMenu = new NavMenu(
  document.getElementById("featuresSubMenu"),
  "nav-menu__list--show-horizontal",
  "nav-menu__list--hide-horizontal"
);
const navManager = new NavManager([navMenu, featuresSideNavMenu], navMenu);
const navBtn = new NavButton(
  document.getElementById(mainNavButtonId),
  navManager,
  navMenu
);
const featuresSubNavBtn = new NavButton(
  document.getElementById("featuresBtn"),
  navManager,
  featuresSideNavMenu
);
const backBtn = new NavButton(
  document.getElementById("backBtn"),
  navManager,
  navMenu
);

function toggleCartDropdown() {
  cartDropdown.classList.toggle("nav-menu__cart-dropdown-content--show");
}

cartBtn.onclick = toggleCartDropdown;

function NavMenu(element, showClass, hideClass) {
  this.element = element;
  this.showClasses = showClass;
  this.hideClasses = hideClass;

  this.ShowNavigation = () => this.element.classList.replace(hideClass, showClass);

  this.HideNavigation = () => this.element.classList.replace(showClass, hideClass);

  this.NavigationIsOpen = () => this.element.classList.contains(showClass);

  this.HideNavigation();
}

function NavButton(element, navManager, targetMenu) {
  this.element = element;
  this.navManager = navManager;
  this.targetMenu = targetMenu;

  this.Toggle = () => {
    if (this.targetMenu.NavigationIsOpen()) {
      this.navManager.HideNavMenusOrExceptOne();
    } else {
      if (
        this.element.id != mainNavButtonId ||
        this.navManager.IsAnyNavOpen() == false
      ) {
        this.targetMenu.ShowNavigation();
      }
      this.navManager.HideNavMenusOrExceptOne(targetMenu);
    }
  };

  this.element.onclick = this.Toggle;
}

function NavManager(menuList, mainNavMenu) {
  this.menus = menuList;
  this.mainNav = mainNavMenu;

  this.HideNavMenusOrExceptOne = (exceptionMenu = null) => {
    this.menus.forEach((menu) => {
      if (menu != exceptionMenu) {
        menu.HideNavigation();
      }
    });
  };

  this.IsAnyNavOpen = () => this.menus.some((menu) => menu.NavigationIsOpen());
}

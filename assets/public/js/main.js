const cartBtn = document.getElementById('cartBtn');
const cartDropdown = document.getElementById('cartDropdown');
const mainNavMenu = document.getElementById('navMenu');
const featureSubNavMenu = document.getElementById('featuresSubMenu');
const mainNavMenuButton = document.getElementById('navBtn');
const navHambugerIcon = document.getElementById('navHambugerIcon');
const slideTrack = document.getElementById('carouselTrack');
const slides = Array.from(slideTrack.querySelectorAll('.carousel__slide'));
const carouselSlidingTimout = 400;
let slidePositionIndex = 0;
let isCarouselSlidable = true;
let isLastSlideMoveLeft = false;

const getNonNegativeArrayIndex = (index, arraySize) => (
  ((index % arraySize) + arraySize) % arraySize
);
const getCurrentSlide = () => slides[getNonNegativeArrayIndex(slidePositionIndex, slides.length)];
const getCarouselImageHeight = () => slides[0].querySelector('.carousel__image').height;
const getCarouselImageWidth = () => slides[0].querySelector('.carousel__image').width;

const setCarouselHeightToSlideImageHeight = () => {
  document.getElementById('carousel').style.height = `${getCarouselImageHeight()}px`;
};
const setSlidePosition = (slide, index) => {
  slide.style.left = `${getCarouselImageWidth() * index}px`;
};
const moveToSlide = (slide) => {
  slideTrack.style.transform = `translateX(-${slide.style.left})`.replace('--', '');
};
const instantMoveToSlide = (slide) => {
  slideTrack.classList.remove('carousel__slide-track--sliding');
  moveToSlide(slide);
  setTimeout(() => { slideTrack.classList.add('carousel__slide-track--sliding'); }, 10);
};
const positionSlidesFromSlideIndex = () => {
  slides.forEach((_, index) => {
    setSlidePosition(
      slides[getNonNegativeArrayIndex(slidePositionIndex + index, slides.length)],
      slidePositionIndex + index,
    );
  });
};
const moveSlidesLeft = () => {
  if ((isCarouselSlidable || !isLastSlideMoveLeft) && slides.length > 1) {
    slidePositionIndex += 1;
    setSlidePosition(getCurrentSlide(), slidePositionIndex);
    moveToSlide(getCurrentSlide());
    isLastSlideMoveLeft = true;
  }
};
const moveSlidesRight = () => {
  if ((isCarouselSlidable || isLastSlideMoveLeft) && slides.length > 1) {
    slidePositionIndex -= 1;
    setSlidePosition(getCurrentSlide(), slidePositionIndex);
    moveToSlide(getCurrentSlide());
    isLastSlideMoveLeft = false;
  }
};
const startCarouselTimeout = (milliseconds) => {
  if (isCarouselSlidable) {
    isCarouselSlidable = false;
    setTimeout(() => { isCarouselSlidable = true; }, milliseconds);
  }
};
const closeAllNavMenus = () => {
  mainNavMenuButton.classList.remove('nav-menu__button--active');
  navHambugerIcon.classList.remove('icon-hamburger--active');
  mainNavMenu.classList.replace(
    'nav-menu__list--show-vertical',
    'nav-menu__list--hide-vertical',
  );
  featureSubNavMenu.classList.replace(
    'nav-menu__list--show-horizontal',
    'nav-menu__list--hide-horizontal',
  );
};
const isCartDropdownOpen = () => cartDropdown.classList.contains('nav-menu__cart-dropdown-content--show');

function toggleCartDropdown() {
  cartDropdown.classList.toggle('nav-menu__cart-dropdown-content--show');
}

cartBtn.onclick = toggleCartDropdown;

mainNavMenuButton.onclick = () => {
  if (mainNavMenuButton.classList.contains('nav-menu__button--active')) {
    closeAllNavMenus();
  } else {
    mainNavMenuButton.classList.add('nav-menu__button--active');
    mainNavMenu.classList.replace(
      'nav-menu__list--hide-vertical',
      'nav-menu__list--show-vertical',
    );
    navHambugerIcon.classList.add('icon-hamburger--active');
  }
};

document.getElementById('featuresBtn').onclick = () => {
  mainNavMenu.classList.replace(
    'nav-menu__list--show-vertical',
    'nav-menu__list--hide-vertical',
  );
  featureSubNavMenu.classList.replace(
    'nav-menu__list--hide-horizontal',
    'nav-menu__list--show-horizontal',
  );
};

document.getElementById('backBtn').onclick = () => {
  mainNavMenu.classList.replace(
    'nav-menu__list--hide-vertical',
    'nav-menu__list--show-vertical',
  );
  featureSubNavMenu.classList.replace(
    'nav-menu__list--show-horizontal',
    'nav-menu__list--hide-horizontal',
  );
};

document.getElementById('carouselLeftBtn').onclick = () => {
  moveSlidesRight();
  startCarouselTimeout(carouselSlidingTimout);
};
document.getElementById('carouselRightBtn').onclick = () => {
  moveSlidesLeft();
  startCarouselTimeout(carouselSlidingTimout);
};

window.onresize = () => {
  setCarouselHeightToSlideImageHeight();
  positionSlidesFromSlideIndex(slidePositionIndex);
  instantMoveToSlide(getCurrentSlide());
};

window.onclick = (event) => {
  const menuElements = [mainNavMenu, featureSubNavMenu, mainNavMenuButton];
  if (!menuElements.some((element) => element.contains(event.target))) {
    closeAllNavMenus();
  }

  const cartMenuElements = [cartBtn, cartDropdown];
  if (!cartMenuElements.some((element) => element.contains(event.target)) && isCartDropdownOpen()) {
    toggleCartDropdown();
  }
};

positionSlidesFromSlideIndex();
setCarouselHeightToSlideImageHeight();
setTimeout()

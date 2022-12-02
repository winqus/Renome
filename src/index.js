import { createRoot } from 'react-dom/client';
import App from './App';
import './scss/styles.scss';
import './css/renomeIcons.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

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

positionSlidesFromSlideIndex();
setCarouselHeightToSlideImageHeight();

if (getCarouselImageHeight() === 0) {
  slides[0].querySelector('.carousel__image').addEventListener('load', setCarouselHeightToSlideImageHeight);
}

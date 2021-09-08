const headerSearch = document.querySelector(".header-bottom__search");
const searchIcon = headerSearch.getElementsByTagName("svg");
const searchInput = headerSearch.querySelector(".header-bottom__search-input");
searchIcon[0].addEventListener("click", () => {
  headerSearch.classList.toggle("header-bottom__search--active");
  searchInput.value = "";
});

const burger = document.querySelector(".header__burger");
if (burger) {
  const burgerMenu = document.querySelector(".nav__list");
  burger.addEventListener("click", () => {
    burgerMenu.classList.toggle("nav__list--active");
  });
}

const univerSlider = document.querySelector(".universities");
if (univerSlider) {
  univerSlider.querySelectorAll(".swiper-container").forEach((slide, index) => {
    let speeds = [7000, 7500, 8000, 8500];
    new Swiper(slide, {
      slidesPerView: 2,
      speed: speeds[index],
      spaceBetween: 100,
      centeredSlides: true,
      loop: true,
      freeMode: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
          spaceBetween: 60,
        },
        600: {
          slidesPerView: 2,
        },
      },
    });
  });
}

const menuList = document.querySelector(".menu");
if (menuList) {
  const menuItem = menuList.querySelectorAll(".menu__item");
  const tabBody = document.querySelector(".tab-caption");
  menuItem.forEach((element, index) => {
    element.addEventListener("click", function (e) {
      menuList
        .querySelector(".menu__item--active")
        .classList.remove("menu__item--active");
      this.classList.add("menu__item--active");
      tabBody
        .querySelector(".tab__pane--active")
        .classList.remove("tab__pane--active");
      tabBody
        .querySelectorAll(".tab__pane")
        [index].classList.add("tab__pane--active");
    });
  });
}

const commentSliderHelp = document.querySelector(".swiper-container-help");
if (commentSliderHelp) {
  const sliderHelp = new Swiper(".swiper-container-help", {
    spaceBetween: 10,
    slidesPerView: 5,
    loop: true,
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      550: {
        slidesPerView: 3,
      },
      767: {
        slidesPerView: 4,
      },
      991: {
        slidesPerView: 5,
      },
    },
  });
}
const commentsSlider = document.querySelectorAll(".comments");
if (commentsSlider) {
  commentsSlider.forEach((item) => {
    new Swiper(item.querySelector(".swiper-container"), {
      mode: "horizontal",
      slidesPerView: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop: true,
    });
  });
}

const question = document.querySelectorAll(".question__content");
const questionAdd = document.querySelectorAll(".question__add");
if (question) {
  question.forEach((item, index) => {
    item.addEventListener("click", () => {
      question[index].classList.toggle("question__content--active");
      questionAdd[index].classList.toggle("question__add--active");
    });
  });
}

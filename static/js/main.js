"use strict";

// // Полифилы
//
// // forEach IE 11
// if ('NodeList' in window && !NodeList.prototype.forEach) {
//     console.info('polyfill for IE11');
//     NodeList.prototype.forEach = function (callback, thisArg) {
//         thisArg = thisArg || window;
//         for (var i = 0; i < this.length; i++) {
//             callback.call(thisArg, this[i], i, this);
//         }
//     };
// }
//
// // closest IE 11
// (function () {
//     if (!Element.prototype.closest) {
//         Element.prototype.closest = function (css) {
//             var node = this;
//             while (node) {
//                 if (node.matches(css)) return node;
//                 else node = node.parentElement;
//             }
//             return null;
//         };
//     }
// })();
//
// // matches IE 11
// (function () {
//     if (!Element.prototype.matches) {
//         Element.prototype.matches = Element.prototype.matchesSelector ||
//             Element.prototype.webkitMatchesSelector ||
//             Element.prototype.mozMatchesSelector ||
//             Element.prototype.msMatchesSelector;
//     }
// })();
//
// //Array.form IE 11
// if (!Array.from) {
//     Array.from = function (object) {
//         'use strict';
//         return [].slice.call(object);
//     };
// }
document.addEventListener("DOMContentLoaded", function () {
  //The first argument are the elements to which the plugin shall be initialized
  //The second argument has to be at least a empty object or a object with your desired options
  OverlayScrollbars(document.querySelectorAll("body"), {}); // let instance = OverlayScrollbars(document.getElementById(id), { /* your options */ });

  var headerMenu = OverlayScrollbars(document.querySelectorAll('.header_menu-nav'), {}),
      tabContent = OverlayScrollbars(document.querySelectorAll('.tabs .tabs_content'), {}),
      modalBlock = OverlayScrollbars(document.querySelectorAll('.modals .modal'), {});
}); //Header

var headerMenu = document.querySelector('header .header_menu'),
    headerMenuButtonOpen = headerMenu.querySelector('.header_menu-button'),
    headerMenuButtonClose = headerMenu.querySelector('.btn-close'),
    headerMenuBlock = headerMenu.querySelector('.header_menu-nav--wrapper'),
    headerRequestCallButton = document.querySelector('.header .header_call'),
    requestNotificationButton = document.querySelector('.call-when-open'),
    modalContainer = document.querySelector('.modals'),
    modalsList = modalContainer.querySelectorAll('.modal'),
    modalCloseButtons = document.querySelectorAll('.modals .modal .btn-close'),
    modalRequest = document.querySelector('.modals #request'),
    modalNotification = document.querySelector('.modals #notification');

function ToggleMenuVisibility() {
  if (headerMenuBlock.classList.contains('show')) {
    headerMenuBlock.classList.remove('show');
  } else {
    headerMenuBlock.classList.add('show');
  }
}

headerMenuBlock.addEventListener('click', ToggleMenuVisibility);
headerMenuButtonOpen.addEventListener('click', ToggleMenuVisibility);
headerMenuButtonClose.addEventListener('click', ToggleMenuVisibility);
headerMenuBlock.querySelector('.header_menu-nav').addEventListener('click', function (e) {
  return e.stopPropagation();
});
headerRequestCallButton.addEventListener('click', function () {
  modalContainer.classList.add('active');
  modalRequest.classList.add('active');
});

if (requestNotificationButton) {
  requestNotificationButton.addEventListener('click', function () {
    modalContainer.classList.add('active');
    modalNotification.classList.add('active');
  });
}

modalContainer.addEventListener('click', function () {
  modalContainer.classList.remove('active');
  modalRequest.classList.remove('active');
  modalNotification.classList.remove('active');
});

for (var m = 0; m < modalsList.length; m++) {
  modalsList[m].addEventListener('close', function (e) {
    return e.stopPropagation();
  });
}

for (var b = 0; b < modalCloseButtons.length; b++) {
  modalCloseButtons[b].addEventListener('click', function () {
    modalContainer.classList.remove('active');
    modalRequest.classList.remove('active');
    modalNotification.classList.remove('active');
  });
} // Add a function that generates pagination to prototype


Siema.prototype.addPagination = function () {
  var _this = this;

  var btnContainer = document.createElement('div');
  this.selector.appendChild(btnContainer);
  btnContainer.classList.add('pagination');

  var _loop = function _loop(i) {
    var btn = document.createElement('button');
    btn.classList.add('btn');
    btn.setAttribute('type', 'button');
    btn.textContent = i;
    btn.addEventListener('click', function () {
      return _this.goTo(i, function () {
        btnContainer.querySelector('.btn.active').classList.remove('active');
        var btnList = btnContainer.querySelectorAll('.btn'),
            target = btnList[i];
        target.classList.add('active');
      });
    });
    btnContainer.appendChild(btn);
  };

  for (var i = 0; i < this.innerElements.length; i++) {
    _loop(i);
  }

  btnContainer.querySelector('.btn').classList.add('active');
};

if (document.querySelector('.feedback')) {
  var feedback = document.querySelector('.feedback');
  var feedbackCarousel = new Siema({
    selector: '.feedback',
    perPage: {
      320: 1,
      768: 2
    },
    loop: true,
    onChange: function onChange() {
      var dotsList = document.querySelectorAll('.feedback .pagination .btn'),
          dotActive = document.querySelector('.feedback .pagination .btn.active'),
          target = this.currentSlide;
      dotActive.classList.remove('active');

      if (target < 0) {
        target = dotsList.length + target;
        dotsList[target].classList.add('active');
      } else {
        dotsList[target].classList.add('active');
      }
    }
  });
  feedbackCarousel.addPagination();
  console.log(document.querySelectorAll('.feedback .pagination .btn'));
  setInterval(function () {
    return feedbackCarousel.next();
  }, 5000);
}

if (document.querySelector('.main--tours .tours_list--inner')) {
  var toursListScroll = function toursListScroll(e) {};

  var toursListInner = document.querySelector('.main--tours .tours_list--inner'),
      toursList = document.querySelector('.main--tours .tours_list'),
      toursListTop = toursList.offsetTop,
      toursItemList = toursListInner.querySelectorAll('.tour');

  if (toursItemList.length <= 2) {
    for (var t = 0; t < toursItemList.length; t++) {
      toursItemList[t].classList.add('tour--big');
    }
  }

  var differents = toursListInner.offsetHeight - toursList.offsetHeight,
      translate = 0;

  toursListInner.onwheel = function (e) {
    if (differents > 0) {
      if (translate <= 0 && e.deltaY < 0) {
        translate = 0;
      } else {
        translate = translate + e.deltaY;

        if (translate > differents) {
          translate = differents;
        }
      }

      for (var r = 0; r < toursItemList.length; r++) {
        if (translate - toursItemList[r].offsetTop > toursListTop) {
          toursItemList[r].classList.add('opaque');
        } else {
          toursItemList[r].classList.remove('opaque');
        }
      }

      toursListInner.style.transform = "translateY(" + translate * -1 + "px)";
    }
  };
}

if (document.querySelector('.tours-carousel_slides')) {
  (function () {
    var ChangeSlide = function ChangeSlide(index) {
      var target = index + 1;

      if (contentMain.classList.contains('hidden')) {
        for (var r = 0; r < contentList.length; r++) {
          contentList[r].classList.remove('current');
          imagesList[r].classList.remove('current');
        }

        contentList[target].classList.add('current');
        imagesList[target].classList.add('current');
      } else {
        contentWrapper.classList.add('active');
        contentList[target].classList.add('current');
        contentMain.classList.add('hidden');
        imagesListWrapper.classList.add('active');
        imagesList[target].classList.add('current');
        imagesListMain.classList.add('hidden');
      }
    };

    var ChangeSlideToMain = function ChangeSlideToMain() {
      for (var r = 0; r < contentList.length; r++) {
        contentList[r].classList.remove('current');
        imagesList[r].classList.remove('current');
      }

      contentWrapper.classList.remove('active');
      contentMain.classList.remove('hidden');
      imagesListWrapper.classList.remove('active');
      imagesListMain.classList.remove('hidden');
    };

    console.log('Slides Founded!');
    var slides = document.querySelector('.tours-carousel_slides'),
        slidesList = slides.querySelectorAll('.tours-list_item .btn'),
        imagesList = document.querySelectorAll('.image-background img'),
        imagesListWrapper = document.querySelector('.image-background'),
        imagesListMain = document.querySelector('.image-background .main'),
        contentList = document.querySelectorAll('.main .content--main'),
        contentWrapper = document.querySelector('.tours-carousel_content'),
        contentMain = contentList[0];

    var _loop2 = function _loop2(slideIndex) {
      slidesList[slideIndex].addEventListener('mouseenter', function () {
        ChangeSlide(slideIndex);
      });
      slides.querySelector('.tours-list').addEventListener('mouseleave', function () {
        ChangeSlideToMain();
      });
    };

    for (var slideIndex = 0; slideIndex < slidesList.length; slideIndex++) {
      _loop2(slideIndex);
    }

    var slidesCarouselPrev = slides.querySelector('.btn-prev'),
        slidesCarouselNext = slides.querySelector('.btn-next'),
        slidesCarouselCurrentPrev;
    var slidesCarousel = new Siema({
      selector: '.tours-list',
      perPage: {
        320: 1,
        640: 2,
        900: 3,
        1200: 4
      },
      onInit: function onInit() {
        console.log(this.currentSlide);
      },
      onChange: function onChange() {}
    });
    slidesCarouselNext.addEventListener('click', function () {
      slidesCarouselCurrentPrev = slidesCarousel.currentSlide;
      slidesCarousel.next();

      if (slidesCarouselCurrentPrev == slidesCarousel.currentSlide) {
        ChangeSlide(slidesCarousel.currentSlide);
        var slidesListActive = slides.querySelector('.tours-list_item .btn.active');

        if (slidesListActive) {
          slidesListActive.classList.remove('active');
        }

        slidesList[slidesCarousel.currentSlide].classList.add('active');

        if (slidesCarousel.currentSlide < slidesCarousel.innerElements.length - 1) {
          slidesCarousel.currentSlide = slidesCarouselCurrentPrev + 1;
        }
      } else if (slidesCarouselCurrentPrev < slidesCarousel.currentSlide) {
        ChangeSlide(slidesCarousel.currentSlide);

        var _slidesListActive = slidesList.querySelector('.btn.active');

        if (_slidesListActive) {
          _slidesListActive.classList.remove('active');
        }

        slidesList[slidesCarousel.currentSlide].classList.add('active');
      }
    });
    slidesCarouselPrev.addEventListener('click', function () {
      slidesCarouselCurrentPrev = slidesCarousel.currentSlide;
      slidesCarousel.prev();

      if (slidesCarousel.currentSlide > 0) {
        if (slidesCarouselCurrentPrev == slidesCarousel.currentSlide) {
          ChangeSlide(slidesCarousel.currentSlide - 1);
          var slidesListActive = slides.querySelector('.tours-list_item .btn.active');

          if (slidesListActive) {
            slidesListActive.classList.remove('active');
          }

          slidesList[slidesCarousel.currentSlide - 1].classList.add('active');

          if (slidesCarouselCurrentPrev > 1) {
            slidesCarousel.currentSlide = slidesCarouselCurrentPrev - 1;
          }
        } else if (slidesCarouselCurrentPrev > slidesCarousel.currentSlide) {
          console.log(slidesCarouselCurrentPrev, slidesCarousel.currentSlide);
          ChangeSlide(slidesCarousel.currentSlide);

          var _slidesListActive2 = slidesList.querySelector('.btn.active');

          if (_slidesListActive2) {
            _slidesListActive2.classList.remove('active');
          }

          slidesList[slidesCarousel.currentSlide].classList.add('active');
        }
      }
    });
  })();
}

if (document.querySelector('.main--tours .tour-info .tabs')) {
  (function () {
    var ToggleTab = function ToggleTab(target) {
      for (var tab = 0; tab < tabsList.length; tab++) {
        tabsList[tab].classList.remove('active');
        contentList[tab].classList.remove('active');
      }

      tabsList[target].classList.add('active');
      contentList[target].classList.add('active');
    };

    console.log('Tabs founded!');
    var tabsList = document.querySelectorAll('.tabs .tab'),
        contentList = document.querySelectorAll('.tabs_content .tab_content'),
        buttonMore = document.querySelector('.main--tours .content--tour .btn-more'),
        tourInfoblock = document.querySelector('.main--tours .tour-info'),
        tourTitleblock = document.querySelector('.main--tours .content--tour');
    buttonMore.addEventListener('click', function () {
      tourInfoblock.classList.add('show');
    });

    var _loop3 = function _loop3(_t) {
      tabsList[_t].addEventListener('click', function () {
        ToggleTab(_t);
      });
    };

    for (var _t = 0; _t < tabsList.length; _t++) {
      _loop3(_t);
    }
  })();
}
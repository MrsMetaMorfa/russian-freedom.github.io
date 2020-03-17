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
  OverlayScrollbars(document.querySelectorAll("body"), {});
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
  e.stopPropagation();
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
    e.stopPropagation();
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
      return _this.goTo(i);
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
    perPage: 2
  });
  feedbackCarousel.addPagination();
}
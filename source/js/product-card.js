'use strict';

(function () {
  var PINK = '#d91667';
  var GREY = '#666666';
  var SELECTED_HOVER_OVERTITLE_TEXT = 'Котэ не одобряет?';

  var defaultPromoWords = document.querySelector('.product-card__promo-words').innerHTML;

  var selectedPromoWordsMap = {
    'product-card--foie-gras': 'Печень утки разварная с артишоками.',
    'product-card--fish': 'Головы щучьи с чесноком да свежайшая сёмгушка.',
    'product-card--chicken': 'Филе из цыплят с трюфелями в бульоне.'
  }

  var disabledPromoWordsMap = {
    'product-card--foie-gras': 'Печалька, с фуа-гра закончился.',
    'product-card--fish': 'Печалька, с рыбой закончился.',
    'product-card--chicken': 'Печалька, с курой закончился.'
  }

  var productList = document.querySelector('.products__list');

  var defaultOvertitleText = document.querySelector('.product-card__overtitle').textContent;

  var isNotPromoWords = function (elem) {
    return !elem.classList.contains('product-card__promo-words') || elem.classList.contains('product-card__buy-word');
  }

  var getParentByClassName = function (elem, parentClassName) {
    var currentElem = elem;
    while (currentElem !== document && !currentElem.classList.contains(parentClassName)) {
      currentElem = currentElem.parentNode;
    }
    if (currentElem === document || !currentElem.classList.contains(parentClassName)) {
      return null;
    }
    return currentElem;
  }

  var setOvertitle = function (overtitle, overtitleText, overtitleColor) {
    overtitle.textContent = overtitleText;
    overtitle.style.color = overtitleColor;
  }

  var onProductCardClick = function (target, productCard) {
    if (target.classList.contains('product-card__buy-word')) {
      productCard.classList.remove('product-card--default-hover');
    }
    var overtitle = productCard.querySelector('.product-card__overtitle');
    var promoWords = productCard.querySelector('.product-card__promo-words');
    if (productCard.classList.contains('product-card--selected')) {
      setOvertitle(overtitle, defaultOvertitleText, GREY);
      promoWords.innerHTML = defaultPromoWords;
    } else {
      promoWords.textContent = selectedPromoWordsMap[productCard.classList[2]];
    }
    productCard.classList.toggle('product-card--selected');
  }

  var onProductCardEventsBody = function (target, onProductCardEvent, overtitleText, overtitleColor) {
    if (isNotPromoWords(target)) {
      var productCard = getParentByClassName(target, 'product-list__card');
      if (productCard !== null) {
        if (!productCard.classList.contains('product-card--disabled')) {
          onProductCardEvent(target, productCard, overtitleText, overtitleColor);
        }
      }
    }
  }

  productList.addEventListener('click', function (evt) {
    onProductCardEventsBody(evt.target, onProductCardClick);
  });

  var onProductCardOverOut = function (target, productCard, overtitleText, overtitleColor) {
    var overtitle = productCard.querySelector('.product-card__overtitle');
    if (productCard.classList.contains('product-card--selected')) {
      setOvertitle(overtitle, overtitleText, overtitleColor);
    }
    productCard.classList.toggle('product-card--default-hover');
  }

  productList.addEventListener('mouseover', function (evt) {
    onProductCardEventsBody(evt.target, onProductCardOverOut, SELECTED_HOVER_OVERTITLE_TEXT, PINK);
  });

  productList.addEventListener('mouseout', function (evt) {
    onProductCardEventsBody(evt.target, onProductCardOverOut, defaultOvertitleText, GREY);
  });

  var disableProductCard = function (productCard) {
    productCard.classList.add('product-card--disabled');
    var promoWords = productCard.querySelector('.product-card__promo-words');
    promoWords.textContent = disabledPromoWordsMap[productCard.classList[2]];
  }

  var makeAbledProductCard = function (productCard) {
    productCard.classList.remove('product-card--disabled');
    var promoWords = productCard.querySelector('.product-card__promo-words');
    promoWords.innerHTML = defaultPromoWords;
  }

  var chickenProductCard = document.querySelector('.product-card--chicken');

  disableProductCard(chickenProductCard);
})();

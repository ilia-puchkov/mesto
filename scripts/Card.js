export default class Card {
  // Конструктор класса
  constructor(data, cardtemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;

    this._templateselector = cardtemplate;

    this._element = this._getTemplate();
    this._elementLikeButton = this._element.querySelector('.element__like');
    this._elementDeleteButton = this._element.querySelector('.element__delete');
    this._elementImage = this._element.querySelector('.element__image');
  }

  // Получение формы для карточки
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateselector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  // Удаление карточки
  _handleDeleteCard() {
    this._element.remove();
  }

  // Добавление / удаление лайка
  _handleLikeCard() {
    this._elementLikeButton.classList.toggle('element__like-active');
  }

/*
  // Открытие большого попАпа
  _handleOpenFullImage() {
    imageForFullImagePopUp.src = this._elementImage.src;
    imageForFullImagePopUp.textContent = this._elementImage.alt;
    signatureForFullImagePopUp.textContent = this._elementImage.alt;

    openPopUp(fullImagePopUp);
  }
*/

  // Назначение слушателей
  _setEventListeners() {
    this._elementDeleteButton.addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._elementLikeButton.addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // Генерация карточки (public)
  generateCard() {
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
  
    this._setEventListeners();
  
    return this._element;
  }
}

export {Card};
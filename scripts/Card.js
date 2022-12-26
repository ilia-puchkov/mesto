class Card {
  // Конструктор класса
  constructor(data, cardtemplate) {
    this._name = data.name;
    this._link = data.link;

    this._templateselector = cardtemplate;

    this._element = this._getTemplate();
    this._elementLikeButton = this._element.querySelector('.element__like');
    this._elementDeleteButton = this._element.querySelector('.element__delete');
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

  // Назначение слушателей
  _setEventListeners() {
    this._elementDeleteButton.addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._elementLikeButton.addEventListener('click', () => {
      this._handleLikeCard();
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

// Экспорт 
export {Card};
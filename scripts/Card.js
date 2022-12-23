class Card {
  // Конструктор класса
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  // Получение формы для карточки
  _getTemplate() {
    const cardElement = document
    .querySelector('.element__template')
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  // Генерация карточки
  generateCard() {
    this._element = this._getTemplate();

    this._elementLikeButton = this._element.querySelector('.element__like');
    this._elementDeleteButton = this._element.querySelector('.element__delete');

    this._setEventListeners();

    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }

  // Удаление карточки
  _handleDeleteCard() {
    this._element.remove();
  }

  // Добавление / удаление лайка
  _handleLikeCard() {
    this._elementLikeButton.classList.toggle('.element__like-active');
  }

  // Назначение слушателей
  _setEventListeners() {
    this._elementDeleteButton.addEventListener('click', () => {
      this._handleDeleteCard;
    });

    this._elementLikeButton.addEventListener('click', () => {
      this._handleLikeCard;
    });
  }

}

// Экспорт 
export {Card};
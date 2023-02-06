class Card {
  // Конструктор класса
  constructor({data, ownerId, handleCardClick, handleLikeClick, handleDeleteCard}, cardtemplate) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardOwner = data.owner._id;
    this._ownerId = ownerId;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;

    this._templateSelector = cardtemplate;

    this._element = this._getTemplate();
    this._elementLikeButton = this._element.querySelector('.element__like');
    this._elementDeleteButton = this._element.querySelector('.element__delete');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementLikeCount = this._element.querySelector('.element__like-count');
  }

  // Получение формы для карточки
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  // Получение id
  getId() {
    return this._id;
  }

  // Удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Установка счетчика лайков
  setLikeCounter(likes) {
    this._elementLikeCount.textContent = likes.length;
  }

  // Добавление / удаление лайка
  addLike(likes) {
    this._elementLikeButton.classList.add('element__like-active');
    this.isLiked(true);
    this.setLikeCounter(likes);
    this._likes = likes;
  }

  // Удаление лайка
  removeLike(likes) {
    this._elementLikeButton.classList.remove('element__like-active');
    this.isLiked(false);
    this.setLikeCounter(likes);
    this._likes = likes;
  }

  // проверка наличия like
  isLiked() {
    return this._likes.find((like) => like._id === this._ownerId);
  }
  
  //Установка лайк по статусу
  setInitialLike() {
    if(this.isLiked()) {
      this._elementLikeButton.classList.add('element__like-active');
    }
  }

  checkOwner() {
    if(this._ownerId != this._cardOwner) {
      this._elementDeleteButton.classList.remove('element__delete-visible');
    }
  }

  // Генерация карточки (public)
  generateCard() {
    this._element.querySelector('.element__name').textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    
    this.setInitialLike();

    this.checkOwner();
    
    this.setLikeCounter(this._likes);

    this._setEventListeners();
  
    return this._element;
  }

  // Назначение слушателей
  _setEventListeners() {
    this._elementDeleteButton.addEventListener('click', () => {
      this._handleDeleteCard();
    });
  
    this._elementLikeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });
  
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

export {Card};
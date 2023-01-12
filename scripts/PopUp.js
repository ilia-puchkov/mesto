class PopUp {
  // Конструктор класса
  constructor(popUp) {
    this._popUp = document.querySelector(popUp);
    this._buttonsForClose = this._popUp.querySelector('.popup__close-button');
  }

  // Открытие окна
  open() {
    this._popUp.classList.add('popup_opened');
    this._popUp.addEventListener('click', this._handleCloseByOverlay);
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрытие окна
  close() {
    this._popUp.classList.remove('popup_opened');
    this._popUp.removeEventListener('click', this._handleCloseByOverlay);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Закрытие через ESC
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Закрытие через оверлей
  _handleCloseByOverlay(evt) {
    if(evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  // Слушатель для кнопки закрытия
  setEventListeners() {
    this._buttonsForClose.addEventListener('click', this.close());
  }
}

export { PopUp };
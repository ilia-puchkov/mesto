class PopUp {
  // Конструктор класса
  constructor(popUp) {
    this._popUp = popUp;
    this._buttonsForClose = this._popUp.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Открытие окна
  open() {
    this._popUp.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрытие окна
  close() {
    this._popUp.classList.remove('popup_opened');
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
    if(evt.target === evt.currentTarget) {
      this.close();
    }
  }

  // Слушатель для кнопки закрытия
  setEventListeners() {
    this._buttonsForClose.addEventListener('click', () => this.close());

    this._popUp.addEventListener('click', (evt) => {
      this._handleCloseByOverlay(evt);
    });
  }
}

export { PopUp };
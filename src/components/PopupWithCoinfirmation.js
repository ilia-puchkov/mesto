import { PopUp } from "./PopUp.js";

class PopupWithConfirmation extends PopUp {
  constructor(PopUp) {
    super(PopUp);
    this._form = this._popUp.querySelector('.form');
    this._subtimButton = this._form.querySelector('.form__save-button');
  }

  //Действия при подтверждении
  handleCardDelete(deleteFunctiont) {
    this._handleSubmitForm = deleteFunctiont;
  }

  //Текст при подтверждении
  renderLoading(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleSubmitForm();
    })
  }
}

export { PopupWithConfirmation };
import { PopUp } from './PopUp.js';

class PopupWithForm extends PopUp {
  // Обновление конструктора
  constructor({popUp, handleSubmitForm}) {
    super(popUp);

    this._popupForm = this._popUp.querySelector('.form');
    this._inputList = this._popupForm.querySelectorAll('.form__input');
    this._submitButton = this._popupForm.querySelector('.form__save-button');

    this._handleSubmitForm = handleSubmitForm;
  }

  // Сбор данных полей
  _getInputValues() {
    this._inputValues = {};

    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

    //Текст при подтверждении
    renderLoading(text) {
      this._submitButton.textContent = text;
    }

  // Обновление родительского метода
  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleSubmitForm(this._getInputValues());
    });
  }

  // Обновление родительского метода
  close() {
    super.close();

    this._popupForm.reset();
  }
}

export {PopupWithForm};
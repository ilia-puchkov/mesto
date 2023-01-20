import { PopUp } from './PopUp.js';

class PopupWithForm extends PopUp {
  // Обновление конструктора
  constructor(popUp, formSubmit) {
    super(popUp);
    this._formSubmit = formSubmit;
    this._popupForm = this._popupForm.querySelector('.form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.form__input'));
  }

  // Сбор данных полей
  _getInputValues() {
    this.inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  // Обновление родительского метода
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListeners('submit', (evt) => {
      evt.preventDefault();

      this._formSubmit(this._getInputValues());
    });
  }

  // Обновление родительского метода
  close() {
    super.close();
    this._popupForm.reset();
  }
}

export {PopupWithForm};
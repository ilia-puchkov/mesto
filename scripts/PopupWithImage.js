import { PopUp } from './PopUp.js';

export default class PopupWithImage extends PopUp {
  //конструктор для расширения
  constructor(popUp) {
    super(popUp);
    this._image = this._popUp.querySelector('.popup__image');
    this._signature = this._popUp.querySelector('.popup__signature');
  }

  // Расширение
  open(signature, src) {
    this._image.src = src;
    this._image.alt = signature;
    //this._title.textContent = signature;
    super.open();
  }
}

export {PopupWithImage};
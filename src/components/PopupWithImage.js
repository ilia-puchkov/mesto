import { PopUp } from './PopUp.js';

class PopupWithImage extends PopUp {
  //конструктор для расширения
  constructor(popUp) {
    super(popUp);
    this._image = this._popUp.querySelector('.popup__image');
    this._signature = this._popUp.querySelector('.popup__signature');
  }

  // Расширение
  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._signature.textContent = name;
    super.open();
  }
}

export {PopupWithImage};
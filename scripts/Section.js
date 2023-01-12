export default class Section {
  // Конструктор класса
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = containerSelector;
  }

  // Отрисовка
  renderElement() {
    this._items.forEach((item) => this._renderer(item));
  }

  // Размещение
  addItem(item) {
    this._selector.prepend(item);
  }
}

export {Section};
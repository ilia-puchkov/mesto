class Section {
  // Конструктор класса
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  // Отрисовка
  renderElement() {
    this._items.forEach((item) => this._renderer(item));
  }

  // Размещение
  addItem(element) {
    this._container.prepend(element);
  }
}

export {Section};
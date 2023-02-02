class Section {
  // Конструктор класса
  constructor({renderer}, container) {
    this._renderer = renderer;
    this._container = container;
  }

  // Отрисовка
  renderItems(items, userId) {
    this._items = items;
    this._userId = userId;
    this._items.forEach((item) => this._renderer(item, this._userId));
  }

  // Размещение
  addItem(element) {
    this._container.prepend(element);
  }
}

export {Section};
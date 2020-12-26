export default class Section {
  constructor({data, renderer}, cardList){
    this._items = data;
    this._renderer = renderer;
    this._cardList = document.querySelector(cardList);
  }

  renderItems() {
    this._items.forEach(item => {this._renderer(item)});
  }

  addItem(item) {
    this._cardList.prepend(item);
  }
}
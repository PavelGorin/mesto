class Card {
  constructor (name, link, selector) {
    this._name = name;
    this._link = link;
    this._selector = selector;
  }

  _getTemplate() {
    return document.querySelector(this._selector).content.cloneNode(true).children[0];
  }

  _deleteHandler() { 
    this._element.remove();
    this._element = null;
  }

  _likeHandler(evt) {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _setListeners() {
    this._element.querySelector('.element__trash-bin').addEventListener('click', () => this._deleteHandler());
    this._element.querySelector('.element__like').addEventListener('click', () => this._likeHandler());
  }

  getElement(){
    this._element = this._getTemplate();
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._setListeners();
    return this._element;
  }
}

export default Card;
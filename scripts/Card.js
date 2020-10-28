class Card {
  constructor (name, link, selector) {
    this._name = name;
    this._link = link;
    this._selector = selector;
  }

  _getTemplate() {
    return document.querySelector('.card').content.cloneNode(true).children[0];
  }

  _deleteHandler() { 
    this._element.remove();
  }

  _likeHandler(evt) {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _cardZoom() {
    document.querySelector('.popup__image').classList.add("popup_opened");
    document.querySelector(".popup__picture").src = this._element.querySelector('.element__image').src;
    document.querySelector(".popup__picture-name").textContent = this._element.querySelector('.element__name').textContent;
  }

  _zoomClose() {
    document.querySelector('.popup__image').classList.remove("popup_opened");
  }

  _zoomCloseByEsc(evt) {
    const esc = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
      this._zoomClose(esc);
    }
  }

  _zoomCloseByOverlay(evt) {
    const popupOpened = document.querySelector(".popup_opened");
    if (evt.target === evt.currentTarget) {
      this._zoomClose(popupOpened);
    }
  }

  _setListeners() {
    this._element.querySelector('.element__trash-bin').addEventListener('click', () => this._deleteHandler());
    this._element.querySelector('.element__like').addEventListener('click', () => this._likeHandler());
    this._element.querySelector('.element__picture').addEventListener('click', () =>  this._cardZoom());
    this._element.addEventListener("keydown", (evt) => this._zoomCloseByEsc(evt));
  }

  getElement(){
    this._element = this._getTemplate();
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._setListeners();
    return this._element;
  }
}

export default Card;
class Card {
  constructor ({data, handleCardClick}, selector ) {
    this._name = data.name;
    this._link = data.link;               
    this._selector = selector;
    this._handleCardClick = handleCardClick;
 //   this._handleCardClickHandler = this._handleCardClickHandler.bind(this)
  }

  _getTemplate() {
    return document.querySelector(this._selector).content.cloneNode(true).children[0];
  }

  _deleteHandler() { 
    this._element.remove();
    this._element = null;
  }

  _likeHandler() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleCardClickHandler() {
    this._handleCardClick(this._name, this._link);
  }

  
  _setListeners() {
    this._element.querySelector('.element__trash-bin').addEventListener('click', () => this._deleteHandler());
    this._element.querySelector('.element__like').addEventListener('click', () => this._likeHandler());
    this._element.querySelector('.element__picture').addEventListener('click', () => this._handleCardClickHandler());
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
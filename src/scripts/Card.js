class Card {
  constructor ({data, handleCardClick, cardDel, cardLikes, userId}, selector ) {
    this._name = data.name;
    this._link = data.link;
    this._likeCount = data.likes.length;
    this._cardId = data._id;              
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._cardDel = cardDel;
    this._cardLikes = cardLikes;
    this._userId = userId;
  }

  _getTemplate() {
    return document.querySelector(this._selector).content.cloneNode(true).children[0];
  }

  deleteHandler() { 
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
    this._del.addEventListener('click', () => this._deleteHandler());
    this._like.addEventListener('click', () => this._likeHandler());
    this._img.addEventListener('click', () => this._handleCardClickHandler());
  }

  _setData() {
    this._img.setAttribute('alt', 'На фото: ' + this._name);
    this._img.setAttribute('src', this._link);
    this._element.querySelector('.element__name').textContent = this._name;
    this.getCountLike(this._likeCount);
  }


  getElement(){
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._like = this._element.querySelector('.element__like');
    this._img = this._element.querySelector('.element__image');
    this._del = this._element.querySelector('.element__trash-bin');
    this._setData();

    this._userOwnId = this._data.owner._id; // удаление пользователем 
    if (this._userOwnId !== this._userId) {
      this._del.remove();
    }

    this._setListeners();
    return this._element;
  }

  getCardId() {
    return this._cardId;
  }

  likeCountRefresh(refreshlikes) {
    this._data.likes = refreshlikes;
    this.getCountLike(refreshlikes.length);
  }

  _toggleLikeActive() {
    if (this.likeFromUser(this._userId)) {
      this._like.classList.add('element__like_active');
    } else {
      this._like.classList.remove('element__like_active');
    }
  }

  getCountLike(numberOfLike) {
    this._element.querySelector('.element__number-of-likes').textContent = numberOfLike;
    this._toggleLikeActive(this._userId);
  }

  likeFromUser() {
    return this._data.likes.some(like => {
      return like._id === this._userId;
    })
  }

}

export default Card;
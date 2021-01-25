export class Card {
  constructor ({ cardData, handleCardClick, handleCardDelete, handleCardLike, userId }, templateSelector) {
    this._cardData = cardData;
    this._name = this._cardData.name;
    this._link = this._cardData.link;
    this._likeCount = this._cardData.likes.length;
    this._cardId = this._cardData._id;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._cardSelector = templateSelector;
    this._userId = userId;
  }

  _getTemplate() {
    const cardItem = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true)
      .children[0];

      return cardItem;
  }
  
  _toggleLikeButton() {
    if (this.likedByUser(this._userId)) {
      this._likeButton.classList.add('element__like_active');
    } else {
      this._likeButton.classList.remove('element__like_active');
    }
  }


  _setCardData() {
    this._cardImage.setAttribute('alt', 'На фото: ' + this._name);
    this._cardImage.setAttribute('src', this._link);
    this._cardElement.querySelector('.element__name').textContent = this._name;
    this.setLikeCount(this._cardData.likes.length);
  }

  _handleLikeButton() {    
    this._likeButton.classList.toggle('element__like_active');
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => { this._handleCardLike() });
    this._deleteButton.addEventListener('click', () => { this._handleCardDelete() });
    this._cardImage.addEventListener('click', () => { this._handleCardClick(this._cardElement) });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector('.element__like');    
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._deleteButton = this._cardElement.querySelector('.element__trash-bin');
    this._setCardData();    
    this._ownerId = this._cardData.owner._id;
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }
    this._setEventListeners();

    return this._cardElement;
  }

  getCardId() {
    return this._cardId;
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  updateLikeCount(updatedLikes) {
    this._cardData.likes = updatedLikes;
    this.setLikeCount(updatedLikes.length);
  }

  likedByUser() {
    return this._cardData.likes.some(like => {
      return like._id === this._userId;
    })
  }
  
  setLikeCount(likes) {
    this._cardElement.querySelector('.element__number-of-likes').textContent = likes;
    this._toggleLikeButton(this._userId);
  }
}
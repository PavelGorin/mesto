import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupElement = popupElement;
    this._photo = this._popupElement.querySelector('.popup__picture');
    this._popupPhotoTitle = this._popupElement.querySelector('.popup__picture-name');
  }

  open(link, title) {
    super.open();    

    this._photo.setAttribute('src', link);
    this._photo.setAttribute('alt', `На фото: ${title}`);
    this._popupPhotoTitle.textContent = title;
  }
}
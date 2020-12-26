import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupSelector = popupSelector;
    this._photo = this._popupSelector.querySelector('.popup__picture');
    this._popupPhotoName = this._popupSelector.querySelector('.popup__picture-name');
  }

  open(link, name) {
    super.open();
    this._photo.setAttribute('src', link);
    this._photo.setAttribute('alt', name);
    this._popupPhotoName.textContent = name;
  }
}
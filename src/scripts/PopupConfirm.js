import { Popup } from './Popup.js';

export class PopupConfirm extends Popup {
  constructor({ popupElement, submitHandler }) {
    super(popupElement);
    this._submitHandler = submitHandler;
    this._submitButton = this._popupElement.querySelector('.popup__save-button');
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._form = this._popupElement.querySelector('.popup__container');
    this._form.addEventListener('submit', evt => {      
      this._submitHandler(evt, this._element);
    });
  }

  open(element) {
    this._element = element;
    super.open();
  }

  renderLoading(caption) {
    this._submitButton.textContent = caption;
  }
}
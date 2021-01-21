import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popupSelector.querySelector('.popup__container');
    this._popupForm.addEventListener('submit', evt => {      
      this._submitHandler(evt, this._param);
    });
  }

  open(param) {
    this._param = param;
    super.open();
  }
}
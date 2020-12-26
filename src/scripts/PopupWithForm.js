import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitFormHandler}) {
    super(popupSelector);
    this._formSelector = this._popupSelector.querySelector('.popup__container');
    this._submitFormHandler = submitFormHandler;
    this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
  }


  close() {
    super.close();
    this._formSelector.reset();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {this._formValues[input.name] = input.value;});
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formSelector.addEventListener('submit', (evt) => {
     evt.preventDefault();
    this._submitFormHandler(this._getInputValues());
    });
  }
}
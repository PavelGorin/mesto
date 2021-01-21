export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupCloseButton = this._popupSelector.querySelector('.popup__close-button');
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape"){
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close(); 
    }
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose(this));
  }


  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => this.close());
    this._popupSelector.addEventListener('click', (evt) => this._handleOverlayClose(evt));
  }
}
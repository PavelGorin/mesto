export class FormValidator {
  constructor(conf, form) {
    this._conf = conf;
    this._form = form;
    this._button = this._form.querySelector(this._conf.submitButtonSelector);
  }

  _isInputInvalid(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleSubmitButton(inputList, buttonElement, inactiveButtonClass) {
    if (this._isInputInvalid(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  _setErrorMessage(errorMessageElement, errorMessageText, errorClass) {
    errorMessageElement.textContent = errorMessageText;
    errorMessageElement.classList.add(errorClass);
  };

  _hideErrorMessage(errorMessageElement, errorClass) {
    errorMessageElement.textContent = '';
    errorMessageElement.classList.remove(errorClass);
  };

  _checkInputValidity(form, inputElement, errorClass) {
    const inputIsInvalid = !inputElement.validity.valid;
    const errorMessageElement = form.querySelector(`#${inputElement.id}-error`);

    if (inputIsInvalid) {
      const errorMessageText = inputElement.validationMessage;
      this._setErrorMessage(errorMessageElement, errorMessageText, errorClass);
    } else {
      this._hideErrorMessage(errorMessageElement, errorClass);
    };
  };

  _setEventListeners(conf, form) {
    const inputList = Array.from(form.querySelectorAll(conf.inputSelector));

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(form, inputElement, conf.errorClass, conf.inputErrorClass);
        this._toggleSubmitButton(inputList, this._button, conf.inactiveButtonClass);
      });
    });
    this._toggleSubmitButton(inputList, this._button, conf.inactiveButtonClass);
  };

  resetAllErrors() {
    const errorInputList = Array.from(this._form.querySelectorAll('.popup__input_state_error'));
    const errorMessageList = Array.from(this._form.querySelectorAll('.popup__form-error_active'));

    if (errorInputList.length > 0) {
      errorInputList.forEach(errorInputItem => {
        errorInputItem.classList.remove(this._conf.errorClass)
      });
    };

    if (errorMessageList.length > 0) {
      errorMessageList.forEach(errorMessageItem => {
        errorMessageItem.classList.remove(this._conf.errorClass)
      });
    };

    this._button.classList.add(this._conf.inactiveButtonClass);
    this._button.setAttribute('disabled', true);
  }

  enableValidation() {
    this._setEventListeners(this._conf, this._form);
  };
}
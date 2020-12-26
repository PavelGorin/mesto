class FormValidator {
  constructor(formSelector, validationConfig) {
    this._inputSelector = validationConfig.inputSelector;
    this._formSelector = formSelector;
    this._formElement = document.querySelector(formSelector);
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
  }

_showInputError(inputElement, errorMessage) {
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);
};

_hideInputError (inputElement) {
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove(this._errorClass);
  inputElement.classList.remove(this._inputErrorClass);
};

_checkInputValidity(inputElement) {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;

    this._showInputError(inputElement, errorMessage);
  } else {
    this._hideInputError(inputElement);
  }
};

_toggleButtonState(inputList, buttonElement) {
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );
  if (hasInvalidInput) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

_setEventListeners() {
  const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)
  );
  const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  });
  this._toggleButtonState(inputList, buttonElement);
};

disabledButton(buttonElement) {
  buttonElement.classList.add(this._inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
}

enableValidation() {
  this._formElement.addEventListener("submit", (event) => {event.preventDefault(); });
  this._setEventListeners();
  };
}

export default FormValidator;


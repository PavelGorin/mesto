class FormValidator {
  constructor(formSelector, input) {
    this._inputSelector = input.inputSelector;
    this._formSelector = formSelector;
    this._formElement = document.querySelector(formSelector);
    this._submitButtonSelector = input.submitButtonSelector;
    this._inactiveButtonClass = input.inactiveButtonClass;
    this._inputErrorClass = input.inputErrorClass;
    this._errorClass = input.errorClass;
  }

_showInputError(formElement, inputElement, errorMessage) {
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);
};

_hideInputError (formElement, inputElement) {
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove(this._errorClass);
  inputElement.classList.remove(this._inputErrorClass);
};

_checkInputValidity(formElement, inputElement) {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;

    this._showInputError(this._formElement, inputElement, errorMessage);
  } else {
    this._hideInputError(this._formElement, inputElement);
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
      this._checkInputValidity(this._formElement, inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  });
  this._toggleButtonState(inputList, buttonElement);
};

enableValidation() {
  const formList = Array.from(document.querySelectorAll(this._formSelector));

  this._formElement.addEventListener("submit", (event) => {event.preventDefault(); });

  this._setEventListeners(this._formElement);
  
  };
}

export default FormValidator;


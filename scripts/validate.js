const showInputError = (formElement, inputElement, errorMessage, input) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(input.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(input.errorClass);
};

const hideInputError = (formElement, inputElement, input) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove(input.errorClass);
  inputElement.classList.remove(input.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, input) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;

    showInputError(formElement, inputElement, errorMessage, input);
  } else {
    hideInputError(formElement, inputElement, input);
  }
};

const toggleButtonState = (inputList, buttonElement, input) => {
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );
  if (hasInvalidInput) {
    buttonElement.classList.add(input.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(input.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement, input) => {
  const inputList = Array.from(
    formElement.querySelectorAll(input.inputSelector)
  );
  const buttonElement = formElement.querySelector(input.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, input);
      toggleButtonState(inputList, buttonElement, input);
    });
  });
};

const enableValidation = (input) => {
  const formList = Array.from(document.querySelectorAll(input.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    setEventListeners(formElement, input);
  });
};

enableValidation({
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_error-active",
  errorClass: "popup__input-error_active",
});
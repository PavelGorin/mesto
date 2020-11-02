import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {openPopup, closePopup} from './utils.js';

const config = {
  card: ".card",
  cardsList: document.querySelector(".elements"),
  newPlace: document.querySelector(".popup__container_new-place"),
  name: document.querySelector(".popup__place"),
  link: document.querySelector(".popup__link"),
}
  
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область", 
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach(({name, link})=>{
    const card = new Card(name, link,  config.card);
    const element = card.getElement();
    config.cardsList.prepend(element);
})

const addCard = (event) => {
    event.preventDefault();
    const card = new Card(config.name.value, config.link.value,  config.card);
    const element = card.getElement();
    config.cardsList.prepend(element);
    closePopupNewPlace(); 
}

config.newPlace.addEventListener('submit', addCard);

const imagePopup = document.querySelector(".popup__image");
const imagePopupCloseButton = imagePopup.querySelector(
  ".popup__close-button_image"
);
const imagePicture = imagePopup.querySelector(".popup__picture");
const imageName = imagePopup.querySelector(".popup__picture-name");

export function openPopupImage(card) {
  // Open popup image
  openPopup(imagePopup);
  imagePicture.src = card.target.src;
  imageName.textContent = card.target.alt;
}

const validationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_error-active",
  errorClass: "popup__input-error_active",
};

const formsSelectors = {
formProfileSelector:".popup__container_profile",
formNewPlaceSelector:".popup__container_new-place",
}

const formProfileValidator = new FormValidator(formsSelectors.formProfileSelector, validationConfig);
formProfileValidator.enableValidation();


const formNewPlaceValidator = new FormValidator(formsSelectors.formNewPlaceSelector, validationConfig);
formNewPlaceValidator.enableValidation()


const popupProfile = document.querySelector(".popup__profile");
const editButton = document.querySelector(".profile__edit-button");
const closeEditUserProfileButton = document.querySelector(
  ".popup__close-button_profile"
);
const inputName = document.querySelector(".popup__name");
const inputProfession = document.querySelector(".popup__profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const popupSaveButtonProfile=document.querySelector('.popup__save-button_profile');


function openPopupProfile() {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  formProfileValidator.disabledButton(popupSaveButtonProfile);
}

editButton.addEventListener("click", openPopupProfile);



function closePopupProfile() {
  closePopup(popupProfile);
}

closeEditUserProfileButton.addEventListener("click", closePopupProfile);

const editProfileFormSubmit = document.querySelector(".popup__container");

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupProfile);
}

editProfileFormSubmit.addEventListener("submit", formSubmitHandler);

// Code for popups new Place

const popupNewPlace = document.querySelector(".popup__new-place");
const inputCardPlace = document.querySelector(".popup__place");
const inputCardLink = popupNewPlace.querySelector(".popup__link");
const addButton = document.querySelector(".profile__add-button");
const closeButtonNewPlace = popupNewPlace.querySelector(
  ".popup__close-button_newplace"
);
const popupSaveButtonNewPlace=document.querySelector('.popup__save-button_new-place');

function openPopupNewPlace() {
  openPopup(popupNewPlace);
  inputCardPlace.value = "";
  inputCardLink.value = "";
  formNewPlaceValidator.enableValidation(popupSaveButtonNewPlace);
}

addButton.addEventListener("click", openPopupNewPlace);

function closePopupNewPlace() {
  closePopup(popupNewPlace);
}

closeButtonNewPlace.addEventListener("click", closePopupNewPlace);

function closePopupImage() {
  // close popup image
  closePopup(imagePopup);
}

imagePopupCloseButton.addEventListener("click", closePopupImage);




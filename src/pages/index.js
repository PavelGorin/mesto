import './index.css';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import { initialCards } from '../scripts/utils.js';

const imagePopup = document.querySelector(".popup_image");

const formsSelectors = {
  formProfileSelector: ".popup__container_profile",
  formNewPlaceSelector: ".popup__container_new-place",
}

const popupWithImage = new PopupWithImage(imagePopup);
popupWithImage.setEventListeners();
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const popupProfile = document.querySelector(".popup_profile");
const editButton = document.querySelector(".profile__edit-button");
const inputName = document.querySelector(".popup__name");
const inputProfession = document.querySelector(".popup__profession");

const validationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_error-active",
  errorClass: "popup__input-error_active",
};

const userProfile = new UserInfo(profileName, profileProfession);
const formProfileValidator = new FormValidator(formsSelectors.formProfileSelector, validationConfig);
formProfileValidator.enableValidation();

const popupEditProfile = new PopupWithForm({
  popupSelector: popupProfile,
  submitFormHandler: (obj) => {
    userProfile.setUserInfo(obj);
    popupEditProfile.close();
  }
});

popupEditProfile.setEventListeners();

const toggleEditPopup = () => {
  const currentUserInfo = userProfile.getUserInfo();

  inputName.value = currentUserInfo.name;
  inputProfession.value = currentUserInfo.info;

  popupEditProfile.open();
}

editButton.addEventListener('click', toggleEditPopup);

const popupNewPlace = document.querySelector(".popup_new-place");
const addButton = document.querySelector(".profile__add-button");


const section = new Section({
  data: initialCards,
  renderer: (item) => {
    newCardCreater(item);
  }
},
  '.elements');

section.renderItems();

const popupAddNewPlace = new PopupWithForm({
  popupSelector: popupNewPlace,
  submitFormHandler: (cardObj) => {
    newCardCreater(cardObj);
    popupAddNewPlace.close();
  }
});

function newCardCreater(obj) {
  const card = new Card({
    data: obj,
    handleCardClick: () => {
      popupWithImage.open(obj.link, obj.name);
    }
  },
    '.card');
  section.addItem(card.getElement());
}

popupAddNewPlace.setEventListeners();

const toggleAddPopup = () => {
  popupAddNewPlace.open();
}

addButton.addEventListener('click', toggleAddPopup);

const formNewPlaceValidator = new FormValidator(formsSelectors.formNewPlaceSelector, validationConfig);
formNewPlaceValidator.enableValidation()
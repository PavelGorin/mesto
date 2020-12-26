import './index.css';

import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';

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

const imagePopup = document.querySelector(".popup_image");

const formsSelectors = {
  formProfileSelector:".popup__container_profile",
  formNewPlaceSelector:".popup__container_new-place",
  }

const popupWithImage = new PopupWithImage(imagePopup);
popupWithImage.setEventListeners();


  
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const popupProfile = document.querySelector(".popup_profile");
const editButton = document.querySelector(".profile__edit-button");
const closeEditUserProfileButton = document.querySelector(
  ".popup__close-button_profile"
);
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


const userProfile = new UserInfo (profileName, profileProfession);
const formProfileValidator = new FormValidator(formsSelectors.formProfileSelector, validationConfig);
formProfileValidator.enableValidation();

const popupEditProfile = new PopupWithForm({
  popupSelector: popupProfile,
  submitFormHandler: () => {
    userProfile.setUserInfo({
      name: inputName.value,
      info: inputProfession.value
    });

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
const inputCardPlace = document.querySelector(".popup__place");
const inputCardLink = popupNewPlace.querySelector(".popup__link");
const addButton = document.querySelector(".profile__add-button");
const closeButtonNewPlace = popupNewPlace.querySelector(
  ".popup__close-button_newplace"
);
const popupSaveButtonNewPlace=document.querySelector('.popup__save-button_new-place');

const section = new Section({
    data: initialCards,
    renderer: (item) => {
      const card = new Card({
        data: item,
        handleCardClick: () => {
          popupWithImage.open(item.link, item.name);
        }
      },
      '.card');
      section.addItem(card.getElement());
    }
  },
  '.elements');

section.renderItems();

const popupAddNewPlace = new PopupWithForm({
  popupSelector: popupNewPlace,
  submitFormHandler: () => {
    const cardObj = {
      name: inputCardPlace.value,
      link: inputCardLink.value
    }
    const card = new Card({
      data: cardObj,
      handleCardClick: () => {
        popupWithImage.open(cardObj.link, cardObj.name);
      }
    },
    '.card');
     section.addItem(card.getElement());
     popupAddNewPlace.close();
  }
});


popupAddNewPlace.setEventListeners();

const toggleAddPopup = () => {
//  newPlace.reset();
  popupAddNewPlace.open();
}

addButton.addEventListener('click', toggleAddPopup);

const formNewPlaceValidator = new FormValidator(formsSelectors.formNewPlaceSelector, validationConfig);
formNewPlaceValidator.enableValidation()



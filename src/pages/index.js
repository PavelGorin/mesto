import './index.css';
import Card from '../scripts/Card.js';
import {Popup} from '../scripts/Popup.js';
import FormValidator from '../scripts/FormValidator.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import { initialCards } from '../scripts/utils.js';
import API from '../scripts/API.js'
import {PopupWithSubmit} from '../scripts/PopupWithSubmit.js';

const imagePopup = document.querySelector(".popup_image");

const formsSelectors = {
  formProfileSelector: ".popup__container_profile",
  formNewPlaceSelector: ".popup__container_new-place",
  formAvatarSelector: ".popup__container_avatar",
}

const popupWithImage = new PopupWithImage(imagePopup);
popupWithImage.setEventListeners();
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const popupProfile = document.querySelector(".popup_profile");
const editButton = document.querySelector(".profile__edit-button");
const inputName = document.querySelector(".popup__name");
const inputProfession = document.querySelector(".popup__profession");
const profileAvatar = document.querySelector('.profile__avatar');
const saveLoaded = 'Сохранение...';
const saveWaitingClick = 'Сохранить';
let section = {};
let renderTurn = true;

const validationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_error-active",
  errorClass: "popup__input-error_active",
};

const api = new API({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '534a01fb-4115-4a8d-993b-e26c3c7e9d82',
    'Content-Type': 'application/json'
  }
});

const userProfile = new UserInfo({
  profileName: profileName, profileProfession: profileProfession, profileAvatar: profileAvatar});

  const formProfileValidator = new FormValidator(formsSelectors.formProfileSelector, validationConfig);
formProfileValidator.enableValidation();

const popupEditProfile = new PopupWithForm({
  popupSelector: popupProfile,
  submitFormHandler: editProfileSubmit
});

popupEditProfile.setEventListeners();

const editProfileSubmit = () => {
  const newInfoValue = {
    name: inputName.value,
    about: inputProfession.value
  }

  popupEditProfile.saveButtonLoad(saveLoaded);

  api.editUserInfo(newInfoValue.name, newInfoValue.about)
    .then(newInfoValue => {
      userProfile.setUserInfo(newInfoValue);
      popupEditProfile.close();
    })
    .catch(error => api.errorHandler(error));
}


const toggleEditPopup = () => {
  const currentUserInfo = userProfile.getUserInfo();

  inputName.value = currentUserInfo.name;
  inputProfession.value = currentUserInfo.info;

  popupEditProfile.saveButtonLoad(saveWaitingClick);
  formProfileValidator.disabledButton();

  popupEditProfile.open();
}

editButton.addEventListener('click', toggleEditPopup);

const popupNewPlace = document.querySelector(".popup_new-place");
const addButton = document.querySelector(".profile__add-button");


/*const section = new Section({
  data: initialCards,
  renderer: (item) => {
    newCardCreater(item);
  }
},
  '.elements');

section.renderItems();
*/

const newPlace = document.querySelector('.popup__place');
const newLink = document.querySelector('.popup__link');

const popupAddNewPlace = new PopupWithForm({
  popupSelector: popupNewPlace,
  submitFormHandler: newCardCreaterApi
});

const newCardCreaterApi = () => {
  const cardObj = {
    name: newPlace.value,
    link: newLink.value,
  }

  popupAddNewPlace.saveButtonLoad(saveLoaded);

  api.addNewCard(cardObj.link, cardObj.name)
    .then(item => {
      newCardCreater(item);
      popupAddNewPlace.close();
    })
    .catch(error => api.errorHandler(error));
}

const deleteCardPopup = document.querySelector('.popup_del-card');

const popupWithSubmiting = new PopupWithSubmit({
  popupSelector: deleteCardPopup,
  submitHandler: deleteSubmit
});

popupWithSubmiting.setEventListeners();

const deleteSubmit = (event, card) => {
  event.preventDefault();

  api.deleteCard(card.getCardId())
    .then(() => {
      card.deleteHandler();
      popupWithSubmiting.close();
    })
    .catch(error => api.errorHandler(error))
}

const ownUserId = 'e20537ed11237f86bbb20ccb';

const newCardCreater = item => {
  {const card = new Card({
    data: item,
    handleCardClick: () => {
      popupWithImage.open(item.link, item.name);
    },
    cardDel:() => {
      popupWithSubmiting.open(card);
    },
    cardLikes: () => {
      const cardId = item._id;
      const toggleLikes = card.likeFromUser() ? api.deleteLike(cardId) : api.addLike(cardId);

      toggleLikes.then(item => {
        card.getCountLike(item.likes);
      })
      .catch(error => api.errorHandler(error))
    },
    userId: ownUserId
  },
    '.card');
  section.addItem(card.getElement(), renderTurn);
 }
}

popupAddNewPlace.setEventListeners();

const toggleAddPopup = () => {
  formsSelectors.formNewPlaceSelector.reset();
  popupAddNewPlace.saveButtonLoad(saveWaitingClick);
  formNewPlaceValidator.disabledButton();
  popupAddNewPlace.open();
}

addButton.addEventListener('click', toggleAddPopup);

const formNewPlaceValidator = new FormValidator(formsSelectors.formNewPlaceSelector, validationConfig);
formNewPlaceValidator.enableValidation()

const avatarFormUpdate = document.querySelector('.popup__avatar-form');
const popupAvatar = document.querySelector('.popup_avatar');
const avatarUrl = document.querySelector('.popup__avatar-link');

const avatarPopupValidator = new FormValidator(formsSelectors.formAvatarSelector, validationConfig);
avatarPopupValidator.enableValidation();

const newAvatar = new PopupWithForm({
  popupSelector: popupAvatar,
  submitFormHandler: avatarUpdate
});

const avatarUpdate = () => {
  const newAvatarUrl = avatarUrl.value;
  newAvatar.saveButtonLoad(saveLoaded);

  api.updateAvatar(newAvatarUrl)
    .then(userData => {
      profileAvatar.src = userData.avatar;
      newAvatar.close();
    })
    .catch(error => api.errorHandler(error))
}

const toggleEditAvatar = () => {
  avatarFormUpdate.reset();
  newAvatar.saveButtonLoad(saveWaitingClick);
  avatarPopupValidator.disabledButton();  
  newAvatar.open();
}

const updateAvatar = document.querySelector('.profile__avatar-edit');
updateAvatar.addEventListener('click', toggleEditAvatar);


Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])    
.then(values => {
  const [userData, initialCards] = values;
  userProfile.setUserInfo(userData);

  section = new Section(
    {
      data: initialCards,
      renderer: newCardCreater
    },
    '.elements');
    section.renderItems();

    renderTurn = false;
})
.catch(error => {
  api.errorHandler(error);
})
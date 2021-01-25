import './index.css';
import { Card } from '../scripts/Card.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { Section } from '../scripts/Section.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Api } from '../scripts/Api.js';
import { PopupConfirm } from '../scripts/PopupConfirm.js';
import {
  conf,
  editButtonProfile,
  editPopupProfile,
  editFormProfile,
  titleInput,
  subtitleInput,
  addButtonCard,
  addPopupCard,
  addFormCard,
  newPlaceInputCard,
  newLinkInputCard,
  viewerPopup,
  actualProfileTitle,
  actualProfileSubtitle,
  actualAvatar,
  deletePopup,
  actualUserId,
  avatarPopup,
  updateAvatarButton,
  avatarForm,
  avatarUrlInput,
  waitPic,
  submitPic,
} from '../scripts/utils.js';


let section = {};
let renderTurn = true;

// Api

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '534a01fb-4115-4a8d-993b-e26c3c7e9d82',
    'Content-Type': 'application/json'
  }
});


const userInfoData = new UserInfo({
  titleElement: actualProfileTitle,
  subtitleElement: actualProfileSubtitle,
  avatarElement: actualAvatar
});

const imagePopupZoom = new PopupWithImage(viewerPopup);

const handleProfileEditSubmit = () => {
  const updatedInfo = {
    name: titleInput.value,
    about: subtitleInput.value
  }

  newEditPopup.renderLoading(waitPic);

  api.updateUserData(updatedInfo.name, updatedInfo.about)
    .then(updatedInfo => {
      userInfoData.setUserInfo(updatedInfo);
      newEditPopup.close();
    })
    .catch(err => api.handleError(err));
}

const newEditPopup = new PopupWithForm({
  popupElement: editPopupProfile,
  submitHandler: handleProfileEditSubmit
});

const toggleEditPopup = () => {
  const actualUserInfo = userInfoData.getUserInfo();

  titleInput.value = actualUserInfo.name;
  subtitleInput.value = actualUserInfo.about;

  newEditPopup.renderLoading(submitPic);
  editPopupValidator.resetAllErrors();
  
  newEditPopup.open();
}

const handleCardAddSubmit = () => {
  const cardObj = {
    name: newPlaceInputCard.value,
    link: newLinkInputCard.value,
  }

  newAddPopup.renderLoading(waitPic);

  api.sendNewCard(cardObj.link, cardObj.name)
    .then(item => {
      cardRenderer(item);
      newAddPopup.close();
    })
    .catch(err => api.handleError(err));
}


const newAddPopup = new PopupWithForm({
  popupElement: addPopupCard,
  submitHandler: handleCardAddSubmit
});


const toggleAddPopup = () => {
  addFormCard.reset();
  newAddPopup.renderLoading(submitPic);
  addPopupValidator.resetAllErrors();
  newAddPopup.open();
}


const handleDeleteConfirmation = (evt, cardElement) => {
  evt.preventDefault();

  api.deleteCard(cardElement.getCardId())
    .then(() => {
      cardElement.deleteCard();
      newDeletePopup.close();
    })
    .catch(err => api.handleError(err))
}

const handleAvatarUpdate = () => {
  const newAvatarUrl = avatarUrlInput.value;
  newAvatarPopup.renderLoading(waitPic);
  api.updateAvatar(newAvatarUrl)
    .then(userData => {
      actualAvatar.src = userData.avatar;
      newAvatarPopup.close();
    })
    .catch(err => api.handleError(err))
}

const newAvatarPopup = new PopupWithForm({
  popupElement: avatarPopup,
  submitHandler: handleAvatarUpdate
});


const toggleEditAvatarPopup = () => {
  avatarForm.reset();
  newAvatarPopup.renderLoading(submitPic);
  avatarPopupValidator.resetAllErrors();  
  newAvatarPopup.open();
}

const newDeletePopup = new PopupConfirm({
  popupElement: deletePopup,
  submitHandler: handleDeleteConfirmation
});

function cardRenderer(item) {
  {
    const card = new Card({
      cardData: item,
      handleCardClick: () => {
        imagePopupZoom.open(item.link, item.name);
      },
      handleCardDelete: () => {
        newDeletePopup.open(card);
      },
      handleCardLike: () => {
        const cardId = item._id;
        const toggleLike = card.likedByUser() ? api.removeLike(cardId) : api.setLike(cardId);

        toggleLike.then(item => {
          card.updateLikeCount(item.likes);
        })
        .catch(err => api.handleError(err))
      },
      userId: actualUserId
    },
    '.card');

    section.addItem(card.generateCard(), renderTurn);
  }
}

// listeners

editButtonProfile.addEventListener('click', toggleEditPopup);
addButtonCard.addEventListener('click', toggleAddPopup);
updateAvatarButton.addEventListener('click', toggleEditAvatarPopup);

// modal window
newEditPopup.setEventListeners();
newAddPopup.setEventListeners();
imagePopupZoom.setEventListeners();
newDeletePopup.setEventListeners();
newAvatarPopup.setEventListeners();

// Validation

const editPopupValidator = new FormValidator(conf, editFormProfile);
editPopupValidator.enableValidation();

const addPopupValidator = new FormValidator(conf, addFormCard);
addPopupValidator.enableValidation();

const avatarPopupValidator = new FormValidator(conf, avatarForm);
avatarPopupValidator.enableValidation();

Promise.all([
  api.getUserData(),
  api.getInitialCardsList()
])    
.then(values => {
  const [userData, initialCards] = values;
  userInfoData.setUserInfo(userData);

  section = new Section(
    {
      items: initialCards,
      renderer: cardRenderer
    },
    '.elements');
    section.renderItems();
    renderTurn = false;
})
.catch(err => {
  api.handleError(err);
})
const conf = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  errorClass: 'popup__form-error_active',
  inputErrorClass: 'popup__input_state_error'
};
const editButtonProfile = document.querySelector('.profile__edit-button');
const editPopupProfile = document.querySelector('.popup_profile');
const editFormProfile = editPopupProfile.querySelector('form[name="edit-profile"]');
const titleInput = editPopupProfile.querySelector('input[name="title"]');
const subtitleInput = editPopupProfile.querySelector('input[name="subtitle"]');
const addButtonCard = document.querySelector('.profile__add-button');
const addPopupCard = document.querySelector('.popup_new-place');
const addFormCard = addPopupCard.querySelector('form[name="add-place"]');
const newPlaceInputCard = addPopupCard.querySelector('input[name="placeName"]');
const newLinkInputCard = addPopupCard.querySelector('input[name="placeLink"]');
const viewerPopup = document.querySelector('.popup_image');
const popupPhoto = viewerPopup.querySelector('.popup__picture');
const updateAvatarButton = document.querySelector('.profile__avatar-button');
const avatarPopup = document.querySelector('.popup_avatar');
const avatarForm = document.querySelector('form[name="update-avatar"]');
const avatarUrlInput = document.querySelector('input[name="avatarLink"]');
const deletePopup = document.querySelector('.popup_del-card');
const actualProfileTitle = document.querySelector('.profile__name');
const actualProfileSubtitle = document.querySelector('.profile__profession');
const actualAvatar = document.querySelector('.profile__avatar');
const actualUserId = '00be17c9136dba8124e035ee';
const waitPic = 'Сохранение...';
const submitPic = 'Сохранить';

export {
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
  popupPhoto,
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
  submitPic
}
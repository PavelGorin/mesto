const popupProfile = document.querySelector('.popup__profile');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popupName = document.querySelector('.popup__name');
const popupProfession = document.querySelector('.popup__profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

function openPopup(block) {
  block.classList.add('popup__opened');
  block.classList.remove('popup');
}

function openPopupProfile() {
  openPopup(popupProfile);
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
}

editButton.addEventListener('click', openPopupProfile);

function closePopup(block) {
  block.classList.add('popup');
  block.classList.remove('popup__opened');
}

function closePopupProfile() {
  closePopup(popupProfile);
} 

closeButton.addEventListener('click', closePopupProfile);

const editProfileFormSubmitHandler = document.querySelector('.popup__container');

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;
  closePopup(popupProfile);
}

editProfileFormSubmitHandler.addEventListener('submit', formSubmitHandler);

// Code for popups new Place

const popupNewPlace = document.querySelector('.popup__new-place');
const popupPlace = document.querySelector('.popup__place');
const popupLink = popupNewPlace.querySelector('.popup__link');
const addButton = document.querySelector('.profile__add-button');
const closeButtonNewPlace = popupNewPlace.querySelector('.popup__close-button_newplace');

function openPopupNewPlace() {
  openPopup(popupNewPlace);
  popupPlace.value = '';
  popupLink.value = '';
}

addButton.addEventListener('click', openPopupNewPlace);

function closePopupNewPlace() {
  closePopup(popupNewPlace);
}

closeButtonNewPlace.addEventListener('click', closePopupNewPlace);


// Code for add new card below

const elList = document.querySelector('.elements');
const addButtonNewPlace = document.querySelector('.popup__container_new-place');
const card = document.querySelector('.card');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  } 
];  

const renderInitialCards = () => { // create start page function
  const items = initialCards.map(el => createCard(el));
  elList.append(... items );
};

const removeCard = evt => {  // card remover function
    evt.target.closest('.element').remove();
}

const imagePopup = document.querySelector('.popup__image');
const imagePicture = imagePopup.querySelector('.popup__picture');
const imageName = imagePopup.querySelector('.popup__picture-name');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button_image');

const createCard = data => {  // Create new card function
  const newCards = card.content.cloneNode(true);
  const popupImage = newCards.querySelector('.element__picture');
  const trashBin = newCards.querySelector('.element__trash-bin');
  const elementName = newCards.querySelector('.element__name');
  const elementImage = newCards.querySelector('.element__image');
  elementName.textContent = data.name;
  elementImage.src = data.link;
  elementImage.alt = data.name;

  newCards.querySelector('.element__like').addEventListener('click', function (evt) { // like dislike function
   evt.target.classList.toggle('element__like_active');
  });


  popupImage.addEventListener('click', openPopupImage);
  trashBin.addEventListener('click', removeCard);

  return newCards;
};

function openPopupImage(card) {  // Open popup image
  openPopup(imagePopup);
  imagePicture.src = card.target.src;
  imageName.textContent = card.target.alt;
}


function closePopupImage() {  // close popup image
  closePopup(imagePopup);
}

imagePopupCloseButton.addEventListener('click', closePopupImage);


function submitAddCardForm(evt) { // function for create new card
    evt.preventDefault();
    const newcard = createCard({
      name: popupPlace.value,
      link: popupLink.value
    }); 
    closePopupNewPlace();
    elList.prepend(newcard);
}

addButtonNewPlace.addEventListener('submit', submitAddCardForm);
  
renderInitialCards();
submitAddCardForm();
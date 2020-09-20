const popupProfile = document.querySelector('.popup__profile');
const editButton = document.querySelector('.profile__edit-button');
const closeEditUserProfileButton = document.querySelector('.popup__close-button_profile');
const inputName = document.querySelector('.popup__name');
const inputProfession = document.querySelector('.popup__profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

function openPopup(block) {
  block.classList.add('popup__opened');
  block.classList.remove('popup'); // Без этой строчки функция не работает.Tак задуманно переключение классов.
}

function openPopupProfile() {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

editButton.addEventListener('click', openPopupProfile);

function closePopup(block) {
  block.classList.add('popup');
}

function closePopupProfile() {
  closePopup(popupProfile);
} 

closeEditUserProfileButton.addEventListener('click', closePopupProfile);

const editProfileFormSubmit = document.querySelector('.popup__container');

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupProfile);
}

editProfileFormSubmit.addEventListener('submit', formSubmitHandler);

// Code for popups new Place

const popupNewPlace = document.querySelector('.popup__new-place');
const inputCardPlace = document.querySelector('.popup__place');
const inputCardLink = popupNewPlace.querySelector('.popup__link');
const addButton = document.querySelector('.profile__add-button');
const closeButtonNewPlace = popupNewPlace.querySelector('.popup__close-button_newplace');

function openPopupNewPlace() {
  openPopup(popupNewPlace);
  inputCardPlace.value = '';
  inputCardLink.value = '';
}

addButton.addEventListener('click', openPopupNewPlace);

function closePopupNewPlace() {
  closePopup(popupNewPlace);
}

closeButtonNewPlace.addEventListener('click', closePopupNewPlace);


// Code for add new card below

const cardsList = document.querySelector('.elements');
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

const imagePopup = document.querySelector('.popup__image');
const imagePicture = imagePopup.querySelector('.popup__picture');
const imageName = imagePopup.querySelector('.popup__picture-name');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button_image');

const createCard = data => {  // Create new card function
  const newCard = card.content.cloneNode(true);
  const popupImage = newCard.querySelector('.element__picture');
  const trashBin = newCard.querySelector('.element__trash-bin');
  const elementName = newCard.querySelector('.element__name');
  const elementImage = newCard.querySelector('.element__image');
  elementName.textContent = data.name;
  elementImage.src = data.link;
  elementImage.alt = data.name;

  newCard.querySelector('.element__like').addEventListener('click', function (evt) { // like dislike function
   evt.target.classList.toggle('element__like_active');
  });


  popupImage.addEventListener('click', openPopupImage);
  trashBin.addEventListener('click', removeCard);

  return newCard;
};

const renderInitialCards = () => { // create start page function
  const items = initialCards.map(el => createCard(el));
  cardsList.append(... items );
};

const removeCard = evt => {  // card remover function
    evt.target.closest('.element').remove();
}



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
      name: inputCardPlace.value,
      link: inputCardLink.value
    }); 
    closePopupNewPlace();
    cardsList.prepend(newcard);
}

addButtonNewPlace.addEventListener('submit', submitAddCardForm);
  
renderInitialCards();
  
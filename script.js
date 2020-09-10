let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-button');
let popupName = popup.querySelector('.popup__name');
let popupProfession = popup.querySelector('.popup__profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

function openPopup() {
  popup.style.visibility = 'visible';
  popup.style.opacity = '1';
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
}

editButton.addEventListener('click', openPopup);

function closePopup() {
  popup.style.visibility = 'hidden';
  popup.style.opacity = '0';
}

closeButton.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__container');

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

// Code for popups new Place

const popupNewPlace = document.querySelector('.popup__new-place');
const popupPlace = document.querySelector('.popup__place');
const popupLink = popupNewPlace.querySelector('.popup__link');
const addButton = document.querySelector('.profile__add-button');
const closeButtonNewPlace = popupNewPlace.querySelector('.popup__close_new');

function openPopupNewPlace() {
  popupNewPlace.style.visibility = 'visible';
  popupNewPlace.style.opacity = '1';
  popupPlace.value = 'Название';
  popupLink.value = 'Ссылка на картинку';
}
addButton.addEventListener('click', openPopupNewPlace);

function closePopupNewPlace() {
  popupNewPlace.style.visibility = 'hidden';
  popupNewPlace.style.opacity = '0';
}

closeButtonNewPlace.addEventListener('click', closePopupNewPlace);


// Code for add new card below

const elList = document.querySelector('.elements');
const addButtonNewPlace = document.querySelector('.popup__newplace-form');
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

const renderList = () => { // create start page function
  const items = initialCards.map(el => getItem(el));
  elList.append(... items );
};

const cardRemover = evt => {  // card remover function
    evt.target.closest('.element').remove();
}

const imagepopup = document.querySelector('.image');
const imagepicture = imagepopup.querySelector('.image__picture');
const imagename = imagepopup.querySelector('.image__name');
const imagepopupclosebutton = imagepopup.querySelector('.image__close-button');

const   getItem = data => {  // Create new card function
  const newcards = card.content.cloneNode(true);
  const popupimage = newcards.querySelector('.element__picture');
  const trashbin = newcards.querySelector('.element__trash-bin');
  newcards.querySelector('.element__name').innerText = data.name;
  newcards.querySelector('.element__image').src = data.link;
  newcards.querySelector('.element__image').alt = data.name;

  newcards.querySelector('.element__like').addEventListener('click', function (evt) { // like dislike function
   evt.target.classList.toggle('element__like_active');
  });

  function openPopupImage() {  // Open popup image
      imagepopup.style.visibility = 'visible';
    imagepopup.style.opacity = '1';
    imagepicture.src = data.link;
    imagename.innerText = data.name;
  }

  function closePopupImage() {  // close popup image
    imagepopup.style.visibility = 'hidden';
    imagepopup.style.opacity = '0';
  }

  imagepopupclosebutton.addEventListener('click', closePopupImage);
  trashbin.addEventListener('click', cardRemover);
  popupimage.addEventListener('click', openPopupImage);
  
  return newcards;
};


const  addNewPlace = () => {  // add new card from user
  addButtonNewPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newcard = getItem({
      name: popupPlace.value,
      link: popupLink.value
    });
    
    closePopupNewPlace();
    elList.prepend(newcard);
    
  })
}; 
  
renderList();
addNewPlace();
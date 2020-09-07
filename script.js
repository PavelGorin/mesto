let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-button');
let popupName = popup.querySelector('.popup__name');
let popupProfession = popup.querySelector('.popup__profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');


function openPopup() {
  popup.style.display = 'flex';
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
}

editButton.addEventListener('click', openPopup);

function closePopup() {
  popup.style.display = 'none';
}

closeButton.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__container');

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;
  popup.style.display = 'none';
}

formElement.addEventListener('submit', formSubmitHandler);



// Code for popups new Place

let popupNewPlace = document.querySelector('.popup__new-place');
let popupPlace = document.querySelector('.popup__place');
let popupLink = popupNewPlace.querySelector('.popup__link');
let addButton = document.querySelector('.profile__add-button');
let closeButtonNewPlace = popupNewPlace.querySelector('.popup__close_new');

function openPopupNewPlace() {
  popupNewPlace.style.display = 'flex';
  popupPlace.value = 'Название';
  popupLink.value = 'Ссылка на картинку';
}
addButton.addEventListener('click', openPopupNewPlace);

function closePopupNewPlace() {
  popupNewPlace.style.display = 'none';
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

const renderList = () => {
  const items = initialCards.map(el => getItem(el));
  elList.append(... items );
};

const cardRemover = evt => {
    evt.target.closest('.element').remove();
}

const   getItem = data => {
  const newcards = card.content.cloneNode(true);
  const trashbin = newcards.querySelector('.element__trash-bin');
  newcards.querySelector('.element__name').innerText = data.name;
  newcards.querySelector('.element__image').src = data.link;
  newcards.querySelector('.element__image').alt = data.name;

  newcards.querySelector('.element__like').addEventListener('click', function (evt) {
   evt.target.classList.toggle('element__like_active');
  });
  
  trashbin.addEventListener('click', cardRemover);

  return newcards;
};


const  addNewPlace = () => {
  addButtonNewPlace.addEventListener('submit', () => {
    const newcard = getItem({
      name: popupPlace.value,
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    });
    console.log(neewcard);
    elList.prepend(newcard);
  })
};
  
renderList();
addNewPlace();
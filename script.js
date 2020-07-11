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

let formElement = document.querySelector('.popup__save-button'); 

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupName.value ;
    profileProfession.textContent = popupProfession.value ;
    popup.style.display = 'none';
}

formElement.addEventListener('click', formSubmitHandler);
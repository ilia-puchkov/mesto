// Объявления

// Import
import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// Общие функции
const buttonsForClose = document.querySelectorAll('.popup__close-button');
const formsConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputError: '.form__input-error',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
};

// Объявления для Profile
const popUpProfile = document.querySelector('.popup_type_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const formProfile = document.forms.userProfileEditForm;
const nameInput = document.querySelector('.form__input_el_name');
const occupationInput = document.querySelector('.form__input_el_occupation');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const profileFormValidator = new FormValidator(formsConfig, popUpProfile);
profileFormValidator.enableValidation();

// Объявления для карт elements
const cardsContainer = document.querySelector('.elements__grid');
const cardTemplate = '.element__template';
const fullImagePopUp = document.querySelector('.popup_type_full-image');
const imageForFullImagePopUp = document.querySelector('.popup__image');
const signatureForFullImagePopUp = document.querySelector('.popup__signature');
const formInputWithPlaceName = document.querySelector('.form__input_el_place');
const formInputWithPlaceLink = document.querySelector('.form__input_el_place-link');

// Объявление элементов Add new Card
const popUpNewCardForm = document.querySelector('.popup_type_add-card');
const placeAddPopUpButton = document.querySelector('.profile__add-button');
const formPlace = document.forms.addNewPlaceForm;
const cardSubmitButton = document.querySelector('.form__save-button_card');
const inputList = Array.from(document.querySelectorAll(".form__input"));
const cardFromValidator = new FormValidator(formsConfig, popUpNewCardForm);
cardFromValidator.enableValidation();

// Функции
// Открытие popUp (базовая)
function openPopUp(popUp) {
  popUp.classList.add('popup_opened');  
  popUp.addEventListener('click', handleClosePopUpByOverlay);
  document.addEventListener('keydown', handleCloseWithEsc);
}

// Закрытие popUp (базовая)
function closePopUp(popUp) {
  popUp.classList.remove('popup_opened');  
  popUp.removeEventListener('click', handleClosePopUpByOverlay);
  document.removeEventListener('keydown', handleCloseWithEsc);
}

// Закрытие при клике по popUp
function handleClosePopUpByOverlay(evt) {
  closePopUp(evt.target);
}

// Закрытие при Esc
function handleCloseWithEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopUp = document.querySelector('.popup_opened')
    closePopUp(openedPopUp);
  }
}

// Открытие popUp Profile
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;

  openPopUp(popUpProfile);

  profileFormValidator.handleErrorStyleDeletion();
});

// Отправка Submit Profile
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;

  closePopUp(popUpProfile);
};

 // Открытие Add new card
placeAddPopUpButton.addEventListener('click', () => {
  openPopUp(popUpNewCardForm);

  formPlace.reset();

  cardFromValidator.handleErrorStyleDeletion();
});

// Добавление new card
function createNewCard(newCardData) {
  const card = new Card(newCardData, cardTemplate);
  const cardElement = card.generateCard();

  return cardElement;
}

// Размещение new card
function placeNewCard(newCardData) {
  cardsContainer.prepend(createNewCard(newCardData));
}

// New Card Submit
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  placeNewCard({name: formInputWithPlaceName.value, link: formInputWithPlaceLink.value})

  closePopUp(popUpNewCardForm);
}

// Обработка Full Image
function fullImage(evt){
  openPopUp(fullImagePopUp);

  const imageSource = evt.target;
  
  imageForFullImagePopUp.src = imageSource.src;
  imageForFullImagePopUp.alt = imageSource.alt;
  signatureForFullImagePopUp.textContent = imageSource.alt;
}

// Закрытие popUp
function handleClosePopUpByClick(evt) {
  evt.preventDefault();
  
  const parentPopUp = evt.target.closest('.popup');
  closePopUp(parentPopUp);
};
/*
// Удаление карточки
function handleDeleteCardByClick (evt) {
  evt.preventDefault();

  const parentBlock = evt.target.closest('.element');
  parentBlock.remove();
}

// Установка Like
function handleLikeByClick (evt) {
  evt.target.classList.toggle('element__like-active');
}
*/
// Обработчики
buttonsForClose.forEach((buttonItem) => buttonItem.addEventListener('click', handleClosePopUpByClick));

initialCards.forEach(placeNewCard);

formPlace.addEventListener('submit', handleNewCardFormSubmit);

formProfile.addEventListener('submit', handleProfileFormSubmit);
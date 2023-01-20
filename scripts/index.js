// Объявления
// Import
import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

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
const img = document.querySelector('.popup_type_full-image');

// Объявления для карт elements
const cardsContainer = document.querySelector('.elements__grid');
const cardTemplate = '.element__template';
const formInputWithPlaceName = document.querySelector('.form__input_el_place');
const formInputWithPlaceLink = document.querySelector('.form__input_el_place-link');

// Объявление элементов Add new Card
const popUpNewCardForm = document.querySelector('.popup_type_add-card');
const placeAddPopUpButton = document.querySelector('.profile__add-button');
const formPlace = document.forms.addNewPlaceForm;



// Валидация формы добавления карточки
const cardFromValidator = new FormValidator(formsConfig, popUpNewCardForm);
cardFromValidator.enableValidation();

// Валидация формы изменения профиля
const profileFormValidator = new FormValidator(formsConfig, popUpProfile);
profileFormValidator.enableValidation();

//=====================================================
// Создание новой карточки
function createNewCard(newCardData) {
  const card = new Card(newCardData, cardTemplate, handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

const placeNewCard = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createNewCard(item);
    placeNewCard.addItem(cardElement);
  }
  },  cardsContainer
);

placeNewCard.renderElement();

// Обработка открытия большого изображения
const popupWithCardImage = new PopupWithImage(img);
popupWithCardImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithCardImage.open(name, link);
}


const userInfo = new UserInfo(profileName, profileOccupation);




/*
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

// Закрытие popUp
function handleClosePopUpByClick(evt) {
  evt.preventDefault();
  
  const parentPopUp = evt.target.closest('.popup');
  closePopUp(parentPopUp);
};

// Обработчики
buttonsForClose.forEach((buttonItem) => buttonItem.addEventListener('click', handleClosePopUpByClick));

initialCards.forEach(placeNewCard);

formPlace.addEventListener('submit', handleNewCardFormSubmit);

formProfile.addEventListener('submit', handleProfileFormSubmit);
*/
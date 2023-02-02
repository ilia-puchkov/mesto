// Общие функции
export const formsConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputError: '.form__input-error',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
};

// Объявления для Profile
export const popUpProfile = document.querySelector('.popup_type_edit-profile');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const nameInput = document.querySelector('.form__input_el_name');
export const occupationInput = document.querySelector('.form__input_el_occupation');
export const profileName = document.querySelector('.profile__name');
export const profileOccupation = document.querySelector('.profile__occupation');
export const fullImage = document.querySelector('.popup_type_full-image');
export const profileAvatar = document.querySelector('.profile__avatar');
export const popupAvatarChange = document.querySelector('.popup_type_avatar-change');
export const profileAvatarEditButton = document.querySelector('.profile__avatar-edit');

// Объявления для карт elements
export const cardsContainer = document.querySelector('.elements__grid');
export const cardTemplate = '.element__template';

// Объявление элементов Add new Card
export const popUpNewCardForm = document.querySelector('.popup_type_add-card');
export const placeAddPopUpButton = document.querySelector('.profile__add-button');
export const popupWithCardConfirmation = document.querySelector('.popup_type_delete-confirmation');
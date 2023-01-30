// Объявления
//import './pages/index.css';

// Import
import { initialCards } from "./utils/initialCards.js";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import {
  formsConfig,
  popUpProfile,
  profileEditButton,
  nameInput,
  occupationInput,
  profileName,
  profileOccupation,
  fullImage,
  cardsContainer,
  cardTemplate,
  popUpNewCardForm,
  placeAddPopUpButton
} from './utils/utils.js';

//=====================================================
// Валидация формы добавления карточки
const cardFromValidator = new FormValidator(formsConfig, popUpNewCardForm);
cardFromValidator.enableValidation();

// Валидация формы изменения профиля
const profileFormValidator = new FormValidator(formsConfig, popUpProfile);
profileFormValidator.enableValidation();

//=====================================================
// popUp для редактирования профиля
const userInfo = new UserInfo({
  name: profileName, 
  occupation: profileOccupation});

const handleProfileValue = () => {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  occupationInput.value = profileInfo.occupation;
};

const popUpEditProfile = new PopupWithForm({
  popUp: popUpProfile,
  handleSubmitForm: (inputValues) => {
    userInfo.setUserInfo(inputValues);
    popUpEditProfile.close();
  }
});

profileEditButton.addEventListener('click', () => {
  handleProfileValue();
  popUpEditProfile.open();
  profileFormValidator.handleErrorStyleDeletion();
});

popUpEditProfile.setEventListeners();

//=====================================================
// popUp для добавления карточек
const popUpAddCard = new PopupWithForm({
  popUp: popUpNewCardForm,
  handleSubmitForm: (inputValues) => {
    placeNewCard.addItem(createNewCard(inputValues));
    popUpAddCard.close();
  }
});

placeAddPopUpButton.addEventListener('click', () => {
  popUpAddCard.open();
  cardFromValidator.handleErrorStyleDeletion();
});

popUpAddCard.setEventListeners();

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

//=====================================================
// Обработка открытия большого изображения
const popupWithCardImage = new PopupWithImage(fullImage);
popupWithCardImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithCardImage.open(name, link);
};
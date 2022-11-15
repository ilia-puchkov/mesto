// Объявления
// Общие функции
const buttonsForDelete = document.querySelectorAll('.element__delete');
const buttonsForClose = document.querySelectorAll('.popup__close-button');

// Объявления для Profile
const popUpProfile = document.querySelector('.popup_type_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const formProfile = document.forms.userProfileEditForm;
const nameInput = document.querySelector('.form__input_el_name');
const occupationInput = document.querySelector('.form__input_el_occupation');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

// Объявления для карт elements
const cardsContainer = document.querySelector('.elements__grid');
const cardTemplate = document.querySelector('.element__template').content;
const fullImagePopUp = document.querySelector('.popup_type_full-image');
const imageForFullImagePopUp = document.querySelector('.popup__image');
const signatureForFullImagePopUp = document.querySelector('.popup__signature');
const formInputWithPlaceName = document.querySelector('.form__input_el_place');
const formInputWithPlaceLink = document.querySelector('.form__input_el_place-link');

// Объявление элементов Add new Card
const popUpNewCardForm = document.querySelector('.popup_type_add-card');
const placeAddPopUpButton = document.querySelector('.profile__add-button');
const formPlace = document.forms.addNewPlaceForm;

// Функции
// Открытие popUp (базовая)
function openPopUp(popUp) {
  popUp.classList.add('popup_opened');
}

// Закрытие popUp (базовая)
function closePopUp(popUp) {
  popUp.classList.remove('popup_opened');
}

// Открытие popUp Profile
profileEditButton.addEventListener('click', () => {
  openPopUp(popUpProfile);

  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
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
});

// Добавление new card
function createNewCard(newCardData) {
  const newCard = cardTemplate.cloneNode(true);

  newCard.querySelector('.element__name').textContent = newCardData.name;
  newCard.querySelector('.element__image').src = newCardData.link;
  newCard.querySelector('.element__image').alt = newCardData.name;

  newCard.querySelector('.element__like').addEventListener('click', handleLikeByClick);

  newCard.querySelector('.element__image').addEventListener('click', fullImage);

  newCard.querySelector('.element__delete').addEventListener('click', handleDeleteCardByClick);

  return newCard;
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

// Обработчики
buttonsForClose.forEach((buttonItem) => buttonItem.addEventListener('click', handleClosePopUpByClick));

buttonsForDelete.forEach((buttonItem) => buttonItem.addEventListener('click', handleDeleteCardByClick));

initialCards.forEach(placeNewCard);

formPlace.addEventListener('submit', handleNewCardFormSubmit);

formProfile.addEventListener('submit', handleProfileFormSubmit);
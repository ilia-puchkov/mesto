// Общие функции
const deleteButtons = document.querySelectorAll('.element__delete');
const closeButtons = document.querySelectorAll('.popup__close-button');

// Открытие popUp
function openPopUp (popUp) {
  popUp.classList.add('popup_opened');
}
// Закрытие popUp
 function closePopUp(evt) {
  evt.preventDefault();
  const trgt = evt.target;
  const parentBlock = trgt.closest('.popup');
  parentBlock.classList.remove('popup_opened');
};
closeButtons.forEach((buttonItem) => buttonItem.addEventListener('click', closePopUp));

// Удаление карточки
function deleteCard (evt) {
  evt.preventDefault();
  const trgt = evt.target;
  const parentBlock = trgt.closest('.element');
  parentBlock.remove();
}
deleteButtons.forEach((buttonItem) => buttonItem.addEventListener('click', deleteCard));

// Like
function like (evt) {
  evt.target.classList.toggle('element__like-active');
}

// Обработка Profile Edit Form
// Объявления для Profile
const popUpProfile = document.querySelector('.popup_type_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const formProfile = document.forms.userProfileEditForm;
const nameInput = document.querySelector('.form__input_el_name');
const occupationInput = document.querySelector('.form__input_el_occupation');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

// Открытие popUp Profile
profileEditButton.addEventListener('click', () => {
openPopUp(popUpProfile);
nameInput.value = profileName.textContent;
occupationInput.value = profileOccupation.textContent;
});

// Отправка Submit Profile
function formSubmitHandler (evt) {
  
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;
  closePopUp(evt);
};
formProfile.addEventListener('submit', formSubmitHandler);

// Обработка Add Initial Cards
// Объявления для карт elements
const elementsList = document.querySelector('.elements__grid');
const elementTemplate = document.querySelector('.element__template').content;
const fullImagePopUp = document.querySelector('.popup_type_full-image');
const popUpFullImage = document.querySelector('.popup__image');
const popUpSignature = document.querySelector('.popup__signature');
const placeInput = document.querySelector('.form__input_el_place');
const placeLink = document.querySelector('.form__input_el_place-link');
// Данные Initial Cards
const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Готэм-Сити',
    link: 'https://comicsmangavideosymas.files.wordpress.com/2016/07/fd87e-lego2bdc2bcomics2bsuper2bheroes2bjustice2bleague2bgotham2bcity2bbreakout2b252820162529_00_00_30_00000.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Шир',
    link: 'https://i10.fotocdn.net/s118/38e7808d1885cb45/public_pin_l/2691305296.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Роковая Гора',
    link: 'https://phonoteka.org/uploads/posts/2021-07/1625626603_20-phonoteka-org-p-mordor-art-krasivo-21.jpg'
  }
];
// Добавление Initial Cards
initialCards.forEach (function (item) {
  const elementItem = elementTemplate.cloneNode(true);

  elementItem.querySelector('.element__name').textContent = item.name;
  elementItem.querySelector('.element__image').src = item.link;
  elementItem.querySelector('.element__image').alt = item.name;

  elementItem.querySelector('.element__like').addEventListener('click', like);

  elementItem.querySelector('.element__image').addEventListener('click', fullImage);

  elementItem.querySelector('.element__delete').addEventListener('click', deleteCard);

  elementsList.append(elementItem);
});

// Обработка Add new Card
// Объявление элементов Add new Card
const popUpCard = document.querySelector('.popup_type_add-card');
const placeAddPopUpButton = document.querySelector('.profile__add-button');
const formPlace = document.forms.addNewPlaceForm;

 // Открытие Add new card
placeAddPopUpButton.addEventListener('click', () => {
  openPopUp(popUpCard);
  placeInput.value = '';
  placeLink.value = '';
});

// Добавление new card
function addCard(evt) {
  evt.preventDefault();
  const elementItem = elementTemplate.cloneNode(true);

  elementItem.querySelector('.element__name').textContent = placeInput.value;
  elementItem.querySelector('.element__image').src = placeLink.value;
  elementItem.querySelector('.element__image').alt = placeInput.value;

  elementItem.querySelector('.element__like').addEventListener('click', like);

  elementItem.querySelector('.element__image').addEventListener('click', fullImage);

  elementItem.querySelector('.element__delete').addEventListener('click', deleteCard);

  elementsList.prepend(elementItem);

  closePopUp(evt);
}
formPlace.addEventListener('submit', addCard);

// Обработка Full Image
// PopUp full Image
function fullImage(evt){
  openPopUp(fullImagePopUp);
  const imageSource = evt.target;
  popUpFullImage.src = imageSource.src; 
  popUpSignature.textContent = imageSource.alt;
}
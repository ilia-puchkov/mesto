// Объявления для карт Elements
const elementsList = document.querySelector('.elements__grid');
const elementTemplate = document.querySelector('.element__template').content;
const fullImagePopUp = document.querySelector('.popup_type_full-image');
const popUpFullImage = document.querySelector('.popup__image');
const popUpSignature = document.querySelector('.popup__signature');

// PopUp full Image
function fullImage(evt){
  fullImagePopUp.classList.add('popup_opened'); // Открыли popUp

  const imageSource = evt.target;
  popUpFullImage.src = imageSource.src; // Добавили изображение

  //const nameSource = imageSource.closest('.element__name');
  //popUpSignature.value = nameSource.textContent;
}

// Данные первоначальных карт
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

// Добавление первоначальных карт
initialCards.forEach (function (item) {
  const elementItem = elementTemplate.cloneNode(true);

  elementItem.querySelector('.element__name').textContent = item.name;
  elementItem.querySelector('.element__image').src = item.link;

  elementItem.querySelector('.element__like').addEventListener('click', like);

  elementItem.querySelector('.element__image').addEventListener('click', fullImage);

  elementsList.append(elementItem);
});

// Объявление элементов popUp
const popUp = document.querySelector('.popup');
const popUpProfile = document.querySelector('.popup_type_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const closePopUpButtons = document.querySelectorAll('.popup__close-button');

const popUpCard = document.querySelector('.popup_type_add-card');
const placeAddPopUpButton = document.querySelector('.profile__add-button');

// Обьявление элементов Form
const formProfile = document.forms.userProfileEditForm;
const formPlace = document.forms.addNewPlaceForm;
const nameInput = document.querySelector('.form__input_el_name');
const occupationInput = document.querySelector('.form__input_el_occupation');

// Обьявление элементов User profile
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

// Объявление для удаления карточки
const deleteButtons = document.querySelectorAll('.element__delete');

// Открытие popUp Profile
function showPopUpProfile() {
  popUpProfile.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
};

profileEditButton.addEventListener('click', showPopUpProfile);

// Открытие popUp Card
function showPopUpCard() {
  popUpCard.classList.add('popup_opened');
  placeInput.value = '';
  placeLink.value = '';
};

placeAddPopUpButton.addEventListener('click', showPopUpCard);

// закрытие popUp
closePopUpButtons.forEach((buttonItem) => buttonItem.addEventListener('click', function(evt) {
  evt.preventDefault();
  const trgt = evt.target;
  const parentBlock = trgt.closest('.popup');
  parentBlock.classList.remove('popup_opened');
}));

// закрытие popUp
closePopUpButtons.forEach((buttonItem) => buttonItem.addEventListener('click', function(evt) {
  evt.preventDefault();
  const trgt = evt.target;
  const parentBlock = trgt.closest('.popup');
  parentBlock.classList.remove('popup_opened');
}));

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

// Отправка Submit Profile
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;
  
  const trgt = evt.target;
  const parentBlock = trgt.closest('.popup');
  parentBlock.classList.remove('popup_opened');
};

formProfile.addEventListener('submit', formSubmitHandler);

// Объявление для формы добавления карточек
const placeInput = document.querySelector('.form__input_el_place');
const placeLink = document.querySelector('.form__input_el_place-link');

// Отправка Submit Card
function addCard(evt) {
  evt.preventDefault();
  const elementItem = elementTemplate.cloneNode(true);

  elementItem.querySelector('.element__name').textContent = placeInput.value;
  elementItem.querySelector('.element__image').src = placeLink.value;

  elementItem.querySelector('.element__like').addEventListener('click', like);

  elementItem.querySelector('.element__image').addEventListener('click', fullImage);

  elementItem.querySelector('.element__delete').addEventListener('click', deleteCard);

  elementsList.prepend(elementItem);

  const trgt = evt.target;
  const parentBlock = trgt.closest('.popup');
  parentBlock.classList.remove('popup_opened');
}

formPlace.addEventListener('submit', addCard);
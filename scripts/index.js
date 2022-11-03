// Объявление элементов popUp
let popUp = document.querySelector('.popup');
let profileEditButton = document.querySelector('.profile__edit-button');
let closePopUpButton = document.querySelector('.popup__close-button');

// Обьявление элементов Form
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input_el_name');
let occupationInput = document.querySelector('.form__input_el_occupation');

// Обьявление элементов User profile
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');

// Открытие ПопАп
function showPopUp() {
  popUp.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
}

profileEditButton.addEventListener('click', showPopUp);

// закрытие ПопАп
function closePopUp() {
  if (popUp.classList.contains('popup_opened') === true) {
    popUp.classList.remove('popup_opened');
  }
}

closePopUpButton.addEventListener('click', closePopUp);

// Отправка Submit
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;
  closePopUp();
}

formElement.addEventListener('submit', formSubmitHandler); 
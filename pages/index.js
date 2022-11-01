// Объявление элементов popUp
let popUp = document.querySelector('.popup');
let changeNameButton = document.querySelector('.profile__edit-button');
let closePopUpButton = document.querySelector('.popup__close-button');

// Обьявление элементов Form
let formElement = document.querySelector('.form');
let nameInput = document.getElementById('name-input');
let jobInput = document.getElementById('occupation-input');

// Обьявление элементов User profile
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');

// Открытие ПопАп
function showPopUp() {
  popUp.classList.add('popup_opened');
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileOccupation.innerHTML;
}

changeNameButton.addEventListener('click', showPopUp);

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
  profileOccupation.textContent = jobInput.value;
  closePopUp();
}

formElement.addEventListener('submit', formSubmitHandler); 
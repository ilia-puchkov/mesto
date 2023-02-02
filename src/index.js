// Объявления
// импорт для вебпак
//import './pages/index.css';

// Import
// import { initialCards } from "./utils/initialCards.js";
import { Api } from './components/Api.js';
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithConfirmation } from "./components/PopupWithCoinfirmation.js";
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { Section } from './components/Section.js';
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
  placeAddPopUpButton,
  profileAvatar,
  popupAvatarChange,
  profileAvatarEditButton,
  popupWithCardConfirmation
} from './utils/utils.js';

//=====================================================
// Класс для запросов
const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: 'a4314974-bcc2-444b-805d-7948fe80c06f',
    'content-type': 'application/json'
  },
});

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;

    cardList.renderItems(cardData, userData._id);
  })
  .catch((err) =>{
    console.log(err);
  });

//=====================================================
// Валидация форм
// Валидация формы добавления карточки
const cardFromValidator = new FormValidator(formsConfig, popUpNewCardForm);
cardFromValidator.enableValidation();

// Валидация формы изменения профиля
const profileFormValidator = new FormValidator(formsConfig, popUpProfile);
profileFormValidator.enableValidation();
/*
// Валидация формы изменения аватара
const avatarFormValidator = new FormValidator(formsConfig, popupAvatarChange);
avatarFormValidator.enableValidation();
*/
//=====================================================
// Обработка открытия большого изображения
const popupWithCardImage = new PopupWithImage(fullImage);
popupWithCardImage.setEventListeners();

//=====================================================
// Подтверждение удаления карточки
const popupWithConfirmation = new PopupWithConfirmation(popupWithCardConfirmation);
popupWithConfirmation.setEventListeners();

//=====================================================
// Работа с карточкой
// Создание карточки
function createCard(item, userId) {
  const card = new Card({
    data: item,
    ownerId: userId,
    handleCardClick: (name, link) => {
     popupWithCardImage.open(name, link);
    },
    handleLikeClick: () => {
      if(card.isLiked()) {
        api.removeLike(card.getId())
          .then((res) => {
            card.removeLike(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.addLike(card.getId())
          .then((res) => {
            card.addLike(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } 
    },
    handleDeleteCard: () => {
      popupWithConfirmation.open();
      popupWithConfirmation.handleCardDelete(() => {
        api.deleteCard(card.getId())
          .then(() => {
            card.deleteCard();
            popupWithConfirmation.close();
          })
          .catch((err) => {
            console.log(err);
          });
      })
    }
  },
  cardTemplate
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// Размещение карточки
const cardList = new Section({
  renderer: (item, userId) => {
    const cardElement = createCard(item, userId);
    cardList.addItem(cardElement);
  }
},
  cardsContainer
);
//=====================================================
// Форма добавления карточек
const popupAddNewCard = new PopupWithForm({
  popUp: popUpNewCardForm, 
  handleSubmitForm: (cardData) => {
    //popupAddNewCard.renderLoading('Сохранение ...');
    api.addCard(cardData)
      .then((cardInfo) => {
        cardList.addItem(createCard(cardInfo, userId));
        popupAddNewCard.close();
      })
     .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //popupAddNewCard.renderLoading('Создать');
      })
  }
});

placeAddPopUpButton.addEventListener('click', () => {
  popupAddNewCard.open();
  cardFromValidator.handleErrorStyleDeletion();
});

popupAddNewCard.setEventListeners();
//=====================================================
// Форма для редактирования профиля
const userInfo = new UserInfo({
  name: profileName, 
  occupation: profileOccupation,
  avatar: profileAvatar
});

const popUpEditProfile = new PopupWithForm({
  popUp: popUpProfile,
  handleSubmitForm: (userData) => {
    //popUpEditProfile.renderLoading('Сохранение ...')
    api.updateUserInfo(userData)
      .then((res) => {
        userInfo.setUserInfo(res);
        popUpEditProfile.close();
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(() => {
      //  popUpEditProfile.renderLoading('Создать');
      });
  }
});

profileEditButton.addEventListener('click', () => {
  popUpEditProfile.open();
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  occupationInput.value = profileInfo.occupation;
  profileAvatar.src = profileInfo.avatar;
  profileFormValidator.handleErrorStyleDeletion();
})

popUpEditProfile.setEventListeners();

// Обновление аватара
const popupChangeAvatar = new PopupWithForm({
  popUp: popupAvatarChange,
  handleSubmitForm: () => {
    //popupChangeAvatar.renderLoading('Сохранение ...');
    api.updateUserAvatar(avatarInfo)
      .then((res) => {
        userInfo.updateAvatar(res);
        popupChangeAvatar.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
       // popupChangeAvatar.renderLoading('Создать');
      });
  }
})

popupChangeAvatar.setEventListeners();

profileAvatarEditButton.addEventListener('click', () => {
  popupChangeAvatar.open();
});
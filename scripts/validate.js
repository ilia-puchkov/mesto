// Добавление выделения в случае ошибке 
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_visible');
};

//Удаление выделения в случае ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_visible');
  errorElement.textContent = '';
};

// Проверка валидности input (возврат t/f)
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// проверка валидности, применение выделений
const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
};

// Деактивация кнопки Submit
const disableSubmitButton = (buttonElement) => {
  buttonElement.classList.add('form__save-button_inactive');
  buttonElement.disabled = true;
}

// Активация кнопки Submit
const enableSubmitButton = (buttonElement) => {
  buttonElement.classList.remove('form__save-button_inactive');
  buttonElement.disabled = false;
}

// Переключения состояния кнопки Submit
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement);
  } else {
    enableSubmitButton(buttonElement);
  }
};

// Деактивация кнопки при создании новой карточки
const setSubmitButtonState = (isFormValid, buttonElement) => {
  if (isFormValid === true) {
    enableSubmitButton(buttonElement);
  } else {
    disableSubmitButton(buttonElement);
  }
}

// Установка для Input
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__save-button');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// 
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

      setEventListeners(formElement);
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
});

const handleErrorStyleDeletion = () => {
  const errors = Array.from(document.querySelectorAll('.form__input-error'));
  errors.forEach((element) => {
    element.classList.remove('form__input-error_visible');
  });

  const inputs = Array.from(document.querySelectorAll('.form__input'));
  inputs.forEach((element) => {
    element.classList.remove('form__input_type_error');
  });
};
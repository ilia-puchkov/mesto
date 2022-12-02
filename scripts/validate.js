// Добавление выделения в случае ошибке 
const showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_visible');
};

//Удаление выделения в случае ошибки
const hideInputError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_visible');
  errorElement.textContent = '';
};

// Проверка валидности input (возврат t/f)
const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  })
};

// проверка валидности, применение выделений
const checkInputValidity = (formSelector, inputSelector) => {
  if (inputSelector.validity.valid) {
    hideInputError(formSelector, inputSelector);
  } else {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  }
};

// Деактивация кнопки Submit
const disableSubmitButton = (submitButtonSelector) => {
  submitButtonSelector.classList.add('form__save-button_inactive');
  submitButtonSelector.disabled = true;
}

// Активация кнопки Submit
const enableSubmitButton = (submitButtonSelector) => {
  submitButtonSelector.classList.remove('form__save-button_inactive');
  submitButtonSelector.disabled = false;
}

// Переключения состояния кнопки Submit
const toggleButtonState = (inputList, submitButtonSelector) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(submitButtonSelector);
  } else {
    enableSubmitButton(submitButtonSelector);
  }
};

// Деактивация кнопки при создании новой карточки
const setSubmitButtonState = (isFormValid, submitButtonSelector) => {
  if (isFormValid === true) {
    enableSubmitButton(submitButtonSelector);
  } else {
    disableSubmitButton(submitButtonSelector);
  }
}

// Очистка статусов
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

// Установка для Input
const setEventListeners = (formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll('.form__input'));
  const submitButtonSelector = formSelector.querySelector('.form__save-button');

  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      checkInputValidity(formSelector, inputSelector);
      toggleButtonState(inputList, submitButtonSelector);
    });
  });
};

// Назначение валидации
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

      setEventListeners(formSelector);
  });
};

// Валидация
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
});
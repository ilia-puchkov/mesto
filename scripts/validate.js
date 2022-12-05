const formsConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputError: '.form__input-error',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
};

// Добавление выделения в случае ошибке 
const showInputError = (formElement, inputElement, errorMessage, formsConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formsConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formsConfig.errorClass);
};

//Удаление выделения в случае ошибки
const hideInputError = (formElement, inputElement, formsConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formsConfig.inputErrorClass);
  errorElement.classList.remove(formsConfig.errorClass);
  errorElement.textContent = '';
};

// Проверка валидности input (возврат t/f)
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// проверка валидности, применение выделений
const checkInputValidity = (formElement, inputElement, formsConfig) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, formsConfig);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, formsConfig);
  }
};

// Деактивация кнопки Submit
const disableSubmitButton = (buttonElement, formsConfig) => {
  buttonElement.classList.add(formsConfig.inactiveButtonClass);
  buttonElement.disabled = true;
}

// Активация кнопки Submit
const enableSubmitButton = (buttonElement, formsConfig) => {
  buttonElement.classList.remove(formsConfig.inactiveButtonClass);
  buttonElement.disabled = false;
}

// Переключения состояния кнопки Submit
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, formsConfig);
  } else {
    enableSubmitButton(buttonElement, formsConfig);
  }
};

// Деактивация кнопки при создании новой карточки
const setSubmitButtonState = (isFormValid, buttonElement, formsConfig) => {
  if (isFormValid === true) {
    enableSubmitButton(buttonElement, formsConfig);
  } else {
    disableSubmitButton(buttonElement, formsConfig);
  }
};

// Очистка статусов
const handleErrorStyleDeletion = (formsConfig) => {
  const errors = Array.from(document.querySelectorAll(formsConfig.inputError));
  errors.forEach((element) => {
    element.classList.remove(formsConfig.errorClass);
  });

  const inputs = Array.from(document.querySelectorAll(formsConfig.inputSelector));
  inputs.forEach((element) => {
    element.classList.remove(formsConfig.inputErrorClass);
  });
};

// Установка для Input
const setEventListeners = (formElement, formsConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(formsConfig.inputSelector));
  const buttonElement = formElement.querySelector(formsConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, formsConfig);
      toggleButtonState(inputList, buttonElement, formsConfig);
    });
  });
};

// Назначение валидации
const enableValidation = (formsConfig) => {
  const formList = Array.from(document.querySelectorAll(formsConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

      setEventListeners(formElement, formsConfig);
  });
};

// Валидация
enableValidation(formsConfig);
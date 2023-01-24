class FormValidator {
  constructor(formsConfig, formElement) {
    // Объекты конфигурации
    this._formSelector = formsConfig.formSelector;
    this._inputSelector = formsConfig.inputSelector;
    this._submitButtonSelector = formsConfig.submitButtonSelector;
    this._inactiveButtonClass = formsConfig.inactiveButtonClass;
    this._inputError = formsConfig.inputError;
    this._inputErrorClass = formsConfig.inputErrorClass;
    this._errorClass = formsConfig.errorClass;

    // Форма и ее элементы
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

// Добавление выделения в случае ошибке 
_showInputError = (input) => {
  const errorElement = this._formElement.querySelector(`.${input.id}-error`);
  input.classList.add(this._inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(this._errorClass);
};

//Удаление выделения в случае ошибки
_hideInputError = (input) => {
  const errorElement = this._formElement.querySelector(`.${input.id}-error`);
  input.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
};

// Проверка валидности input (возврат t/f)
_hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  })
};

// проверка валидности, применение выделений
_checkInputValidity = (input) => {
  if (input.validity.valid) {
    this._hideInputError(input);
  } else {
    this._showInputError(input);
  }
};

// Деактивация кнопки Submit
_disableSubmitButton = () => {
  this._buttonElement.classList.add(this._inactiveButtonClass);
  this._buttonElement.disabled = true;
}

// Активация кнопки Submit
_enableSubmitButton = () => {
  this._buttonElement.classList.remove(this._inactiveButtonClass);
  this._buttonElement.disabled = false;
}

// Переключения состояния кнопки Submit
_toggleButtonState = () => {
  if (this._hasInvalidInput(this._inputList)) {
    this._disableSubmitButton();
  } else {
    this._enableSubmitButton();
  }
};

// Очистка статусов (public)
handleErrorStyleDeletion() {
  this._inputList.forEach((input) => {
    this._checkInputValidity(input);
    this._hideInputError(input);
  });

  this._toggleButtonState();
};

// Установка для Input
_setEventListeners = () => {
  this._inputList.forEach((input) => {
    input.addEventListener('input', () => {
      this._checkInputValidity(input);
      this._toggleButtonState();
    });
  });
};

// Назначение валидации (public)
enableValidation = () => {
  this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  };
};

// Экспорт
export {FormValidator};
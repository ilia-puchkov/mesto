class UserInfo {
  // Конструктор
  constructor({name, occupation}) {
    this._name = name;
    this._occupation = occupation;
  }

  // Получение данных
  getUserInfo() {
    this._userInfo = {
      name: this._name.textContent,
      occupation: this._occupation.textContent
    }

    return this._userInfo;
  }

  // Установка данных
  setUserInfo({name, occupation}) {
    this._name.textContent = name;
    this._occupation.textContent = occupation;
  }
}

export {UserInfo};
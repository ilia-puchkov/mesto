class UserInfo {
  // Конструктор
  constructor({name, occupation, avatar}) {
    this._name = name;
    this._occupation = occupation;
    this._avatar = avatar;
  }

  // Получение данных
  getUserInfo() {
    this._userInfo = {
      name: this._name.textContent,
      occupation: this._occupation.textContent,
      avatar: this._avatar.src,
      id: this._id
    }

    return this._userInfo;
  }

  // Установка данных
  setUserInfo({name, occupation, avatar}) {
    this._name.textContent = name;
    this._occupation.textContent = occupation;
    this.updateAvatar(avatar);
  }

  updateAvatar(avatar) {
    this._avatar.src = avatar;
  }
}

export {UserInfo};
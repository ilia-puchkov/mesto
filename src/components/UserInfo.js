class UserInfo {
  // Конструктор
  constructor(name, occupation, avatar) {
    this._name = name;
    this._occupation = occupation;
    this._avatar = avatar;
  }

  // Получение данных
  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      occupation: this._occupation.textContent,
      avatar: this._avatar.src,
      id: this._id
    }

    return userData;
  }

  // Установка данных
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._occupation.textContent = data.about;
    this.updateAvatar(data);
    this._id = data._id;
  }

  updateAvatar(data) {
    this._avatar.src = data.avatar;
  }
}

export {UserInfo};
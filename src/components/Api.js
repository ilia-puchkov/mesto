class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  //Проверка
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`У нас ошибка ${res.status}`);
  }

  //Данные пользователя
  getUserInfo() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  //Обновление данных пользователя
  updateUserInfo(userData) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.occupation
      })
    })
    .then(this._checkResponse);
  }

  //Обновление аватара пользователя
  updateUserAvatar(avatar) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
    .then(this._checkResponse);
  }

  //Начальные карточки
  getInitialCards(){
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  //Добавление карточки
  addCard(cardData) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(this._checkResponse);
  }

  //Удаление карточки
  deleteCard(cardId) {
    return fetch(this._url + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  //Like карточки
  addLike(cardId) {
    return fetch(this._url + `/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  //Убрать like карточки
  removeLike(cardId) {
    return fetch(this._url + `/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }
}

export {Api};
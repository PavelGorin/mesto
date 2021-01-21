class UserInfo {
  constructor({profileName, profileProfession, profileAvatar}){
    this._profileName = profileName;
    this._profileProfession = profileProfession;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      info: this._profileProfession.textContent,
      avatar: this._profileAvatar.src
    }
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileProfession.textContent = data.info;
    this._profileAvatar.src = data.avatar;
  }
}

export default UserInfo;
class UserInfo {
  constructor(profileName, profileProfession){
    this._profileName = profileName;
    this._profileProfession = profileProfession;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      info: this._profileProfession.textContent
    }
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileProfession.textContent = data.info;
  }
}

export default UserInfo;
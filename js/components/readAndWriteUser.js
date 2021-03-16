export default class readAndWriteUser {
  async saveUser(username, password) {
    await JSON._save(username, password);
  }

  async loadUser(username) {
    fetch("/json/" + username + ".json")
      .then(response => response.json())
      .then(user => console.log("Users password was: " + user.password));
  }
}
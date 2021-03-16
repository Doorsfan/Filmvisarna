export default class readAndWriteUser {
  async saveUser(username, password) {
    await JSON._save("./users/" + username, password);
  }

  async loadUser(username) {
    /*
    fetch("/json/users/" + username + ".json")
      .then(response => response.json())
      .then(user => {
        this.example = user.password;
      }); */
    this.user = await JSON._load("/users/" + username + ".json");
    if (!this.user) {
      await this.loadUser(username);
    }
    return this.user;
  }
}
import readAndWriteUser from '../components/readAndWriteUser.js';
export default class LoginPage {
  constructor() {
    const readAndWriteComponent = new readAndWriteUser();
    $("main").on("click", ".loginPage.log_in_button", (data) => {
      if ($(".loginPage.emailInput").val().length > 0 && $(".loginPage.passwordInput").val().length > 0) {
        let user = readAndWriteComponent.loadUser($('.loginPage.emailInput').val(),
          $('.loginPage.passwordInput').val());
        user.then((userObject) => {
          try {
            //Managed to find a user, logic to implement sessionStorage goes here
            console.log("Managed to log in with: " + userObject.user + " with pw of: " + userObject.pw);
            this.setLoggedInUser(userObject.user, userObject.pw); //Replace this
            window.location.href = ''; //Go back to default startPage on login
          }
          catch (error) {
            console.log("No such user - Put in graphics to telegraph this?");
            console.log("The error was: " + error);
          }
        });
      }
    });
  }

  setLoggedInUser(username, password) {
    this.loggedInUsername = username;
    this.loggedInUserPassword = password;
  }

  getLoggedInUsername() {
    return this.loggedInUsername;
  }

  getLoggedInUserPassword() {
    return this.loggedInUserPassword;
  }

  render() {
    return /*html*/ `
      <div class="loginPage holderBox">
       <div class="loginPage borderBox">
        <div class="loginPage formContainer">
          <img class="loginPage myImage" src="/images/movie_posters/relic.jpg">
          <input class="loginPage emailInput" type="text" placeholder="E-postadress" name="email" required>
          <div class="loginPage firstSeperator"></div>
          <input class="loginPage passwordInput" type="password" placeholder="Lösenord" name="password" required>
          <div class="loginPage secondSeperator"></div>
          <button class="loginPage log_in_button" type="submit">Logga in</button>
          <div class="loginPage ellerText">ELLER</div>
          <button class="loginPage cancel_button">Avbryt</button>
          <a class="loginPage newAccountLink" href="#registerPage">Registrera Nytt Konto</a>
        </div>
       </div>
      </div>
     `;
  }
}

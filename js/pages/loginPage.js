import readAndWriteUser from '../components/readAndWriteUser.js';
export default class LoginPage {
  constructor() {
    this.validate = new readAndWriteUser();
    this.eventHandler();
  }
  eventHandler() {
    $('main').on('submit', '.loginPage.inputForm', () => {
      event.preventDefault();
      let myValue = '';
      myValue = this.validate.loadUser(
        $('.loginPage.emailInput').val(),
        $('.loginPage.passwordInput').val()
      );
      {
        myValue.then((loggedIn) => {
          if (loggedIn) {
            window.location.href = '#startPage';
          } else {
            window.location.href = '#loginPage';
          }
        });
      }
    });
  }
 
  render() {
    return /*html*/ `
      <form class="loginPage inputForm">
       <div class="loginPage borderBox">
        <div class="loginPage formContainer">
          <img class="loginPage myImage" src="/images/movie_posters/relic.jpg">
          <input class="loginPage emailInput" type="email" placeholder="E-postadress" name="email" required>
          <div class="loginPage firstSeperator"></div>
          <input class="loginPage passwordInput" type="password" placeholder="Lösenord" name="password" required>
          <div class="loginPage secondSeperator"></div>
          <button class="loginPage log_in_button" type="submit" value="submit">Logga in</button>
          <div class="loginPage ellerText">ELLER</div>
          <button class="loginPage cancel_button">Avbryt</button>
          <a class="loginPage newAccountLink" href="#registerPage">Registrera Nytt Konto</a>
        </div>
       </div>
      </form>
     `;
  }
}

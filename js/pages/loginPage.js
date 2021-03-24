import readAndWriteUser from '../components/readAndWriteUser.js';
export default class LoginPage {
  constructor() {
    this.validate = new readAndWriteUser();
    this.eventHandler();
  }

  eventHandler() {
    $('main').on('click', '.loginPage.log_in_button', (data) => {
      if (
        $('.loginPage.emailInput').val().length > 0 &&
        $('.loginPage.passwordInput').val().length > 0
      ) {
        //fix this
        if (
          this.validate.loadUser(
            $('.loginPage.emailInput').val(),
            $('.loginPage.passwordInput').val()
          )
        ) {
          window.location.href = '#startPage';
        } else {
          window.location.href = '#loginPage';
        }
      }
    });
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

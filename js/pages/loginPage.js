import readAndWriteUser from '../components/readAndWriteUser.js';
export default class LoginPage {
  constructor() {
    this.validate = new readAndWriteUser();
    this.addEventHandlerForSubmitForm();
    this.closeModalHandler();
  }
  closeModalHandler() {
    $('main').on('click', '.loginPage.closeSuccessfulLoginModal', (event) => {
      window.location.href = '#startPage';
    });
    $('main').on('click', '.loginPage.closeFailedLoginModal', (event) => {
      $('.loginModal').remove();
    });
  }
  addEventHandlerForSubmitForm() {
    $('main').on('submit', '.loginPage.inputForm', (event) => {
      event.preventDefault();
      let myValue = '';
      myValue = this.validate.loadUser(
        $('.loginPage.emailInput').val(),
        $('.loginPage.passwordInput').val()
      );
      {
        myValue.then((loggedIn) => {
          return false;
        });
      }
    });
  }

  render() {
    return /*html*/ `
      <form class="loginPage inputForm">
       <div class="loginPage borderBox">
        <div class="loginPage formContainer">
          <img class="loginPage myImage" src="/images/login.jpg">
          <input class="loginPage emailInput" type="email" placeholder="E-postadress" name="email" required>
          <div class="loginPage firstSeperator"></div>
          <input class="loginPage passwordInput" type="password" placeholder="Lösenord" name="password" required>
          <div class="loginPage secondSeperator"></div>
          <button class="loginPage log_in_button" type="submit" value="submit">Logga in</button>
          <hr class="seperator"/>
          <a href="#startPage"><button type="button" class="loginPage cancel_button">Avbryt</button></a>
          <a class="loginPage newAccountLink" href="#registerPage">Registrera Nytt Konto</a>
        </div>
       </div>
      </form>
     `;
  }
}

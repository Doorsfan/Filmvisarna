import loginForm from '../components/loginForm.js';
export default class LoginPage {
  constructor() {}
  render() {
    return /*html*/ `
     <form class="loginPage login_form" action="validate_user.js" method="get">
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
          <a class="loginPage newAccountLink" href="#register">Registrera Nytt Konto</a>
        </div>
       </div>
     </form>`;
  }
}
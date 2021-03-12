import loginForm from '../components/loginForm.js';
export default class LoginPage {
  constructor() {}
  render() {
    let html = /*html*/ `
    <form class="loginPage login_form" action="validate_user.js" method="get">
      <div class="loginPage formContainer">
        <div class="loginPage loginTitle">Login</div>
        <label class="loginPage emailLabel" for="email">E-mail</label>
        <input class="loginPage emailInput" type="text" placeholder="Write your E-mail here.." name="email" required>
        <img class="loginPage myImage" src="/images/movie_posters/relic.jpg">
        <input class="loginPage emailInput" type="text" placeholder="E-postadress" name="email" required>
        <div class="loginPage firstSeperator"></div>
        <label class="loginPage passwordLabel" for="password">Password</label>
        <input class="loginPage passwordInput" type="password" placeholder="Write your password here.." name="password" required>
        <input class="loginPage passwordInput" type="password" placeholder="Lösenord" name="password" required>
        <div class="loginPage secondSeperator"></div>
        <button class="loginPage submit_button" type="submit">Login</button>
        <button class="loginPage log_in_button" type="submit">Logga in</button>
        <div class="loginPage ellerText">ELLER</div>
        <button class="loginPage cancel_button">Avbryt</button>
      </div>
    </form>`;
    return html;
  }
}
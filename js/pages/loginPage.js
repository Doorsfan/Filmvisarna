import readAndWriteUser from '../components/readAndWriteUser.js';
export default class LoginPage {
  constructor() {
    const readAndWriteComponent = new readAndWriteUser();
    $("main").on("click", ".loginPage.log_in_button", function () {
      if ($(".loginPage.emailInput").val().length > 0 && $(".loginPage.passwordInput").val().length > 0) {
        console.log("Should check for login");
        let user = readAndWriteComponent.loadUser($(".loginPage.emailInput").val(), $(".loginPage.passwordInput").val());
        console.log("user was: " + user);
      }
    });
  }

  render() {
    return /*html*/ `
     <form class="loginPage login_form" method="get">
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
     </form>`;
  }
}

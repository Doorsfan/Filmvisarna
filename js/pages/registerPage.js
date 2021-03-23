import readAndWriteUser from "../components/readAndWriteUser.js";
export default class registerPage {
  constructor() {
    const readAndWriteComponent = new readAndWriteUser();
    $("main").on("click", ".registerPage.register_button", function () {
      if ($(".registerPage.emailInput").val().length > 0 && $(".registerPage.passwordInput").val().length > 0 &&
        $(".registerPage.passwordInput").val() === $(".registerPage.secondPasswordInput").val()) {
        readAndWriteComponent.saveUser(
          encodeURI($(".registerPage.emailInput").val()),
          encodeURI($(".registerPage.passwordInput").val()));
        alert("Thank you for registering an account to Filmvisarna!");
      }
    })
    $("main").on("click", ".registerPage.cancel_button", function () {
      window.location.href = '#loginPage';
    })
  }
  render() {
    return /*html*/ ` 
      <div class="registerPage formContainer">
        <h1 class="registerPage registerTitle">Registrera Ny Användare</h1>
        <input class="registerPage emailInput" type="text" placeholder="E-postadress" name="email" required>
        <div class="registerPage firstSeperator"></div>
        <input class="registerPage passwordInput" type="password" placeholder="Lösenord" name="password" required>
        <div class="registerPage secondSeperator"></div>
        <input class="registerPage secondPasswordInput" type="password" placeholder="Skriv lösenord igen" name="secondPassword" required>
        <div class="registerPage thirdSeperator"></div>
        <button class="registerPage register_button" type="submit">Registrera Mig</button>
        <div class="registerPage ellerText">ELLER</div>
        <button class="registerPage cancel_button">Avbryt</button>
      </div>
    `;
  }
}
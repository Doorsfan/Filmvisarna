export default class registerPage {
  constructor() {}
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
import readAndWriteUser from '../components/readAndWriteUser.js';
export default class registerPage {
  constructor() {
    this.createAccount = new readAndWriteUser();
    this.eventHandler();
    this.addCloseModalHandlers();
  }

  addCloseModalHandlers() {
    $('main').on('click', '.registerPage.closeSuccessfulRegisterModal', (event) => {
      window.location.href = '#loginPage';
    })
    $('main').on('click', '.registerPage.closeFailedRegisterModal', (event) => {
      $('.registerModal').remove();
    })
  }
  eventHandler() {
    $('main').on('submit', '.registerPage.inputForm', (event) => {
      event.preventDefault();
      if (
        $('.registerPage.passwordInput').val() ===
        $('.registerPage.secondPasswordInput').val()
      ) {
        this.createAccount.saveUser(
          $('.registerPage.emailInput').val(),
          $('.registerPage.passwordInput').val()
        );
        $('main').prepend(`<div class="registerPage registerModal">
          <div class="registerPage modal-content">
            <span class="registerPage closeSuccessfulRegisterModal">&times;</span>
            <p>Tack för att du registrerat ett konto hos filmsvisarna!</p>
            <p>Användarnamn: ${$('.registerPage.emailInput').val()}</p>
            <p>Lösenord: ${$('.registerPage.passwordInput').val()}</p>
          </div>
        </div>`);
        //window.location.href = '#loginPage';
      } else {
        $('main').prepend(`<div class="registerPage registerModal">
          <div class="registerPage modal-content">
            <span class="registerPage closeFailedRegisterModal">&times;</span>
            <p>Lösenords fältet och Konfirmera Lösenordsfältet måste stämma överens!</p>
          </div>
        </div>`);
      }
    });
    $('main').on('click', '.cancel_button', function () {
      window.location.href = '#loginPage';
      //window.history.go(-1); - In case of change to go to previous page
    });
  }

  render() {
    return /*html*/ ` 
      <form class="registerPage inputForm">
        <h1 class="registerPage registerTitle">Registrera Ny Användare</h1>
        <input class="registerPage emailInput" type="email" placeholder="E-postadress" name="email" required>
        <div class="registerPage firstSeperator"></div>
        <input class="registerPage passwordInput" type="password" placeholder="Lösenord" name="password" required>
        <div class="registerPage secondSeperator"></div>
        <input class="registerPage secondPasswordInput" type="password" placeholder="Skriv lösenord igen" name="secondPassword" required>
        <div class="registerPage thirdSeperator"></div>
        <button class="registerPage register_button" type="submit">Registrera Mig</button>
        <div class="registerPage ellerText">ELLER</div>
        <button class="registerPage cancel_button">Avbryt</button>
        </div>
      </form>
    `;
  }
}

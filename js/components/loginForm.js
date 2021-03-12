export default class loginForm {
  
  render() {
    return /*html*/ `
    <form class="loginPage login_form" action="validate_user.js" method="get">
      <div class="loginPage formContainer">
        <div class="loginPage loginTitle">Login</div>
        <label class="loginPage emailLabel" for="email">E-mail</label>
        <input class="loginPage emailInput" type="text" placeholder="Write your E-mail here.." name="email" required>
        <div class="loginPage firstSeperator"></div>
        <label class="loginPage passwordLabel" for="password">Password</label>
        <input class="loginPage passwordInput" type="password" placeholder="Write your password here.." name="password" required>
        <div class="loginPage secondSeperator"></div>
        <button class="loginPage submit_button" type="submit">Login</button>
      </div>
    </form>`;
  }
};



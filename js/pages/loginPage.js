import loginForm from '../components/loginForm.js';
export default class LoginPage {
  constructor() {}
  render() {
    return `
    <form action="validate_user.js" method="get">
      <div class="container">
        <label for="email">Username</label>
        <input type="text" placeholder="Write your E-mail here.." name="email" required>
        <div class="separator"></div>
        <label for="password">Password</label>
        <input type="password" placeholder="Write your password here.." name="password" required>
        <div class="separator"></div>
        <button class="submit_button" type="submit">Login</button>
      </div>
    </form>`;
  }
}

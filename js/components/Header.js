import Nav from './Nav.js';

export default class Header {
  render() {
    let header = $(/*html*/ `
  <header>
    <nav>
      <img class="hamburger-icon" src="../images/hamburger_icon.png" alt="home"/>
      <a href="/">Filmvisarna</a>
      <img class="user-icon" src="../images/user.png" alt="home"/>
    </nav>
  </header>`);
    return header;
  }
}

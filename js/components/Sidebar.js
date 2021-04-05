import Header from './Header.js';

export default class Sidebar {
  constructor() {
    this.eventHandler();
  }
  eventHandler() {
    $('body').on('click', '.logout', () => {
      sessionStorage.clear();
      $('header').replaceWith(new Header().render());
    });
  }

  readSessionStorage() {
    this.store = sessionStorage.getItem('username');
  }
  render() {
    this.readSessionStorage();
    let user = this.store;
    let myPage = user //Dubbelt?
      ? `<a href='#userPage'>Mina sidor</a>`
      : `<a href='#loginPage'>Login</a>`;
    let logOut = user
      ? `<li class='navlist-item logout'>
          <a href='#'>Logga ut</a>
         </li>`
      : '';
    let sidebar = $(/*html*/ `
    <div class="sidebar-container">
        <nav>
          <ul class="navlist">
          <li class="navlist-item login">
              ${myPage}
            </li>
            <hr />
            <li class="navlist-item">
              <a href='#startPage'>Start Page</a>
            </li>
            <li class="navlist-item">
              <a href='#MoviePage'>Filmer</a>
            </li>            
            <li class="navlist-item">
              <a href='#bookingPage'>Boka</a>
            </li>
            ${logOut}
          </ul>
        </nav>
      </div>`);

    return sidebar;
  }
}

export default class Sidebar {
  render() {
    let sidebar = $(/*html*/ `
    <div class="sidebar-container">
        <nav>
          <ul class="navlist">
            <li class="navlist-item">
              <a href='#loginPage'>Logga in</a>
            </li>
            <li class="navlist-item">
              <a href='#startPage'>Startsida</a>
            </li>
            <li class="navlist-item">
              <a href='#MoviePage'>Filmer</a>
            </li>            
            <li class="navlist-item">
              <a href='#bookingPage'>Boka</a>
            </li>
          </ul>
        </nav>
      </div>`);

    return sidebar;
  }
}

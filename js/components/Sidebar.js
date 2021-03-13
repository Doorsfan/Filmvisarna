export default class Sidebar {
  render() {
    let sidebar = $(/*html*/ `
    <div class="sidebar-container">
        <nav>
          <ul class="navlist">
            <li class="navlist-item">
              <a href='/login'>Login</a>
            </li>
            <hr />
            <li class="navlist-item">
              <a href='/boka'>Boka</a>
            </li>
            <li class="navlist-item">
              <a href='/nyheter'>Nyheter</a>
            </li>
            <li class="navlist-item">
              <a href='#MoviePage'>Filmer</a>
            </li>
          </ul>
        </nav>
      </div>`);

    return sidebar;
  }
}

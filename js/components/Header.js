import Sidebar from './Sidebar.js';

export default class Header {
  render() {
    let sidebar = new Sidebar();
    let openSidebar = false;

    let listener = function addListener() {
      $(document).off();

      $(document).click(function (event) {
        let $target = $(event.target);

        if (
          (!$target.closest('.sidebar-show').length && openSidebar) ||
          $target.attr('href')
        ) {
          $('.sidebar-container').addClass('sidebar-close');
          $('.sidebar-container').removeClass('sidebar-show');
          openSidebar = !openSidebar;
          event.stopPropagation();
          $(document).off();
        } else if (!$target.closest('.sidebar-show').length) {
          openSidebar = !openSidebar;
          event.stopPropagation();
        }
      });
    };

    function setupListener() {
      $('.sidebar-container').removeClass('sidebar-close');
      $('.sidebar-container').addClass('sidebar-show');
      listener();
    }

    let header = $(/*html*/ `
    <header>
      <nav class="header-nav">
        <img class="hamburger-icon" src="../images/hamburger_icon.png" alt="home" />
        
        <a class="home-button" href="#startPage">Filmvisarna</a>
        <a class="userpage-button" href="#loginPage">
          <img class="user-icon" src="../images/user.png" alt="home"/>
        </a>
      </nav>
    </header>`);
    header.append(sidebar.render());

    $('body').on('click', '.hamburger-icon', setupListener);

    return header;
  }
}

import Sidebar from './Sidebar.js';

export default class Header {
  render() {
    let sidebar = new Sidebar();

    let listener = function addListener() {
      $(document).click(function (event) {
        let $target = $(event.target);

        if (
          !$target.closest('.sidebar-container').length &&
          $('.sidebar-container').is(':visible') &&
          $target[0].className !== 'hamburger-icon'
        ) {
          $('.sidebar-container').addClass('sidebar-close');
          $('.sidebar-container').removeClass('sidebar-show');
        }
      });
    };

    function setupListener(event) {
      $('.sidebar-container').removeClass('sidebar-close');
      $('.sidebar-container').addClass('sidebar-show');
      if ($('.sidebar-container').hasClass('sidebar-show')) {
        listener();
      }
    }

    let header = $(/*html*/ `
    <header>
      <nav class="header-nav">
        <img class="hamburger-icon" src="../images/hamburger_icon.png" alt="home"/>
        
        <a class="home-button" href="#startPage">Filmvisarna</a>
        <img class="user-icon" src="../images/user.png" alt="home"/>
      </nav>
    </header>`);
    header.append(sidebar.render());

    $('body').on('click', '.hamburger-icon', setupListener);

    return header;
  }
}

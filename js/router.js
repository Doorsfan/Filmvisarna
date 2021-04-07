import ChangeListener from './ChangeListener.js';

// Only create ONE change listener for the whole application

// imported pages
import Test from './pages/test.js';
import StartPage from './pages/StartPage.js';
import LoginPage from './pages/LoginPage.js';
import MoviePage from './pages/MoviePage.js';
import AboutPage from './pages/aboutPage.js';
import BookingPage from './pages/BookingPage.js';
import UserPage from './pages/userPage.js';
import TicketPage from './pages/ticketPage.js';
import registerPage from './pages/registerPage.js';
// import PeoplePage from './pages/PeoplePage.js';

// instanciate to reuse instances of pages
const test = new Test();
const startPage = new StartPage();
const loginPage = new LoginPage();
const moviePage = new MoviePage();
const bookingPage = new BookingPage();
const myRegisterPage = new registerPage();

// const peoplePage = new PeoplePage(changeListener);

export default class Router {
  constructor(selector) {
    this.selector = selector;
    // main renders on location hash change
    // register the event listener for that:
    window.onhashchange = () => this.setCurrentPage(selector);
    // but also render it right now, based on the current hash or default page
    this.setCurrentPage(selector);
    this.changeListener = new ChangeListener();
  }

  async setCurrentPage(selector) {
    //localhost:3000/#aboutPage/harry
    let name = window.location.hash.replace('-', '').replace('#', '');
    let movieTitle = name.split('/');
    name = movieTitle[0];
    movieTitle.length >= 2 ? (movieTitle = movieTitle[1]) : (movieTitle = '');

    let result;
    if (!this[name]) {
      name = 'default';
      result = await this[name]();
    } else {
      result = await this[name](movieTitle);
    }
    $(selector).html('');
    $(selector).append(result);
  }

  ////////////////
  // Our pages (the method names matches the hashes with any slashes - removed)

  default() {
    window.location.href = "#startPage";
    return startPage.render();
  }

  loginPage() {
    if (sessionStorage.getItem('username') == null) {
      return loginPage.render();
    } else {
      window.location.href = '#userPage';
    }
  }

  MoviePage() {
    return moviePage.render();
  }

  aboutPage(movieTitle) {
    return new AboutPage(movieTitle).render();
  }

  registerPage() {
    if (sessionStorage.getItem('username') == null) {
      return myRegisterPage.render();
    } else {
      window.location.href = '#userPage';
    }
  }

  bookingPage() {
    return bookingPage.render();
  }

  async userPage() {
    if (sessionStorage.getItem('username')) {
      return new UserPage().render();
    } else {
      return loginPage.render();
    }
  }

  ticketPage() {
    return new TicketPage(this.changeListener).render();
  }
}

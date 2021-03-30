import ChangeListener from './ChangeListener.js';
// Only create ONE change listener for the whole application
const changeListener = new ChangeListener();

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
  constructor(selector, changeListener) {
    this.selector = selector;
    this.changeListener = changeListener;
    // main renders on location hash change
    // register the event listener for that:
    window.onhashchange = () => this.setCurrentPage(selector);
    // but also render it right now, based on the current hash or default page
    this.setCurrentPage(selector);
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
    return startPage.render();
  }

  loginPage() {
    return loginPage.render();
  }

  MoviePage() {
    return moviePage.render();
  }

  aboutPage(movieTitle) {
    return new AboutPage(movieTitle).render();
  }

  registerPage() {
    return myRegisterPage.render();
  }

  bookingPage() {
    return bookingPage.render();
  }

  async userPage() {
    let user = sessionStorage.getItem('store');
    console.log(user);

    if (user) {
      return new UserPage().render();
    } else {
      return loginPage.render();
    }
  }

  ticketPage() {
    return new TicketPage().render();
  }
}

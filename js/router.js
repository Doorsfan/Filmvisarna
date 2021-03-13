import ChangeListener from './ChangeListener.js';
// Only create ONE change listener for the whole application
const changeListener = new ChangeListener();

// imported pages
import StartPage from './pages/StartPage.js';
import LoginPage from './pages/LoginPage.js';
import MoviePage from './pages/MoviePage.js';
import AboutPage from './pages/aboutPage.js';
// import PeoplePage from './pages/PeoplePage.js';

// instanciate to reuse instances of pages
const startPage = new StartPage();
const loginPage = new LoginPage();
const moviePage = new MoviePage();

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
    let name = window.location.hash.replace('-', '').replace('#', '');
    let result;
    if (name.includes('aboutPage')) {
      let movieName = name.substr(9, name.length - 1);
      result = await this.aboutPage(movieName);
    } else if (!this[name]) {
      name = 'default';
      result = await this[name]();
    } else {
      result = await this[name]();
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
}

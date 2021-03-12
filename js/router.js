import ChangeListener from './ChangeListener.js';
// Only create ONE change listener for the whole application
const changeListener = new ChangeListener();

// imported pages
import StartPage from './pages/startPage.js';
import Page1 from './pages/Page1.js';
import Page2 from './pages/Page2.js';
import PeoplePage from './pages/PeoplePage.js';
import loginPage from './pages/loginPage.js';

// instanciate to reuse instances of pages
const startPage = new StartPage();
const page1 = new Page1();
const peoplePage = new PeoplePage(changeListener);
const LoginPage = new loginPage();

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

  setCurrentPage(selector) {
    let name = window.location.hash.replace('-', '').replace('#', '');
    $(selector).html(this[name || 'default']());
  }

  ////////////////
  // Our pages (the method names matches the hashes with any slashes - removed)

  page1() {
    return page1.render();
  }

  page2() {
    // if we want a new instance every time we visit a page we instanciate here instead
    return new Page2().render();
  }

  peoplepage() {
    return peoplePage.render();
  }

  default() {
    return startPage.render();
  }
}

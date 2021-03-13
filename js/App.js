import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Router from './router.js';

export default class App {
  constructor() {
    // render partials

    $('body').prepend(new Header().render());

    // main renders in its router, on instanciation
    this.router = new Router('main');

    $('body').append(new Footer().render());
  }
}

import Header from './components/Header.js';
import Router from './router.js';

export default class App {
  constructor() {
    // render partials

    // header renders now
    $('body').html(new Header().render());

    // main renders in its router, on instanciation
    this.router = new Router('main');
  }
}

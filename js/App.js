import Header from './components/Header.js';
import loginForm from './components/loginForm.js';
import Router from './router.js';

export default class App {
  constructor() {
    // render partials

    // header renders now
    $('body').html(new Header().render());
    $('body').append(new loginForm().render());

    // main renders in its router, on instanciation
    this.router = new Router('main');
  }
}

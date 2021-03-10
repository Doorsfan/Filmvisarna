import ChangeListener from './ChangeListener.js';
import PersonHandler from './PersonHandler.js';

export default class App {

  constructor() {
    // Only create ONE change listener for the whole application
    this.changeListener = new ChangeListener();
    // Send the App instance (this) to the personHandler
    // which lets it reach the changeListener
    this.personHandler = new PersonHandler(this);
  }

}
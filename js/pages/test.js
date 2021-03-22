import readAndWriteUser from '../components/readAndWriteUser.js';

export default class Test {
  constructor() {
    this.read = new readAndWriteUser();
    this.eventH();
  }

  async render() {
    this.username = prompt('userName:');
    this.password = prompt('passWord:');
    await this.read.saveUser(this.username, this.password);

    return $('<div class="hej">HEJ</div>');
  }

  eventH() {
    $('main').on('click', '.hej', () =>
      this.read.validateUser(this.username, this.password)
    );
  }
}

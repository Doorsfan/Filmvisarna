import readAndWriteUser from '../components/readAndWriteUser.js';

export default class Test {
  constructor() {
    this.eventH();
  }

  async read() {
    this.shows = await $.getJSON('json/movieSchedule.json');
  }

  async render(show1) {
    if (!this.show) {
      await this.read();
    }

    // let displayShow = this.shows.find((show) => {
    //   return show.date == date && show.time == time;
    // });

    console.log(show1);

    return $('<div class="hej">HEJ</div>');
  }

  eventH() {}
}

import Test from '../pages/test.js';
export default class DisplaySpecificShow {
  constructor(movieID) {
    this.movieID = movieID;
    this.eventHandler();
    this.read();
    this.fromDate = new Date().toISOString().split('T')[0];
  }

  async read() {
    this.filteredShow = [];
    this.movieSchedule = await $.getJSON('/json/movieSchedule.json');
    this.shows = await $.getJSON('/json/movieSchedule.json');
    await Promise.all(
      this.movieSchedule.map(async (data) => {
        if (
          data.film.toLowerCase().includes(this.movieID) &&
          data.date >= this.fromDate
        ) {
          this.filteredShow.push(await data);
        }
      })
    );
  }

  createSelect() {
    let html = $(/*html*/ `<div class="book-show"></div>`);

    for (let i = 0; i < 3; i++) {
      html.append(/*html*/ `
        <div class="show">
        <div class='aboutPage-text'>${this.filteredShow[i].date}</div>
        <div id="display-saloon">
          <div id="move-saloon">${this.filteredShow[i].auditorium}</div>
          <div id="showtime">Tid: ${this.filteredShow[i].time}</div>
          <a href="#ticketPage"><button class="aboutPage-btn" type="button" value="${[
            this.filteredShow[i].date,
            this.filteredShow[i].time,
          ]}">Boka</button></a>
        </div>
        </div>`);
    }
    return html;
  }

  async render() {
    if (!this.movieSchedule) {
      await this.read();
    }
    return this.createSelect();
  }

  async createSaloonDisplay(event) {
    this.displayShow = this.filteredShow.find(
      (show) => show.date == event.target.value
    );

    $('#display-saloon').html(/*html*/ `
    <p>Salong ${this.displayShow.auditorium}</p>
    <div id="showtime">Tid: ${this.displayShow.time}</div>`);
  }

  eventHandler() {
    $('main').on('change', '#select-date', (event) =>
      this.createSaloonDisplay(event)
    );

    $('main').on('click', '.aboutPage-btn', (event) => {
      let value = event.target.value.split(',', 2);
      let date = value[0];
      let time = value[1];
      sessionStorage.setItem(
        'selectedShow',
        JSON.stringify(this.filterSelectedShow(date, time))
      );
    });
  }

  filterSelectedShow(date, time) {
    let displayShow = this.shows.find((show) => {
      return show.date == date && show.time == time;
    });
    return displayShow;
  }
}

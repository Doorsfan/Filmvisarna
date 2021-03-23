import Test from '../pages/test.js';
export default class DisplaySpecificShow {
  constructor(movieID) {
    this.movieID = movieID;
    this.eventHandler();
    this.read();
    this.test = new Test();
  }

  async read() {
    this.filteredShow = [];
    this.movieSchedule = await $.getJSON('/json/movieSchedule.json');
    this.shows = await $.getJSON('/json/movieSchedule.json');
    await Promise.all(
      this.movieSchedule.map(async (data) => {
        if (data.film.toLowerCase().includes(this.movieID)) {
          this.filteredShow.push(await data);
        }
      })
    );
  }

  createSelect() {
    let html = $(/*html*/ `<div class="book-show"></div>`);
    let select = $(
      /*html*/ `<select class="select" id="select-date"><option disabled selected>Välj datum</option></select>`
    );

    this.filteredShow.forEach((show) => {
      select.append(
        /*html*/ `<option value="${show.date}">${show.date}</option>`
      );
    });

    let text = $(/*html*/ `<div class="aboutPage-text">Boka Biljett</div>`);

    let nextShow = $(/*html*/ `
    <div id="display-saloon">
    <p>Salong:</p>
    <div>Tid:</div>
    </div>
    `);

    let btn = $(
      /*html*/ `<button class="aboutPage-btn" type="button">Boka</button>`
    );
    html.append(text);
    html.append(select);
    html.append(nextShow);
    html.append(btn);

    return html;
  }
  async render() {
    if (!this.movieSchedule) {
      await this.read();
    }
    return this.createSelect();
  }

  async createSaloonDisplay(event) {
    let displayShow = this.filteredShow.find(
      (show) => show.date == event.target.value
    );

    $('#display-saloon').html(/*html*/ `
    <p>Salong ${displayShow.auditorium}</p>
    <div id="showtime">Tid: ${displayShow.time}</div>`);
  }

  eventHandler() {
    $('main').on('change', '#select-date', (event) =>
      this.createSaloonDisplay(event)
    );

    $('main').on('click', '.aboutPage-btn', () => {
      let date = $('#select-date').val();
      let time = $('#showtime').html().replace('Tid: ', '');
      let selectedShow = this.filterSelectedShow(date, time);
      this.test.render(selectedShow);
    });
  }

  filterSelectedShow(date, time) {
    let displayShow = this.shows.find((show) => {
      return show.date == date && show.time == time;
    });
    return displayShow;
  }
}

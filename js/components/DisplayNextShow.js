<<<<<<< Updated upstream
import Test from '../pages/test.js';
export default class DisplaySpecificShow {
  constructor(movieID) {
    this.movieID = movieID;
    this.eventHandler();
    this.read();
    this.fromDate = new Date().toISOString().split('T')[0];
=======
export default class DisplaySpecificShow {
  constructor(movieID) {
    this.movieID = movieID;
    this.eventhandeler();
    this.read();
>>>>>>> Stashed changes
  }

  async read() {
    this.filteredShow = [];
    this.movieSchedule = await $.getJSON('/json/movieSchedule.json');
<<<<<<< Updated upstream
    this.shows = await $.getJSON('/json/movieSchedule.json');
    await Promise.all(
      this.movieSchedule.map(async (data) => {
        if (
          data.film.toLowerCase().includes(this.movieID) &&
          data.date >= this.fromDate
        ) {
=======
    await Promise.all(
      this.movieSchedule.map(async (data) => {
        if (data.film.toLowerCase().includes(this.movieID)) {
>>>>>>> Stashed changes
          this.filteredShow.push(await data);
        }
      })
    );
  }

  createSelect() {
    let html = $(/*html*/ `<div class="book-show"></div>`);
    let select = $(
<<<<<<< Updated upstream
      /*html*/ `<select class="select" id="select-date"></select>`
=======
      /*html*/ `<select class="select" id="select-date"><option disabled selected>Välj datum</option></select>`
>>>>>>> Stashed changes
    );

    this.filteredShow.forEach((show) => {
      select.append(
        /*html*/ `<option value="${show.date}">${show.date}</option>`
      );
    });

<<<<<<< Updated upstream
    let text = $(/*html*/ `<div class="aboutPage-text"><h3>Boka biljett</h3></div>`);

    let nextShow = $(/*html*/ `
    <div id="display-saloon">
    <p>Salong ${this.filteredShow[0].auditorium}</p>
    <div id="showtime">Tid: ${this.filteredShow[0].time}</div>
=======
    let text = $(/*html*/ `<div class="aboutPage-text">Boka Biljett</div>`);

    let nextShow = $(/*html*/ `
    <div id="display-saloon">
    <p>Salong:</p>
    <p>Tid:</p>
>>>>>>> Stashed changes
    </div>
    `);

    let btn = $(
<<<<<<< Updated upstream
      /*html*/ `<a href="#ticketPage"><button class="aboutPage-btn" type="button">Boka</button></a>`
=======
      /*html*/ `<button class="aboutPage-btn" type="button">Boka</button>`
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
      let date = $('#select-date').val();
      let time = $('#showtime').html().replace('Tid: ', '');
      window.selectedShow = this.filterSelectedShow(date, time);
      console.log(window.selectedShow);
    });
  }

  filterSelectedShow(date, time) {
    //this.shows == movieSchedule.json
    let displayShow = this.shows.find((show) => {
      return show.date == date && show.time == time;
    });
    return displayShow;
=======
  async createSaloonDisplay() {
    //make it in jquery
    let e = document.getElementById('select-date');
    let date = e.options[e.selectedIndex].text;

    let time;
    let saloon;
    this.filteredShow.forEach((show) => {
      if (show.date === date) {
        time = show.time;
        saloon = show.auditorium;
        return;
      }
    });
    if (!time || !saloon) {
      $('#display-saloon').html('');
      $('#display-saloon').append(/*html*/ `
      <p>Salong:</p>
        <p>Tid:</p>
      `);
    } else {
      $('#display-saloon').html('');
      $('#display-saloon').append(/*html*/ `
      <p>Salong ${saloon}</p>
        <p>Tid: ${time}</p>
      `);
    }
  }

  eventhandeler() {
    $('main').on('change', '#select-date', () => this.createSaloonDisplay());
>>>>>>> Stashed changes
  }
}

export default class DisplaySpecificShow {
  constructor(movieID) {
    this.movieID = movieID;
    this.eventhandeler();
    this.read();
  }

  async read() {
    this.filteredShow = [];
    this.movieSchedule = await $.getJSON('/json/movieSchedule.json');
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
      /*html*/ `<select id="select-date"><option>Välj datum</option></select>`
    );

    this.filteredShow.forEach((show) => {
      select.append(
        /*html*/ `<option value="${show.date}">${show.date}</option>`
      );
    });

    let text = $(/*html*/ `<h1 class="aboutPage-text">Boka Biljett</h1>`);

    let nextShow = $(/*html*/ `
    <div class="display-saloon">
    <div class="saloon">Salong: ${this.filteredShow[0].auditorium}</div>
    <div class="time">Tid:    ${this.filteredShow[0].time}</div>
    <button class="aboutPage-btn" type="button">Boka</button>
    </div>
    `);

    let btn = $();
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
      <div class="saloon">Salong: </div>
      <div class="time">Tid: </div>
      `);
    } else {
      $('#display-saloon').html('');
      $('#display-saloon').append(/*html*/ `
      <div class="saloon">Salong: ${saloon}</div>
      <div class="time">Tid:    ${time}</div>
      `);
    }
  }

  eventhandeler() {
    $('main').on('change', '#select-date', () => this.createSaloonDisplay());
  }
}

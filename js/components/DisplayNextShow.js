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

    let saloon = $(/*html*/ `
    <div id="display-saloon">
    <p>Tid: _____</p>
    </div>
    `);
    html.append(select);
    html.append(saloon);
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
    this.filteredShow.forEach((show) => {
      if (show.date === date) {
        time = show.time;
        return;
      }
    });

    $('#display-saloon').html('');
    $('#display-saloon').append(/*html*/ `
        <p>Tid: ${time}</p>
      `);
  }

  eventhandeler() {
    $('main').on('change', '#select-date', () => this.createSaloonDisplay());
  }
}

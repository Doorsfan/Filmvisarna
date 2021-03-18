export default class DisplaySpecificShow {
  constructor(movieID) {
    this.movieID = movieID;
    this.eventHandler();
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
      <p>Tid:</p>
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

  async createSaloonDisplay(value) {
    let date = value.target.value;
    let time;
    let saloon;
    this.filteredShow.forEach((show) => {
      if (show.date === date) {
        time = show.time;
        saloon = show.auditorium;
        return;
      }
    });

    $('#display-saloon').html(/*html*/ `
        <p>Salong ${saloon}</p>
        <p>Tid: ${time}</p>
      `);
  }

  eventHandler() {
    $('main').on('change', '#select-date', (event) =>
      this.createSaloonDisplay(event)
    );
  }
}

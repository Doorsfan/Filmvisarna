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
  }
}

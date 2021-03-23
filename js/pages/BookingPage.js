export default class BookingPage  {

  showDate = new Date().toISOString().split('T')[0];

  constructor() {
    // Adding event handler for date input
    let that = this;
    $('body').on('change', '.datePicker', async function () {
      that.showDate = $(this).val();
      $('main').html(await that.render());
    });
  }

  async readShowsFromJson() {
    this.shows = await $.getJSON('json/movieSchedule.json');
    this.movies = await $.getJSON('json/movies.json');
  }

  async render()  {
    let html = `
    <div class = "bookingpage-container">
    <div class = "bookingpage-cover"></div>
    <label class="datePickerLabel">Visningsdatum  <input class="datePicker" type="date" value="${this.showDate}"></label>
    `;
    if (!this.shows) {
      await this.readShowsFromJson();
    }
    let shows = this.shows.filter(show => show.date === this.showDate);
    for (let show of shows) {
      let movie = this.movies.find(movie => movie.title === show.film);
      if (!movie) {
        console.warn('unable to find movie with title', show.film);
        continue;
      }

      html += `
    <div class = "bookingpage-show">
      <img src=${movie.images[0]}>
      <h2>${show.film}</h2>
      <p>${movie.genre.join?movie.genre.join(', '):movie.genre} | ${Math.floor(movie.length/60)} tim ${movie.length%60} min</p>
      <h3>${show.date} | ${show.time} | ${show.auditorium}</h3>
      <button>Boka biljett</button>
      </div>
      `;
    }
    html += '</div>';
    return html;
  }


}
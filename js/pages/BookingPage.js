export default class BookingPage  {

  fromDate = new Date().toISOString().split('T')[0];

  constructor() {
    // Adding event handler for date input
    let that = this;
    $('body').on('change', '.datePicker', async function () {
      that.fromDate = $(this).val();
      $('main').html(await that.render());
    });
  }

  async readShowsFromJson() {
    this.shows = await $.getJSON('json/movieSchedule.json');
    this.movies = await $.getJSON('json/movies.json');
  }

  async render() {
    console.log(this.fromDate);
    let html = `
    <div class = "bookingpage-container">
    <div class = "bookingpage-cover"></div>
    <label class="datePickerLabel">Visningar från och med: <input class="datePicker" type="date" value="${this.fromDate}"></label>
    `;
    if (!this.shows) {
      await this.readShowsFromJson();
    }
    let shows = this.shows.filter(show => show.date >= this.fromDate);
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
export default class BookingPage  {

  async readShowsFromJson() {
    this.shows = await $.getJSON('json/movieSchedule.json');
    this.movies = await $.getJSON('json/movies.json');
  }

  async render() {
    let html = `
    <div class = "bookingpage-container">
    <div class = "bookingpage-cover"></div>
    <h1>Visningar</h1>
    `;
    if (!this.shows) {
      await this.readShowsFromJson();
    }
    for (let show of this.shows) {
      let movie = this.movies.find(movie => movie.title === show.film);
      if (!movie) {
        console.warn('unable to find movie with title', show.film);
        continue;
      }

      html += `
    <div class = "bookingpage-show">
      <img src=${movie.images[0]}>
      <h2>${show.film}</h2>
      <p>${movie.genre} | ${movie.length} minuter</p>
      <h3>${show.time} | ${show.auditorium}</h3>
      <button>Boka biljett</button>
      </div>
      `;
    }
    html += '</div>';
    return html;
  }

  
}
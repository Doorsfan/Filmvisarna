export default class BookingPage  {

  showDate = new Date().toISOString().split('T')[0];

  constructor() {
    // Adding event handler for date input
    let that = this;
    $('body').on('change', '.datePicker', async function () {
      that.showDate = $(this).val();
      $('main').html(await that.render());
    });
    this.eventHandler();
  }

  async readShowsFromJson() {
    this.shows = await $.getJSON('json/movieSchedule.json');
    this.movies = await $.getJSON('json/movies.json');
  }

  async render()  {
    let html = `
    <div class = "bookingpage-container">
    <div class = "bookingpage-cover"></div>
    <label class="datePickerLabel">Visningsdatum: <input class="datePicker" type="date" value="${this.showDate}"></label>
    `;
    if (!this.shows) {
      await this.readShowsFromJson();
    }
    let shows = this.shows.filter(show => show.date === this.showDate);
    for (let show of shows) {
      let movie = this.movies.find((movie) => movie.title === show.film);
      if (!movie) {
        console.warn('unable to find movie with title', show.film);
        continue;
      }
      let purgedName = movie.title.replaceAll(/\s/g, '');
      purgedName = purgedName.replaceAll("'", '');
      html += `
    <div class = "bookingpage-show">
      <img src=${movie.images[0]}>
      <h2>${show.film}</h2>
      <p>${movie.genre.join ? movie.genre.join(', ') : movie.genre} | 
      ${Math.floor(movie.length / 60)} tim ${movie.length % 60} min</p>
      <h3>${show.date} | ${show.time} | ${show.auditorium}</h3>
      <a href="#ticketPage"><button class="bookingpage${purgedName} &${
        show.date
      } ${show.time}& ${show.auditorium} ${
        movie.title
      }">Boka biljett</button></a>
      </div>
      `;
    }
    html += '</div>';
    return html;
  }

  async eventHandler() {
    if (!this.movies) {
      await this.readShowsFromJson();
    }
    this.movies.forEach((movie) => {
      let purgedName = movie.title.replaceAll(/\s/g, '');
      purgedName = purgedName.replaceAll("'", '');
      $('main').on('click', '.bookingpage' + purgedName, (bookTicketButton) => {
        let myData = bookTicketButton.target.className.split('&');
        let dateAndTime = myData[1];
        let justDate = dateAndTime.split(' ')[0];
        let justTime = dateAndTime.split(' ')[1];
        window.selectedShow = this.filterSelectedShow(justDate, justTime);
      });
    });
  }

  filterSelectedShow(date, time) {
    let displayShow = this.shows.find((show) => {
      return show.date == date && show.time == time;
    });
    return displayShow;
  }
}

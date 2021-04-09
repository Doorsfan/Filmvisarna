import enrichScheduleWithEmptySeats from '../components/EmptySeats.js';
export default class BookingPage {

  nowDate = new Date().toLocaleDateString('sv-SE');
  showDate = this.nowDate;

  constructor() {
    let that = this;
    $('body').on('change', '.datePicker', async function () {
      that.showDate = $(this).val();
      $('main').html(await that.render());
    });
    this.eventHandler();
  }

  async readShowsFromJson() {
    this.shows = await enrichScheduleWithEmptySeats(await $.getJSON('json/movieSchedule.json'));
    this.movies = await $.getJSON('json/movies.json');
  }

  async render() {
    let html = `
    <div class = "bookingpage-container">
    <div class = "bookingpage-cover"></div>
    <label class="datePickerLabel">Visningsdatum: <input class="datePicker" type="date" min="${this.nowDate}" value="${this.showDate}"></label>
    `;
    if (!this.shows) {
      await this.readShowsFromJson();
    }
    let shows = this.shows.filter((show) => show.date === this.showDate);
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
      <a href="#aboutPage/${movie.id}"><img alt=${movie.title} src=${movie.images[0]}></a>
      <h2><a href="#aboutPage/${movie.id}">${show.film}</a></h2>
      <p>${movie.genre.join ? movie.genre.join(', ') : movie.genre}</p> 
      <p>${movie.ageRating === "barntillåten" ? "Barntillåten" : movie.ageRating + " år"} | 
      ${Math.floor(movie.length / 60)} tim ${movie.length % 60} min</p>
      <div class="show-info">${show.date} | ${show.time} | ${show.auditorium}</div>
      <p>Lediga platser: ${show.emptySeats}</p>
      <a href="#ticketPage"><button class="bookingpage"${purgedName} ${show.date} ${show.time} ${show.auditorium} ${movie.title}>Boka</button></a>
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

        sessionStorage.setItem(
          'selectedShow',
          JSON.stringify(this.filterSelectedShow(justDate, justTime))
        );
        //window.selectedShow = this.filterSelectedShow(justDate, justTime);
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

export default class BookingPage {
  showDate = new Date().toISOString().split('T')[0];

  constructor() {
    let that = this;
    $('body').on('click', '.datePicker', function () {
      //Assign the previousDate to be able to default to the previous Date
      that.previousDate = $(this).val();
    })
    $('body').on('change', '.datePicker', async function () {
      if ($(this).val() >= new Date().toISOString().slice(0, 10)) {
        //If the showDate chosen is valid, change the showDate and re-render the update
        that.showDate = $(this).val();
        $('main').html(await that.render());
      } else {
        //If not, just re-assign the value of the date picker to be the previous date
        $(this).val(that.previousDate);
        //And then display the Modal
        $('main').prepend(`
      <div class="BookingPage BookingModal">
        <div class="BookingPage modal-content">
          <span class="BookingPage closeFailedBookingModal">&times;</span>
          <p>Du kan ej boka ett datum som redan passerat!</p>
        </div>
      </div>`);
      }
    });
    this.eventHandler();
    this.addCloseModalHandler();
  }

  addCloseModalHandler() {
    $('main').on('click', '.BookingPage.closeFailedBookingModal', (event) => {
      $('.BookingModal').remove();
    });
  }
  async readShowsFromJson() {
    this.shows = await $.getJSON('json/movieSchedule.json');
    this.movies = await $.getJSON('json/movies.json');
  }

  async render() {
    let html = `
    <div class = "bookingpage-container">
    <div class = "bookingpage-cover"></div>
    <label class="datePickerLabel">Visningsdatum: <input class="datePicker" type="date" value="${this.showDate}"></label>
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
      <a href="#aboutPage/${movie.id}"><img src=${movie.images[0]}></a>
      <h2><a href="#aboutPage/${movie.id}">${show.film}</a></h2>
      <p>${movie.genre.join ? movie.genre.join(', ') : movie.genre}
      | ${movie.ageRating === "barntillåten" ? "Barntillåten" : movie.ageRating + " år"} | ${Math.floor(movie.length / 60)} tim ${movie.length % 60} min</p>
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

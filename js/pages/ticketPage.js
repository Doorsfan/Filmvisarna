import Saloon from './saloon.js';
import ReadNWrite from '../components/readAndWriteUser.js';

export default class TicketPage {
  constructor(changeListener) {
    this.changeListener = changeListener;
    this.eventHandler();
  }

  eventHandler() {
    let bookedBefore = JSON.parse(sessionStorage.getItem('selectedShow'));
    $('main').on('click', '.ticket-booking', () => this.saveUserBooking());
    this.changeListener.on('movieSchedule.json', bookedBefore, () =>
      this.reRender()
    );
  }

  async reRender() {
    this.movieSchedule = await JSON._load('movieSchedule.json');
    await this.getBookedSeats();
    let tickets = this.bookedTickets;
    let overideSeat = [];
    $('input:checkbox[type=checkbox]').each(function () {
      let seat = $(this);
      if (tickets.includes(Number($(this).val()))) {
        $(this).prop('disabled', true);
        if ($(this).is(':checked')) {
          overideSeat.push(Number($(this).val()));
          $(`.seat-number${Number($(this).val())}`).remove();
          new Saloon().readingTicketPrices();
          alert(overideSeat + 'got booked biatch');
        }
      }
    });
  }

  async getBookedSeats() {
    let selectedShow = JSON.parse(sessionStorage.getItem('selectedShow'));

    this.bookedTickets = this.movieSchedule.find((movie) => {
      return movie.film == selectedShow.film && movie.date == selectedShow.date;
    });
    this.bookedTickets = this.bookedTickets.bookedSeats;
  }

  async saveSeats() {
    let selectedShow = JSON.parse(sessionStorage.getItem('selectedShow'));
    this.movieSchedule.forEach((movie) => {
      if (movie.film == selectedShow.film && movie.date == selectedShow.date) {
        movie.bookedSeats = [...movie.bookedSeats, ...selectedShow.seats];
      }
    });
    await JSON._save('movieSchedule.json', this.movieSchedule);
  }

  async saveUserBooking() {
    let username = sessionStorage.getItem('username');
    username ? (username = username) : (username = 'none');
    let movieInfo = JSON.parse(sessionStorage.getItem('selectedShow'));
    movieInfo.user = username;
    new ReadNWrite().saveBookings(movieInfo, username);
    let string = JSON.stringify(movieInfo);

    alert(string);
    await this.saveSeats();
    window.location.href = '#startPage';
  }

  async render() {
    this.saloonView = await new Saloon().render();
    this.movieSchedule = await JSON._load('movieSchedule.json');

    return /*html*/ ` 
    <div class='ticketpage-container'>
      <div class="ticketpage-content">
        ${this.saloonView[0].outerHTML}
        <div class='booking-info'>
          <div class="ticket-item">
          </div>
          <div class="booking-info_container">
            <div class="info-summation">
              
            </div>
            <div class="info-buttons">
              <button>AVBRYT</button>
              <button class="ticket-booking">BOKA</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

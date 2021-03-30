import Saloon from './saloon.js';
import ReadNWrite from '../components/readAndWriteUser.js';

export default class TicketPage {
  constructor(changeListener) {
    this.changeListener = changeListener;
    this.eventHandler();
  }

  eventHandler() {
    $('main').on('click', '.ticket-booking', () => this.saveUserBooking());
    this.changeListener.on('/adminbookings/bookings.json', () => {
      this.reRender();
    });
  }

  async reRender() {
    $('main').html(await this.render());
  }

  async saveUserBooking() {
    let username = sessionStorage.getItem('username');
    console.log(username);
    username
      ? (window.selectedShow.id = username)
      : (window.selectedShow.id = 'none');
    new ReadNWrite().saveBookings(window.selectedShow, username);
    let string = JSON.stringify(window.selectedShow);

    alert(string);
    await this.saveSeats();
    window.location.href = '#startPage';
  }

  async saveSeats() {
    this.movieSchedule.forEach((movie) => {
      if (
        movie.film == window.selectedShow.film &&
        movie.date == window.selectedShow.date
      ) {
        console.log(Number(movie.bookedSeats));
        movie.bookedSeats = [
          ...movie.bookedSeats,
          Number(...window.selectedShow.seat),
        ];
      }
    });
    await JSON._save('movieSchedule.json', this.movieSchedule);
  }

  async render() {
    // this.username = await JSON.parse(sessionStorage.store);
    // this.username = this.username['username'];

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

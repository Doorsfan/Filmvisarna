import Saloon from './saloon.js';
import ReadNWrite from '../components/readAndWriteUser.js';

export default class TicketPage {
<<<<<<< HEAD
  constructor(changeListener) {
    this.changeListener = changeListener;
    this.eventHandler();
  }

  eventHandler() {
    this.bookedBefore = window.selectedShow;
    $('main').on('click', '.ticket-booking', () => this.saveUserBooking());
    this.changeListener.on('movieSchedule.json', this.bookedBefore, () =>
      this.reRender()
    );
  }
=======
  constructor() {}

  async render() {
    if (sessionStorage.getItem('username') == null) {
      sessionStorage.setItem('username', '');
    }
    this.username = sessionStorage.getItem('username');
    //this.username = this.username['username'];
    if (!this.saloonView) {
      this.saloonView = await new Saloon().render();
    }

    //Kolla först ifall användaren är inloggad
>>>>>>> main

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
          console.log('Theoverride seat is: ', overideSeat);
          alert(overideSeat + 'got booked biatch');
        }
      }
    });
  }

  async getBookedSeats() {
    this.bookedTickets = this.movieSchedule.find((movie) => {
      return (
        movie.film == window.selectedShow.film &&
        movie.date == window.selectedShow.date
      );
    });
    this.bookedTickets = this.bookedTickets.bookedSeats;
  }

  async saveUserBooking() {
    let username = sessionStorage.getItem('username');
    username
      ? (window.selectedShow.id = username)
      : (window.selectedShow.id = 'none');
    new ReadNWrite().saveBookings(window.selectedShow, username);
    let string = JSON.stringify(window.selectedShow);

<<<<<<< HEAD
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
        movie.bookedSeats = [...movie.bookedSeats, ...window.selectedShow.seat];
      }
=======
    $('main').on('click', '.ticket-booking', () => {
      let user = sessionStorage.getItem('username');
      this.username = user;
      this.username
        ? sessionStorage.setItem('username', this.username)
        : sessionStorage.setItem('username', 'none');
      let movieInfo = JSON.parse(sessionStorage.getItem('selectedShow'));
      movieInfo.user = sessionStorage.getItem('username');

      new ReadNWrite().saveBookings(movieInfo, this.username);
      let string = JSON.stringify(movieInfo);
      alert(string);
      movieInfo.user === 'none'
        ? sessionStorage.clear()
        : sessionStorage.removeItem('selectedShow');
      sessionStorage.removeItem('tickets');

      window.location.href = '#startPage';
>>>>>>> main
    });
    await JSON._save('movieSchedule.json', this.movieSchedule);
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

import Saloon from './saloon.js';
import ReadNWrite from '../components/readAndWriteUser.js';
import Modal from '../components/bookingModal.js';

export default class TicketPage {
  constructor() {}

  getRow() {
    let seatInfo = [];
    this.auditorium.forEach((_, index) => {
      if (
        this.auditorium[index].auditorium === window.selectedShow['auditorium']
      ) {
        let chosenAuditorium = this.auditorium[index];
        let totalSeats = 0;

        window.selectedShow['seat'].forEach((_, seatIndex) => {
          totalSeats = 0;
          let found = false;
          chosenAuditorium.seatsPerRow.forEach((_, index) => {
            totalSeats += chosenAuditorium.seatsPerRow[index];
            if (
              totalSeats >= window.selectedShow['seat'][seatIndex] &&
              !found
            ) {
              let seat = window.selectedShow['seat'][seatIndex];
              let row = index + 1;
              seatInfo.push({ seat, row });
              found = true;
            }
          });
        });
      }
    });
    return seatInfo;
  }

  popModal() {
    let modalInfo = {
      username: window.username ? window.username : 'Ej Användare',
      film: window.selectedShow.film,
      show:
        window.selectedShow.auditorium +
        ' | ' +
        window.selectedShow.date +
        ' | ' +
        window.selectedShow.time,
      seats: this.getRow(),
    };

    this.modal = new Modal().render(modalInfo);
    $('.ticketpage-container').append(this.modal);
  }

  async render() {
    if (!this.saloonView) {
      this.saloonView = await new Saloon().render();
      this.auditorium = await $.getJSON('./json/auditoriums.json');
    }

    $('main').on('click', '.ticket-booking', () => {
      window.username
        ? (window.selectedShow.id = window.username)
        : (window.selectedShow.id = 'none');
      new ReadNWrite().saveBookings(window.selectedShow, window.username);
      let string = JSON.stringify(window.selectedShow);
      this.popModal();
    });
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

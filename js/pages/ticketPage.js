import Saloon from './saloon.js';
import ReadNWrite from '../components/readAndWriteUser.js';

export default class TicketPage {
  constructor(changeListener) {
    this.changeListener = changeListener;
    this.eventHandler();
  }

  eventHandler() {
    $('main').on('click', '.ticket-booking', () => this.saveUserBooking());
    this.changeListener.on('/json/bookings/adminbookings/bookings.json', () =>
      this.reRender()
    );
  }

  saveUserBooking() {
    this.username
      ? (window.selectedShow.id = this.username)
      : (window.selectedShow.id = 'none');
    new ReadNWrite().saveBookings(window.selectedShow, this.username);
    let string = JSON.stringify(window.selectedShow);
    alert(string);
    window.location.href = '#startPage';
  }

  async render() {
    // this.username = await JSON.parse(sessionStorage.store);
    // this.username = this.username['username'];
    if (!this.saloonView) {
      this.saloonView = await new Saloon().render();
    }

    return /*html*/ ` 
    <div class='ticketpage-container'>
      <div class="ticketpage-content">
        ${this.saloonView[0].outerHTML}
        <div class='booking-info'>
          <div class="ticket-item">
          </div>
          <div class="booking-info_container">
            <div class="info-summation">
              <p>1x Vuxen á xx kr</p>
              <p>1x Vuxen á xx kr</p>
              <p>1x Vuxen á xx kr</p>
              <hr />
              <p>XXX kr</p>
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

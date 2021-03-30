import Saloon from './saloon.js';
import ReadNWrite from '../components/readAndWriteUser.js';

export default class TicketPage {
  constructor() {}

  async render() {
    if (sessionStorage.getItem('store') == null) {
      sessionStorage.setItem('store', '');
    }
    this.username = sessionStorage.store;
    this.username = this.username['username'];
    if (!this.saloonView) {
      this.saloonView = await new Saloon().render();
    }

    console.log(window.clickedSeat);

    //Kolla först ifall användaren är inloggad

    //Om den är inloggad ska den sparas i personliga bokningshistorik

    //Oavsett ska den sparas i admin bookings

    //Efter den är sparad i bokningars

    $('main').on('click', '.ticket-booking', () => {
      let user = sessionStorage.getItem('store');
      this.username = user;
      this.username
        ? (window.selectedShow.id = this.username)
        : (window.selectedShow.id = 'none');
      new ReadNWrite().saveBookings(window.selectedShow, this.username);
      let string = JSON.stringify(window.selectedShow);
      alert(string);
      sessionStorage.removeItem('selectedShow');
      window.location.href = '#startPage';
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
// $('input:checkbox[type=checkbox]:checked');

import Saloon from './saloon.js';
import ReadNWrite from '../components/readAndWriteUser.js';

export default class TicketPage {
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

    //Om den är inloggad ska den sparas i personliga bokningshistorik

    //Oavsett ska den sparas i admin bookings

    //Efter den är sparad i bokningars

    $('main').on('click', '.ticket-booking', () => {
      let user = sessionStorage.getItem('username');
      this.username = user;
      this.username
        ? sessionStorage.setItem('username', this.username)
        : sessionStorage.setItem('username', 'none');
      let movieInfo = JSON.parse(sessionStorage.getItem('selectedShow'));
      new ReadNWrite().saveBookings(movieInfo, this.username);
      let string = JSON.stringify(movieInfo);
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

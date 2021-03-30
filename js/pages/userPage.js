import cancelBooking from '../components/cancelBooking.js';
import readAndWriteUser from '../components/readAndWriteUser.js';
const cancelBookingObject = new cancelBooking();
const readAndWriteUserObject = new readAndWriteUser();
export default class UserPage {
  constructor() {
    this.cancelBookingListener();
    this.today = new Date().toISOString().split('T')[0];
  }

  getTodayDate() {
    // let today = new Date().toLocaleDateString();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }

  async cancelBookingListener() {
    if (!this.userBookings) {
      await this.read();
      this.userBookings.forEach((element) => {
        $('main').on(
          'click',
          '.' + element.bookingNumber,
          (cancelBookingButton) => {
            cancelBookingObject.cancelBookingById(this.userBookings, cancelBookingButton.target.className);
            readAndWriteUserObject.updateUserBookings(window.username, this.userBookings);
            readAndWriteUserObject.updateAdminBookings(cancelBookingButton.target.className);
            $("." + cancelBookingButton.target.className).remove();
            $('.bookingNrDisplay').each(function (index) {
              $(this).text('Bokning ' + (index+1));
            });
          }
        );
      });
    }
  }

  async read() {
    this.username = await JSON.parse(sessionStorage.store);
    this.username = this.username['username'];
    console.log(this.username);
    if (this.username == 'admin@admin.se') {
      this.userBookings = await $.getJSON(
        `/json/bookings/adminbookings/bookings.json`
      );
    } else {
      this.userBookings = await $.getJSON(
        `/json/bookings/users/${this.username}.json`
      );
    }
  }

  async render() {
    if (!this.userBookings) {
      await this.read();
    }
    let html = $(/*html*/ `
        <div class="userpage-container">
        <div class="userpage-title">
          <h1>Mina Sidor</h1>
          <p>${this.username}</p>
        </div>
        </div>
    `);

    let num = 1;
    this.userBookings.forEach((booking) => {
      let btn = '';
      if (booking.bookingNumber) {
        btn = `<div class="booking-button"><p>Avboka</p><button class="${booking.bookingNumber}">X</button></div>`;
      } else {
        btn = '';
      }
      html.append(/*html*/ `
        <div class="userpage-bookings">
          <article class="userpage-booking ${booking.bookingNumber}">
              <div class="booking-top">
                <h2 class="bookingNrDisplay">Bokning ${num++}</h2>
                ${booking.date > this.today ? btn : ''}  
              </div>
              <div class="booking-bottom">
                <h3>${booking.film}</h3>
                <p>Bokningsnummer: <b>${booking.bookingNumber}</b> 
                  | Platser:<b> ${booking.seat}</b>
                  | Pris: <b>${booking.price} kr</b></p>
                <div class="movieDate-container">Datum: <div class="movie-date">${
                  booking.date
                }</div></div>
              </div>
          </article>
        </div>
      </div>`);
    });
    return html;
  }
}

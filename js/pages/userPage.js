export default class UserPage {
  constructor() {
    this.today = this.getTodayDate();
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

  async read() {
    this.userBookings = await $.getJSON(
      '/json/bookings/users/robban@gmail.se.json'
    );
  }

  async render() {
    if (!this.userBookings) {
      await this.read();
    }
    let html = $(/*html*/ `
        <div class="userpage-container">
        <div class="userpage-title">
          <h1>Mina Sidor</h1>
          <p>${this.userBookings[0].id}</p>
        </div>
        </div>
    `);
    console.log(this.today);
    let btn = `<div class="booking-button"><p>Avboka</p><button>X</button></div>`;

    this.userBookings.forEach((booking) => {
      html.append(/*html*/ `
        <div class="userpage-bookings">
          <article class="userpage-booking">
              <div class="booking-top">
                <h2>Bokning 1</h2>
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

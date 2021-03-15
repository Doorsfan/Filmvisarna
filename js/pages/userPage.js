export default class UserPage {
  render() {
    let userPage = $(
      /*html*/
      `<div class="userpage-container">
        <div class="userpage-title">
          <h1>Mina Sidor</h1>
          <p>Kalle1999@gmail.com</p>
        </div>
        <div class="userpage-bookings">
          <article class="userpage-booking">
              <div class="booking-top">
                <h2>Bokning 1</h2>
                <div class="booking-button">
                  <p>Avboka</p>
                  <button>X</button>
                </div>
              </div>
              <div class="booking-bottom">
                <h3>Filmtitel</h3>
                <p>Bokningsnummer: <b>1345</b>    | Platser:<b> 1, 3, 0</b>    | Pris: <b>340 kr</b></p>
                <p>Datum: <b>2021-03-23</b></p>
              </div>
          </article>
          <article class="userpage-booking">
              <div class="booking-top">
                <h2>Bokning 2</h2>
                <div class="booking-button">
                  <p>Avboka</p>
                  <button>X</button>
                </div>
              </div>
              <div class="booking-bottom">
                <h3>Filmtitel</h3>
                <p>Bokningsnummer: <b>1345</b>    | Platser:<b> 1, 3, 0</b>    | Pris: <b>340 kr</b></p>
                <p>Datum: <b>2021-03-23</b></p>
              </div>
          </article>
          <article class="userpage-booking">
              <div class="booking-top">
                <h2>Bokning 3</h2>
                <div class="booking-button">
                  <p>Avboka</p>
                  <button>X</button>
                </div>
              </div>
              <div class="booking-bottom">
                <h3>Filmtitel</h3>
                <p>Bokningsnummer: <b>1345</b>    | Platser:<b> 1, 3, 0</b>    | Pris: <b>340 kr</b></p>
                <p>Datum: <b>2021-03-23</b></p>
              </div>
          </article>
        </div>
      </div>`
    );

    return userPage;
  }
}

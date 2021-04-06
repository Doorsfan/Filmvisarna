export default class BookingModal {
  deleteHandler() {
    $('.backdrop').remove();
    window.location.href = '#startPage';
  }

  render(props) {
    console.log(props);

    this.seatInfo = '';
    props.seats.forEach((el) => {
      console.log(el);
      this.seatInfo += `<tr><td class="booking-seat">Sittplats:</td><td class="modal-value"><span class="booking-value">${el['seat']}  Rad:  ${el['currentRow']}</td></></span></tr>`;
    });

    $('main').on('click', '.button-delete', this.deleteHandler);
    let myUser = sessionStorage.getItem('username');
    return /*html*/ `
    <div class="backdrop">
      <div class="booking-modal_container">
        <button class="button-delete">X</button>
        <div class="booking-modal_title">
          <h1>Bokningsinformation</h1>
        </div>
        <table class="booking-info_container">
         <tr> <td class="booking_username">Användare:</td><td class="modal-value"><span class="booking-value">${myUser}</span></td></tr>
         <tr> <td class="booking-movie">Film:</td><td class="modal-value"><span class="booking-value">${props.film}</span></td></tr>
         <tr> <td class="booking-show">Visning:</td><td class="modal-value"><span class="booking-value">${props.show}</span></td></tr>
          ${this.seatInfo}
        </table>  
          <hr class="separator"/>
          <div class="credit_container">
            <p class="booking-card">Valt kort:  </p>
            <div class="credit-card">
              <div class="credit-title">Credit Card</div>
              <div class="card-chip">
                <div class="chip-firstline">
                  <div class="chip-firstline-leftdent"></div>
                  <div class="chip-firstline_rightdent"></div>
                </div>
                <div class="chip-secondline">
                  <div class="chip-secondline_middledent_left"></div>
                  <div class="chip-secondline_middledent_right"></div>
                </div>
                <div class="chip-thirdline">
                  <div class="chip-thirdline_leftdent"></div>
                  <div class="chip-thirdline_rightdent"></div>                   
                </div>
              </div>
              <div class="card-number">0123 4567 8901 2345</div>
              <div class="card-validation">
                <div class="card-valid">VALID THRU</div>
                <div class="card-triangle"></div>
                <div class="card-monthyear">03/24</div>             
              </div>
              <div class="card-name">${props.username} Andersson</div>
            </div>
          </div>  
      </div>
    </div>
    `;
  }
}

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
      this.seatInfo += `<p class="booking-seat">Sittplats:<span class="booking-value">${el['seat']} Rad: ${el['currentRow']}</span></p>`;
    });

    $('main').on('click', '.button-delete', this.deleteHandler);

    return /*html*/ `
    <div class="backdrop">
      <div class="booking-modal_container">
        <button class="button-delete">X</button>
        <div class="booking-modal_title">
          <h1>Bokningsinformation</h1>
        </div>
        <div class="booking-info_container">
          <p class="booking_username">Användarnamn: <span class="booking-value">${props.username}</span></p>
          <p class="booking-movie">Film:<span class="booking-value">${props.film}</span></p>
          <p class="booking-show">Visning:<span class="booking-value">${props.show}</span></p>
          ${this.seatInfo}
        </div>  
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

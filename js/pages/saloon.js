export default class Saloon {
  constructor() {
    this.eventHandler();
    this.bookedTickets = [1, 4, 5, 8, 20, 40]; // istället för att kolla mot databas
    this.selectedSeats = [];
    this.ticketObject = {};
  }
  async loadSaloon() {
    this.saloon = await JSON._load('../../json/auditoriums.json');
    window.selectedShow.auditorium === 'Savannen'
      ? (this.saloon = this.saloon[0])
      : (this.saloon = this.saloon[1]);
  }

  async render() {
    if (!this.saloon) {
      await this.loadSaloon();
    }

    let seatsArray = this.saloon.seatsPerRow;
    let html = $('<div class="saloon-container"></div>');
    let seatNumber = 0;
    for (let i = 0; i < seatsArray.length; i++) {
      let row = $(`<div class="row row-${i + 1}"></div>`);
      for (let j = 0; j < seatsArray[i]; j++) {
        seatNumber++;
        row.append(
          `<input type="checkbox" class="seats" value="${seatNumber}" ${
            this.bookedTickets.includes(seatNumber) ? 'disabled' : false
          }>
          <label>${seatNumber}</label>`
        );
      }
      html.append(row);
    }
    return html.append('<button class="btn">Välj Platser</button>');
  }

  eventHandler() {
    $('main').on('click', '.btn', () => {
      this.saveSelectedSeats();
      $('.btn').addClass('regret');
      $('.btn').html('Ångra');
    });
    $('main').on('click', '.seats', (e) => {
      window.clickedSeat = [];
      if (window.clickedSeat != e.target.value) {
        window.clickedSeat.push(e.target.value);
      }
    });

    $('main').on('click', '.regret', (e) => {
      $('.ticket-item').html('');
      $('.info-summation').html('');
      $(e.target).removeClass('regret');
      $('.btn').html('Välj Platser');

      $('.seats').prop('checked', false);
    });

    $('main').on('change', '.ticket-price', () => {
      this.readingTicketPrices();
    });
  }

  readingTicketPrices() {
    let priser = $("[class='ticket-price']")
      .map(function () {
        return Number(this.value);
      })
      .get();

    let ticketType = [];
    //Bråkar här.
    $("[class='ticket-price'] option:selected").each(function () {
      ticketType.push($(this).data('name'));
    });
    this.ticketObject.ticketPrice = priser;
    this.ticketObject.ticketType = ticketType;
    console.log(this.ticketObject);

    let priceSum = priser.reduce((a, b) => a + b, 0);

    $('.info-summation').html('');
    /*     priser.forEach((price) => {
      $('.info-summation').append(`
      <p>1x ${ticketType} á ${price} kr</p>
      
    `);
    }); */
    $('.info-summation').append(`<hr><p>Summma: ${priceSum} kr</p>`);
  }

  saveSelectedSeats() {
    $('.ticket-item').html('');
    let checked = $('input:checkbox[type=checkbox]:checked');
    let arr = [];

    $('input:checkbox[type=checkbox]:checked').each(function () {
      arr.push(Number($(this).val()));
    });
    this.selectedSeats = arr.slice();

    this.bookedTickets = [...this.bookedTickets, ...arr];

    this.selectedSeats.forEach((seat) => {
      $('.ticket-item').append(/*html**/ `
          <div class='ticket-box'>
            <p> Biljett - Stolsnummer: ${seat}</p>
            <select class="ticket-price">
              <option value='0' data-name='Inte vald'>Välj typ:</option>
              <option value='85' data-name='Vuxen'>Vuxen</option>
              <option value='65' data-name='Barn'>Barn</option>
              <option value='75' data-name='Pensionär'>Pensionär</option>
            </select>
          </div>
      `);
    });

    window.selectedShow.seat = [...this.selectedSeats];
  }
}

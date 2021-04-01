export default class Saloon {
  constructor() {
    this.eventHandler();
    this.bookedTickets = [1, 4, 5, 8, 20, 40]; // istället för att kolla mot databas
    this.selectedSeats = [];
    this.ticketObject = {};
  }
  async loadSaloon() {
    this.saloon = await JSON._load('../../json/auditoriums.json');

    let selectedShow = JSON.parse(sessionStorage.getItem('selectedShow'));
    selectedShow.auditorium === 'Savannen'
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
    /* $('main').on('click', '.seats', (e) => {
      window.clickedSeat = [];
      if (window.clickedSeat != e.target.value) {
        window.clickedSeat.push(e.target.value);
      }
    }); */

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
    let selectedTicketPrice = $("[class='ticket-price']")
      .map(function () {
        return Number(this.value);
      })
      .get();

    let selectedTicketType = [];
    $("[class='ticket-price'] option:selected").each(function () {
      selectedTicketType.push($(this).data('name'));
    });

    let priceSum = selectedTicketPrice.reduce((sum, price) => sum + price, 0);
    let tickets = {
      selectedTicketType,
      selectedTicketPrice,
      priceSum,
    };

    sessionStorage.setItem('tickets', JSON.stringify(tickets));

    $('.info-summation').html('');
    for (let i = 0; i < selectedTicketType.length; i++) {
      $('.info-summation').append(`
      <p>Billjet typ: ${selectedTicketType[i]} á ${selectedTicketPrice[i]} kr</p>`);
    }
    $('.info-summation').append(`<hr><p>Summma: ${priceSum} kr</p>`);
  }

  saveSelectedSeats() {
    $('.ticket-item').html('');
    //let checked = $('input:checkbox[type=checkbox]:checked');
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
    let selectedShow = JSON.parse(sessionStorage.getItem('selectedShow'));
    selectedShow.seats = [...this.selectedSeats];

    sessionStorage.setItem('selectedShow', JSON.stringify(selectedShow));
  }
}

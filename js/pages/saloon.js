export default class Saloon {
  constructor() {
    this.eventHandler();
    this.bookedTickets = [1, 4, 5, 8, 20, 40]; // istället för att kolla mot databas
    this.selectedSeats = [];
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
      $(e.target).removeClass('regret');
      $('.btn').html('Välj Platser');

      $('.seats').prop('checked', false);
    });

    $('main').on('change', '.ticket-price', () => {
      let priser = $("[class='ticket-price']")
        .map(function () {
          return Number(this.value);
        })
        .get();
      let priceSum = priser.reduce((a, b) => a + b, 0);

      console.log(priser);
      console.log(priceSum);
    });
    /* $('main').on('change', '.ticket-price', (e) => {
      let priser = $("[class^='ticket-price']")
        .map(function () {
          return this.value;
        })
        .get();
      $('info-summation').html(`Kommer detta?`);
      console.log(priser);
    }); */
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
              <option value='0'>Välj typ:</option>
              <option value='85'>Vuxen</option>
              <option value='65'>Barn</option>
              <option value='75'>Pensionär</option>
            </select>
          </div>
      `);
    });

    window.selectedShow.seat = [...this.selectedSeats];
  }
}

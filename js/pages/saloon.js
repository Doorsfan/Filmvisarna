export default class Saloon {
  constructor() {
    this.eventHandler();

    this.ticketObject = {};
  }
  async loadSaloon() {
    this.saloon = await JSON._load('auditoriums.json');
    this.movieSchedule = await JSON._load('movieSchedule.json');

    let selectedShow = JSON.parse(sessionStorage.getItem('selectedShow'));
    selectedShow.auditorium === 'Savannen'
      ? (this.saloon = this.saloon[0])
      : (this.saloon = this.saloon[1]);
  }

  async getBookedSeats() {
    let selectedShow = JSON.parse(sessionStorage.getItem('selectedShow'));

    this.bookedTickets = this.movieSchedule.find((movie) => {
      return movie.film == selectedShow.film && movie.date == selectedShow.date;
    });
    this.bookedTickets = this.bookedTickets.bookedSeats;
  }

  async render() {
    await this.loadSaloon();
    await this.getBookedSeats();

    let seatsArray = this.saloon.seatsPerRow;
    let html = $(
      `<div class="saloon-container ${this.saloon.auditorium}"></div>
      `
    );
    this.seatNumber = 0;
    for (let i = 0; i < seatsArray.length; i++) {
      let row = $(`<div class="row row-${i + 1}"></div>`);
      for (let j = 0; j < seatsArray[i]; j++) {
        this.seatNumber++;
        row.append(
          `<input type="checkbox" class="seats seat${this.seatNumber}" value="${
            this.seatNumber
          }" ${
            this.bookedTickets.includes(this.seatNumber) ? 'disabled' : false
          }>
          <label>${this.seatNumber}</label>`
        );
      }
      html.append(row);
    }

    html.prepend('<div class="screen"></div>');
    return html.append('<button class="btn" disabled="true">Fortsätt</button>');
  }

  eventHandler() {
    $('main').on('click', '.btn', () => {
      this.saveSelectedSeats();
      $('.btn').addClass('regret');
      $('.btn').html('Ångra');
      $('.info-buttons').html(
        `<button type='button' class="ticket-booking" disabled='true'>BOKA</button>`
      );
    });

    $('main').on('click', '.regret', (e) => {
      $('.ticket-item').html('');
      $('.info-summation').html('');
      $(e.target).removeClass('regret');
      $('.btn').html('Välj Platser');
      $('.btn').prop('disabled', true);
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
      if ($(this).data('name') === 'Inte vald') {
      }
      selectedTicketType.push($(this).data('name'));
    });

    let priceSum = selectedTicketPrice.reduce((sum, price) => sum + price, 0);
    let tickets = {
      selectedTicketType,
      selectedTicketPrice,
      priceSum,
    };
    if (tickets.selectedTicketType.length > 0) {
      let show = JSON.parse(sessionStorage.getItem('selectedShow'));
      show.price = priceSum;
      !selectedTicketType.includes('Inte vald')
        ? $('.ticket-booking').prop('disabled', false)
        : $('.ticket-booking').prop('disabled', true);

      sessionStorage.setItem('selectedShow', JSON.stringify(show));
      sessionStorage.setItem('tickets', JSON.stringify(tickets));

      $('.info-summation').html('');
      for (let i = 0; i < selectedTicketType.length; i++) {
        $('.info-summation').append(`
      <p class="seat-number${this.seatNumber}">Billjet typ: ${selectedTicketType[i]} á ${selectedTicketPrice[i]} kr</p>`);
      }
    } else {
      $('.ticket-item').html('');
      $('.info-summation').html('');
      $('.btn').removeClass('regret');
      $('.btn').html('Välj Platser');
      $('.ticket-booking').prop('disabled', true);
    }
    $('.info-summation').append(
      `<hr class="seperator"><p>Summa: ${priceSum} kr</p>`
    );
  }

  saveSelectedSeats() {
    $('.ticket-item').html('');

    let arr = [];

    $('input:checkbox[type=checkbox]:checked').each(function () {
      arr.push(Number($(this).val()));
    });
    this.selectedSeats = arr.slice();

    if (this.bookedTickets === undefined) {
      this.bookedTickets = [...arr];
    } else {
      this.bookedTickets = [...this.bookedTickets, ...arr];
    }

    this.selectedSeats.forEach((seat) => {
      $('.ticket-item').append(/*html**/ `
          <div class='ticket-box seat-number${seat}'>
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

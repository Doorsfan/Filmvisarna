import Saloon from './saloon.js';
import ReadNWrite from '../components/readAndWriteUser.js';
import Modal from '../components/bookingModal.js';

export default class TicketPage {
  constructor(changeListener) {
    this.changeListener = changeListener;
    this.eventHandler();
  }

  eventHandler() {
    let bookedBefore = JSON.parse(sessionStorage.getItem('selectedShow'));
    $('main').on('click', '.ticket-booking', () => this.saveUserBooking());

    $('main').on('click', '.button-delete', () => this.saveSeats());

    if (this.changeListener) {
      this.changeListener.on('movieSchedule.json', bookedBefore, () =>
        this.reRender()
      );
    }
    $('main').on('click', '.ticketPage.closeTakenSeatModal', (event) => {
      $('.takenSeatModal').remove();
    });
  }

  async reRender() {
    this.movieSchedule = await JSON._load('movieSchedule.json');
    await this.getBookedSeats();
    let tickets = this.bookedTickets;
    let overideSeat = [];
    $('input:checkbox[type=checkbox]').each(function () {
      let seat = $(this);
      if (tickets.includes(Number($(this).val()))) {
        $(this).prop('disabled', true);
        if ($(this).is(':checked')) {
          $(this).prop('checked', false);
          overideSeat.push(Number($(this).val()));
          $(`.seat-number${Number($(this).val())}`).remove();
          new Saloon().readingTicketPrices();
        }
      }
    });
    tickets.forEach((wantedSeat) => {
      overideSeat.forEach((takenSeat) => {
        if (wantedSeat == takenSeat) {
          tickets = this.removeWithSlice(tickets, tickets.indexOf(wantedSeat));
        }
      })
    })
    let selectedShow = JSON.parse(sessionStorage.getItem('selectedShow'));
    this.movieSchedule.forEach((movie) => {
      if (movie.film == selectedShow.film && movie.date == selectedShow.date) {
        overideSeat.forEach((takenSeat) => {
          if (selectedShow.seats.includes(takenSeat)) {
            selectedShow.seats = this.removeWithSlice(selectedShow.seats, selectedShow.seats.indexOf(takenSeat));
          }
        });
      }
    })

    //Only render the Modal once, in case there isn't one already
    if ($('.takenSeatModal').length == 0 && overideSeat.length > 0) {
      let myHTML = `<div class="ticketPage takenSeatModal">
            <div class="ticketPage modal-content">
              <span class="ticketPage closeTakenSeatModal">&times;</span>
              <p>Tyvärr, så blev sätena: `;
      myHTML += overideSeat;
      myHTML += ` tagna!</p></div></div>`;
      $('main').prepend(myHTML);
      sessionStorage.setItem('selectedShow', JSON.stringify(selectedShow));
    }
  }
  // Due to Splice refusing to work properly, i work around it with Slice and Concat
  removeWithSlice(originalArray, index) {
    let firstPart = originalArray.slice(0, index);
    let secondPart = originalArray.slice(index + 1);
    return firstPart.concat(secondPart);
  }

  async getBookedSeats() {
    let selectedShow = JSON.parse(sessionStorage.getItem('selectedShow'));

    this.bookedTickets = this.movieSchedule.find((movie) => {
      return movie.film == selectedShow.film && movie.date == selectedShow.date;
    });
    this.bookedTickets = this.bookedTickets.bookedSeats;
  }

  async saveSeats() {
    let selectedShow = JSON.parse(sessionStorage.getItem('selectedShow'));
    this.movieSchedule.forEach((movie) => {
      if (movie.film == selectedShow.film && movie.date == selectedShow.date) {
        movie.bookedSeats = [...movie.bookedSeats, ...selectedShow.seats];
      }
    });
    await JSON._save('movieSchedule.json', this.movieSchedule);
  }

  async saveUserBooking() {
    let username = sessionStorage.getItem('username');
    username ? (username = username) : (username = 'none');
    let movieInfo = JSON.parse(sessionStorage.getItem('selectedShow'));
    movieInfo.user = username;
    new ReadNWrite().saveBookings(movieInfo, username);
    let string = JSON.stringify(movieInfo);
    this.popModal(movieInfo);
    // window.location.href = '#startPage';
  }

  getRow(movieInfo) {
    let seatInfo = [];

    movieInfo.seats.forEach((seat) => {
      let row = $(`input:checkbox[value=${seat}]`)
        .parent()
        .attr('class')
        .slice(-1);

      let currentRow = Number(row);
      seatInfo.push({ seat, currentRow });
    });

    return seatInfo;
  }

  popModal(movieInfo) {
    let modalInfo = {
      username: movieInfo.username ? movieInfo.username : 'Ej Användare',
      film: movieInfo.film,
      show:
        movieInfo.auditorium + ' | ' + movieInfo.date + ' | ' + movieInfo.time,
      seats: this.getRow(movieInfo),
    };

    this.modal = new Modal().render(modalInfo);
    $('.ticketpage-container').append(this.modal);
  }

  async render() {
    this.saloonView = await new Saloon().render();
    this.movieSchedule = await JSON._load('movieSchedule.json');
<<<<<<< HEAD
    console.log(this.movieSchedule);
    return /*html*/ `
=======
    return /*html*/ ` 
>>>>>>> main
    <div class='ticketpage-container'>
      <div class="ticketpage-content">
        ${this.saloonView[0].outerHTML}
        <div class='booking-info'>
          <div class="ticket-item">
          </div>
          <div class="booking-info-container">
            <div class="info-summation">
            </div>
            <div class="info-buttons">
              
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

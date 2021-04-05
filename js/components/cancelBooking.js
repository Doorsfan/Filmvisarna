export default class cancelBooking {
  cancelBookingById(bookings, bookingId) {
    let index = 0;
    for (let myBooking of bookings) {
      if (myBooking.bookingNumber == bookingId) {
        this.removeSeatsInMovieSchedule(bookings.splice(index, 1));
      }
      index += 1;
    }
  }

  async removeSeatsInMovieSchedule(myBooking) {
    let movieSchedule = await JSON._load('movieSchedule.json');
    for (let show of movieSchedule) {
      if (show.bookedSeats) {
        for (let bookedSeat of show.bookedSeats) {
          if (
            myBooking[0].seats.includes(bookedSeat) &&
            myBooking[0].date == show.date &&
            myBooking[0].time == show.time &&
            myBooking[0].film == show.film &&
            myBooking[0].auditorium == show.auditorium
          ) {
            let firstPiece = show.bookedSeats.slice(0, show.bookedSeats.indexOf(bookedSeat));
            let secondPiece = show.bookedSeats.slice(show.bookedSeats.indexOf(bookedSeat) + 1, show.bookedSeats.length);
            show.bookedSeats = firstPiece.concat(secondPiece);
          }
        }  
      }
    }
    await JSON._save('movieSchedule.json', movieSchedule);
  }
}
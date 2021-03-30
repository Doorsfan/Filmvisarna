export default class cancelBooking {
  cancelBookingById(bookings, bookingId) {
    let index = 0;
    for (let myBooking of bookings) {
      if (myBooking.bookingNumber == bookingId) {
        bookings.splice(index, 1);
      }
      index += 1;
    }
  }
}
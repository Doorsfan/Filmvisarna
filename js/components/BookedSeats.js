import ReadNWrite from '../components/readAndWriteUser.js';

export default class BookedSeats  {

  constructor() {}
  
  async read() {
    this.shows = await $.getJSON('json/movieSchedule.json');
    this.seats = await $.getJSON('json/bookings/adminbookings/bookings.json')
  }

  async(saveBookedSeats) {
    await JSON._save(`json/movieSchedule.json${seats}`, []);
  }

}
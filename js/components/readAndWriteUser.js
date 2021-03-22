export default class readAndWriteUser {
  constructor() {}

  async saveUser(username, password) {
    await JSON._save(`./users/${username + password}`, "test");
  }

  async loadUser(username, password) {
    if (!this.user) {
      try {
        this.user = await JSON._load(`./users/${username + password}`);
      } catch (error) {
        console.log('No user');
        return;
      }
    }
  }

  async loadBooking(user) {
    this.allBooking = await JSON._load('bookings/adminbookings/bookings.json');
    if (user) {
      this.userBooking = await JSON._load(`/bookings/users/${user}.json`);
    }
  }

  async saveBookings(booking, user) {
    if (!this.allBooking) {
      await this.loadBooking(user);
    }

    this.allBooking.push(booking);
    await JSON._save('bookings/adminbookings/bookings.json', this.allBooking);

    if (user) {
      this.userBooking.push(booking);
      await JSON._save(`bookings/users/${user}.json`, this.userBooking);
    }
  }
}
//put this in async read in startPage to test out component
// let booking = {
//   id: 'none',
//   auditorium: 'Lilla Paris',
//   film: 'Relic',
//   date: '2021-03-22',
//   time: '18.00',
//   seat: [13, 14],
//   price: 300,
// };
// this.try = await new ReadWrite().saveBookings(booking, "robban@gmail.se");

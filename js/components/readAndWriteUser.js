export default class readAndWriteUser {
  constructor() {}

  async saveUser(username, password) {
    await JSON._save(`./users/${username + password}`, { "user": username, "pw": password });
  }

  async loadUser(username, password) {    
    try {
      console.log("trying to load with username of: " + username);
      console.log("trying to load with pw of: " + password);
      this.user = await JSON._load(`./users/${username + password}.json`);
      return this.user;
    } catch (error) {
      return;
    }
  }

  async loadBooking(user) {
    this.allBooking = await JSON._load('bookings/adminbookings/bookings.json');
    if (user) {
      this.userBooking = await JSON._load(`/bookings/users/${user}.json`);
    }
  }

  async saveBookings(booking, user) {
    console.log(user);
    if (!this.allBooking) {
      try {
        await this.loadBooking(user);
      } catch (e) {}
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

export default class readAndWriteUser {
  constructor() {}

  async saveUser(username, password) {
<<<<<<< Updated upstream
    await JSON._save(`./users/${username + password}`, {
      user: username,
      password: password,
    });
    await JSON._save(`./bookings/users/${username}`, []);
  }

  // async loadUser(username, password) {
  //   try {
  //     console.log('trying to load with username of: ' + username);
  //     console.log('trying to load with pw of: ' + password);
  //     this.user = await JSON._load(`./users/${username + password}.json`);
  //     return this.user;
  //   } catch (error) {
  //     return;
  //   }
  // }

  async loadUser(username, password) {
    try {
      this.user = await JSON._load(`./users/${username + password}`);
    } catch (error) {
      alert('No .json with that combination');
      return false;
    }
    this.saveUserToSessionStorage(username);
    this.renderForActiveUser();
    alert(`Välkommen ${username}`);
    return true;
  }

  renderForActiveUser() {
    $('.login').replaceWith(`
      <a href='#userPage'>Mina sidor</a>
    `);
    $('.navlist').append(
      `<li class="navlist-item logout"><a href='#'>Logga ut</a></li>`
    );
    $('.userpage-button')
      .replaceWith(`<a class="userpage-button" href="#userPage">
          <img class="user-icon" src="../images/user.png" alt="home"/>
        </a>`);
  }

  createRandomString() {
    let randomNumber = Math.random().toString(36).substring(2, 12);
    return randomNumber;
  }

  saveUserToSessionStorage(username) {
    let store = {};
    try {
      store = JSON.parse(sessionStorage.store);
    } catch (e) {}
    store.save = function () {
      sessionStorage.store = JSON.stringify(this);
    };
    store['username'] = username;
    store.save();
=======
    await JSON._save('./users/' + username, password);
  }

  async loadUser(username) {
    /*
    fetch("/json/users/" + username + ".json")
      .then(response => response.json())
      .then(user => {
        this.example = user.password;
      }); */
    this.user = await JSON._load('/users/' + username + '.json');
    if (!this.user) {
      await this.loadUser(username);
    }
>>>>>>> Stashed changes
  }

  async loadBooking(user) {
    this.allBooking = await JSON._load('bookings/adminbookings/bookings.json');
    if (user) {
      this.userBooking = await JSON._load(`/bookings/users/${user}.json`);
    }
  }

<<<<<<< Updated upstream
  async updateUserBookings(user,bookings) {
    await JSON._save(`bookings/users/${user}.json`, bookings);
  }

  async updateAdminBookings(userId) {
    this.allBooking = await JSON._load('bookings/adminbookings/bookings.json');
    let index = 0;
    for (let booking of this.allBooking) {
      if (booking.bookingNumber === userId) {
        this.allBooking.splice(index, 1);
        break;
      }
      index += 1;
    }
    await JSON._save('bookings/adminbookings/bookings.json', this.allBooking);
  }

  async saveBookings(booking, user) {
    booking.bookingNumber = this.createRandomString();
    if (!this.allBooking) {
      try {
        await this.loadBooking(user);
      } catch (e) {}
=======
  async saveBookings(booking, user) {
    if (!this.allBooking) {
      await this.loadBooking(user);
>>>>>>> Stashed changes
    }

    this.allBooking.push(booking);
    await JSON._save('bookings/adminbookings/bookings.json', this.allBooking);

    if (user) {
      this.userBooking.push(booking);
      await JSON._save(`bookings/users/${user}.json`, this.userBooking);
    }
  }
}
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
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

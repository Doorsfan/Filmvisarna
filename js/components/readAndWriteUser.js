export default class readAndWriteUser {
  constructor() {}

  async saveUser(username, password) {
    await JSON._save(`./users/${username + password}`, {
      user: username,
      password: password,
    });
    await JSON._save(`./bookings/users/${username}`, []);
  }

  async loadUser(username, password) {
    try {
      this.user = await JSON._load(`./users/${username + password}`);
    } catch (error) {
      $('main').prepend(`
      <div class="loginPage loginModal">
        <div class="loginPage modal-content">
          <span class="loginPage closeFailedLoginModal">&times;</span>
          <p>Tyvärr, kunde inte logga in med användarnamnet av ${username}.</p>
        </div>
      </div>`);
      return false;
    }
    this.saveUserToSessionStorage(username);
    this.renderForActiveUser();
    $('main').prepend(`
      <div class="loginPage loginModal">
        <div class="loginPage modal-content">
          <span class="loginPage closeSuccessfulLoginModal">&times;</span>
          <p>Välkommen, ${username}!</p>
        </div>
      </div>`)
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
    sessionStorage.setItem('username', username);
  }

  async loadBooking(user) {
    this.allBooking = await JSON._load('bookings/adminbookings/bookings.json');
    if (user !== 'none' && user !== 'admin@admin.se') {
      this.userBooking = await JSON._load(`/bookings/users/${user}.json`);
    }
  }

  async updateUserBookings(user, bookings) {
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
    }
    // remove all booked seats, we dont need that in the object / user
    delete booking.bookedSeats;
    this.allBooking.push(booking);

    await JSON._save('bookings/adminbookings/bookings.json', this.allBooking);
    if (user !== 'none' && user !== 'admin@admin.se') {
      delete booking.bookedSeats;
      this.allBooking.push(booking);
      this.userBooking.push(booking);
      await JSON._save(`bookings/users/${user}.json`, this.userBooking);
    }
  }
}

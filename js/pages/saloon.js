export default class Saloon {
  constructor() {
    this.eventHandler();
    this.selectedSeats = [];
  }
  async loadSaloon() {
    this.saloon = await JSON._load('../../json/auditoriums.json');
    this.saloon = this.saloon[1]; // just so we can test on one saloon
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
          `<input type="checkbox" class="seats" value="${seatNumber}">
          <label>${seatNumber}</label>`
        );
      }
      html.append(row);
    }
    return html.append('<button class="btn">Hej</button>');
  }

  eventHandler() {
    $('main').on('click', '.btn', () => this.saveSelectedSeats());
  }

  saveSelectedSeats() {
    let checked = $('input:checkbox[type=checkbox]:checked');
    let arr = [];
    console.log(checked);
    $('input:checkbox[type=checkbox]:checked').each(function () {
      arr.push($(this).val());
    });
    this.selectedSeats = arr.slice();
    console.log(this.selectedSeats);
  }
}

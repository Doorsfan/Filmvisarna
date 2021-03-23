import Saloon from './saloon.js';

export default class TicketPage {
  constructor() {}

  async render() {
    if (!this.saloonView) {
      this.saloonView = await new Saloon().render();

      // console.log(this.saloonView.7
    }

    //1. Få tag på biljetter
    // let tickets = saloonView.getSeats();

    // let tickets = this.saloonView.selectedSeats();

    //rendera biljettboxes beroende på det
    // tickets.forEach()

    let html = $('');

    // $('main').on('click', '.seats', (e) => {

    //   $('.booking-info').append(/*html**/ `
    //   <div class='ticket-box'>
    //     <p> Biljett</p>
    //     <select>
    //       <option value='Vuxen'>Vuxen</option>
    //       <option value='Barn'>Barn</option>
    //       <option value='Pensionär'>Pensionär</option>
    //     </select>
    //   </div>
    //   `);
    // });

    return /*html*/ ` 
    <div class='ticketpage-container'>
      ${this.saloonView[0].outerHTML}
      <div class='booking-info'>
      </div>
    </div>
    `;
  }
}
// $('input:checkbox[type=checkbox]:checked');

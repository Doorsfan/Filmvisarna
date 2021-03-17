/*  Min task: Boka-Film-Page) Hämta Salong, längd, kategori tidslag från json och rendera mha jquery
*   Hämtas från movieSchedule.json: auditorium, time.
*   Hämtas från movies.json:  title, length, genre.
*
*   Daniels task: US 2) Rendera boka-film-page mha jquery
*/

export default class BookingPage
{
  render() {
    let html = $(/*html*/`  
    <div class = "bookingpage-container">
    <div class = "bookingpage-cover"></div>
    <h1>Visningar</h1>
    <div class = "bookingpage-show">
    <button>Boka biljett</button></div>
    </div> `)
    return html
  }

  async readShowsFromJson() {
    this.shows = await $.getJSON('movieSchedule.json');
    this.movies = await $.getJSON('movies.json');


  }

  
}
import filterMovies from '../components/filterMovies.js';
export default class MoviePage {
  constructor() {
    this.eventHandler();
    this.movieFilter = new filterMovies();
  }
  async read() {
    this.movies = await $.getJSON('/json/movies.json');
  }
  async render() {
    if (!this.movies) {
      await this.read();
    }
    let html = /*html*/ `<div class="movie-container"><h1>Våra filmer</h1><div class="movie-filter">
    <select id="category-filter">
    <option value="default">Genre</option>
    <option value="Drama">Drama</option>
    <option value="Brott">Brott</option>
    <option value="Komedi">Komedi</option>
    <option value="Romans">Romans</option>
    <option value="Äventyr">Äventyr</option>
    <option value="Familjefilm">Familjefilm</option>
    <option value="Skräck">Skräck</option>
    <option value="Mysterium">Mysterium</option>
    </select>
    <select id="age-filter">
    <option value="default">Åldersgrupp</option>
    <option value="6">6</option>
    <option value="14">14</option>
    <option value="18">18</option>
    </select>
    </div>
    <div class="movies-main-box">`;

    this.movies.forEach((data) => {
      // if data.genre is an array then save it to a string
      // for loop ta bort från sista.
      let genreString = '';

      if (Array.isArray(data.genre)) {
        for (let i = 0; i < data.genre.length; i++) {
          if (i === data.genre.length - 1) {
            genreString += data.genre[i];
          } else {
            genreString += data.genre[i] + ', ';
          }
        }
      } else {
        genreString = data.genre;
      }
      console.log(genreString);
      html += /*html*/ `<section class="movie-info">
          <div class="movie-poster">
            <a href="#aboutPage${data.id}"><img src="${data.images[0]}"></a>
          </div>
          <div class="movie-text">
            <h2 class="title-name"><p>${data.title}</p></h2>
            <div class="genre"><h4>Genre: </h4> <p>${genreString}</p></div>
            <div class="runtime"><h4>Speltid: </h4> <p>${
              data.length + ' minuter'
            }</p></div>
            <div class="story"><h4>Handling:&nbsp;</h4> ${
              data.description
            }</div>
          </div>
        </section>`;
    });

    html += '</div></div>';
    return html;
  }

  eventHandler() {
    $('body').on('change', '.movie-filter', () => {
      this.movieFilter.reRenderMovies(
        $('#category-filter').val(),
        $('#age-filter').val()
      );
    });
  }
}

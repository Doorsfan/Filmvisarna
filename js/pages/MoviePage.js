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
    <option value="default">Genre</option>`;

    let allGenres = [];

    this.listingAllGenres(allGenres);

    allGenres.forEach((genre) => {
      html += /*html*/ ` <option value="${genre}">${genre}</option> `;
    });

    html += /*html*/ `
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

  listingAllGenres(allGenres) {
    this.movies.forEach((movie) => {
      if (Array.isArray(movie.genre)) {
        movie.genre.forEach((data) => {
          if (allGenres.includes(data)) {
          } else {
            allGenres.push(data);
          }
        });
      } else {
        if (allGenres.includes(movie.genre)) {
        } else {
          allGenres.push(movie.genre);
        }
      }
    });
    console.log(allGenres);
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

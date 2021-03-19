export default class MoviePage {
  constructor() {
    this.eventHandler();
    this.read();
  }
  async read() {
    this.movies = await $.getJSON('/json/movies.json');
  }
  async render() {
    let allGenres = [];
    let ageRating = [];
    let sortedAgeRating = [];

    if (!this.movies) {
      await this.read();
    }
    let html = /*html*/ `
    <div class="movie-container"><h1>Våra filmer</h1><div class="movie-filter">
    <select id="category-filter">
    <option value="default">Genre</option>`;

    this.gettingGenresFromJson(allGenres);

    allGenres.forEach((genre) => {
      html += /*html*/ ` <option value="${genre}">${genre}</option> `;
    });

    html += /*html*/ `
    </select>
    <select id="age-filter">
    <option value="default">Åldersgrupp</option>`;

    this.gettingAgeRatingFromJson(ageRating);
    sortedAgeRating = ageRating.slice().sort((a, b) => a - b);

    sortedAgeRating.forEach((age) => {
      html += /*html*/ `<option value="${age}">${age}</option>`;
    });

    html += /*html*/ `
    </select>
    </div>
    <div class="movies-main-box">`;

    this.movies.forEach((data) => {
      html = this.addingMovieInfoToHtml(data, html);
    });

    html += '</div></div>';

    return html;
  }

  reRenderMovies(category, age) {
    let html = '';
    let filteredMovies = [];
    let movieAge = '';
    this.movies.forEach((movie) => {
      if (isNaN(parseFloat(movie.ageRating))) {
        movieAge = movie.ageRating;
      } else {
        movieAge = parseInt(movie.ageRating);
      }
      if (movieAge === 'barntillåten' || age === 'default') {
        if (
          movie.genre.includes(category) ||
          category === 'default' ||
          movie.genre == category
        ) {
          filteredMovies.push(movie);
        }
      } else if (
        (movieAge <= age && movie.genre.includes(category)) ||
        (movieAge <= age && category === 'default') ||
        (movieAge <= age && movie.genre == category)
      ) {
        filteredMovies.push(movie);
      }
    });
    filteredMovies.forEach((data) => {
      html = this.addingMovieInfoToHtml(data, html);
    });
    html += '</div></div>';
    $('.movies-main-box').html(' ');
    $('.movies-main-box').append(html);
  }

  gettingGenresFromJson(allGenres) {
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
  }

  gettingAgeRatingFromJson(ageRating) {
    this.movies.forEach((movie) => {
      if (ageRating.includes(movie.ageRating)) {
        //do nothing
      } else {
        ageRating.push(movie.ageRating);
      }
    });
  }

  addingMovieInfoToHtml(data, html) {
    let genreString = '';
    genreString = this.removingUnwantedLastComma(data, genreString);
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
    return html;
  }

  removingUnwantedLastComma(data, genreString) {
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
    return genreString;
  }

  eventHandler() {
    $('body').on('change', '.movie-filter', () => {
      this.reRenderMovies($('#category-filter').val(), $('#age-filter').val());
    });
  }
}

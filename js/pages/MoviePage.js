import filterMovies from '../components/filterMovies.js';
export default class MoviePage {
  constructor() {
    this.eventHandler();
<<<<<<< Updated upstream
    this.read();
=======
    this.movieFilter = new filterMovies();
>>>>>>> Stashed changes
  }
  async read() {
    this.movies = await $.getJSON('/json/movies.json');
  }
  async render() {
    let genresToAdd = [];
    let ageRatingsToAdd = [];
    let allGenres = '';
    let ageRatings = '';
    let movieInfo = '';

    if (!this.movies) {
      await this.read();
    }
<<<<<<< Updated upstream
    this.gettingGenresFromJson(genresToAdd);
    genresToAdd.forEach((genre) => {
      allGenres += /*html*/ ` <option value="${genre}">${genre}</option> `;
    });
    this.gettingAgeRatingFromJson(ageRatingsToAdd);
    ageRatingsToAdd.forEach((age) => {
      ageRatings += /*html*/ `<option value="${age}">${age}</option>`;
    });
=======
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

>>>>>>> Stashed changes
    this.movies.forEach((data) => {
      movieInfo += this.addingMovieInfoToHtml(data);
    });

    return `
    <div class="movie-container"><h1>Våra filmer</h1><div class="movie-filter">
      <select id="category-filter">
      <option value="default">Genre</option>
        ${allGenres}
      </select>
      <select id="age-filter">
      <option value="default">Åldersgrupp</option>
        ${ageRatings}
      </select>
    </div>
    <div class="movies-main-box">
        ${movieInfo}
    </div></div>
    `;
  }

  reRenderMovies(category, age) {
    let movieInfo = '';
    let filteredMovies = [];

    this.filteringMovies(age, category, filteredMovies);

    filteredMovies.forEach((data) => {
      movieInfo += this.addingMovieInfoToHtml(data);
    });

    movieInfo += '</div></div>';
    $('.movies-main-box').html(' ');
    $('.movies-main-box').append(movieInfo);
  }

  filteringMovies(age, category, filteredMovies) {
    this.movies.forEach((movie) => {
      let movieAge = '';
      isNaN(parseFloat(movie.ageRating))
        ? (movieAge = movie.ageRating)
        : (movieAge = parseInt(movie.ageRating));
      if (movieAge === 'barntillåten' || age === 'default') {
        if (movie.genre.includes(category) || category === 'default') {
          filteredMovies.push(movie);
        }
      } else if (
        (movieAge <= age && movie.genre.includes(category)) ||
        (movieAge <= age && category === 'default')
      ) {
        filteredMovies.push(movie);
      }
    });
  }

  gettingGenresFromJson(allGenres) {
    this.movies.forEach((movie) => {
      movie.genre.forEach((data) => {
        if (!allGenres.includes(data)) {
          allGenres.push(data);
        }
      });
    });
  }

  gettingAgeRatingFromJson(ageRating) {
    this.movies.forEach((movie) => {
      if (!ageRating.includes(movie.ageRating)) {
        ageRating.push(movie.ageRating);
      }
    });
    ageRating.sort((a, b) => a - b);
  }

  addingMovieInfoToHtml(data, html) {
    let genreString = '';
    genreString = this.removingUnwantedLastComma(data, genreString);
    return `<section class="movie-info">
          <div class="movie-poster">
<<<<<<< Updated upstream
            <a href="#aboutPage/${data.id}"><img src="${data.images[0]}"></a>
          </div>
          <div class="movie-text">
            <h2 class="title-name"><p>${data.title}</p></h2>
            <div class="genre"><h4>Genre: </h4> <p>${genreString}</p></div>
            <div class="runtime"><h4>Speltid: </h4> <p>
            ${data.length + ' minuter'}</p></div>
            <div class="story"><h4>Handling:&nbsp;</h4>
            ${data.description}</div>
=======
            <a href="#aboutPage${data.id}"><img src="${data.images[0]}"></a>
          </div>
          <div class="movie-text">
            <h2 class="title-name"><p>${data.title}</p></h2>
            <div class="genre"><h4>Genre:&nbsp;</h4> <p>${data.genre}</p></div>
            <div class="runtime"><h4>Speltid:&nbsp;</h4> <p>${
              data.length + ' minuter'
            }</p></div>
            <div class="story"><h4>Handling:&nbsp;</h4> ${
              data.description
            }</div>
>>>>>>> Stashed changes
          </div>
        </section>`;
  }

  removingUnwantedLastComma(data, genreString) {
    for (let i = 0; i < data.genre.length; i++) {
      if (i === data.genre.length - 1) {
        genreString += data.genre[i];
      } else {
        genreString += data.genre[i] + ', ';
      }
    }
    return genreString;
  }

  eventHandler() {
    $('body').on('change', '.movie-filter', () => {
      this.reRenderMovies($('#category-filter').val(), $('#age-filter').val());
      this.disableAgeSelector();
      this.disableCategorySelector();
    });
  }

<<<<<<< Updated upstream
  disableAgeSelector() {
    $('#age-filter > option').each(function () {
      $(this).prop('disabled', false);
    });
    let categoryChoice = $('#category-filter').val();
    let genreAge = [];
    this.movies.forEach((movie) => {
      if (movie.genre.includes(categoryChoice)) {
        if (!genreAge.includes(movie.ageRating)) {
          genreAge.push(movie.ageRating);
        }
      }
    });
    genreAge.sort((a, b) => a - b);
    $('#age-filter > option').each(function () {
      if (this.value < genreAge[0]) {
        $(this).prop('disabled', true);
      } else if (
        !genreAge.includes('barntillåten') &&
        this.value === 'barntillåten' &&
        genreAge.length !== 0
      ) {
        $(this).prop('disabled', true);
      }
    });
  }
  disableCategorySelector() {
    $('#category-filter > option').each(function () {
      $(this).prop('disabled', false);
    });
    let ageChoice = $('#age-filter').val();
    let ageCategory = [];
    this.movies.forEach((movie) => {
      if (ageChoice === 'barntillåten') {
        ageChoice = 1;
      }
      if (movie.ageRating <= ageChoice || isNaN(parseFloat(movie.ageRating))) {
        movie.genre.forEach((data) => {
          if (!ageCategory.includes(data)) {
            ageCategory.push(data);
          }
        });
      }
    });
    $('#category-filter > option').each(function () {
      if (!ageCategory.includes(this.value)) {
        if (this.value !== 'default') {
          $(this).prop('disabled', true);
        }
      }
    });
=======
    html += '</div></div>';
    return html;
>>>>>>> Stashed changes
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

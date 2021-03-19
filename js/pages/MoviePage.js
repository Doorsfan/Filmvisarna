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
    let allGenres = [];
    let ageRating = [];
    let sortedAgeRating = [];

    if (!this.movies) {
      await this.read();
    }
    let html = this.addingCategorySelectorToHtml();

    this.listingAllGenresFromJson(allGenres);

    html = this.addingGenresToHtml(allGenres, html);

    html = this.addingAgeSelectorToHtml(html);

    sortedAgeRating = this.listingAllAgeRatingsFromJson(ageRating);

    html = this.addingAgeRatingToHtml(sortedAgeRating, html);

    html = this.addingDivToMovieInfo(html);

    this.movies.forEach((data) => {
      html = this.addingMovieInfoToHtml(data, html);
    });

    html = this.closingMovieInfo(html);

    return html;
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

  closingMovieInfo(html) {
    html += '</div></div>';
    return html;
  }

  addingDivToMovieInfo(html) {
    html += /*html*/ `
    </select>
    </div>
    <div class="movies-main-box">`;
    return html;
  }

  addingCategorySelectorToHtml() {
    return /*html*/ `
    <div class="movie-container"><h1>Våra filmer</h1><div class="movie-filter">
    <select id="category-filter">
    <option value="default">Genre</option>`;
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

  addingAgeRatingToHtml(sortedAgeRating, html) {
    sortedAgeRating.forEach((age) => {
      html += /*html*/ `<option value="${age}">${age}</option>`;
    });
    return html;
  }

  addingAgeSelectorToHtml(html) {
    html += /*html*/ `
    </select>
    <select id="age-filter">
    <option value="default">Åldersgrupp</option>`;
    return html;
  }

  addingGenresToHtml(allGenres, html) {
    allGenres.forEach((genre) => {
      html += /*html*/ ` <option value="${genre}">${genre}</option> `;
    });
    return html;
  }

  listingAllAgeRatingsFromJson(ageRating) {
    this.movies.forEach((movie) => {
      if (ageRating.includes(movie.ageRating)) {
      } else {
        ageRating.push(movie.ageRating);
      }
    });
    let sortedAgeRating = ageRating.slice().sort((a, b) => a - b);
    return sortedAgeRating;
  }

  listingAllGenresFromJson(allGenres) {
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

  eventHandler() {
    $('body').on('change', '.movie-filter', () => {
      this.movieFilter.reRenderMovies(
        $('#category-filter').val(),
        $('#age-filter').val()
      );
    });
  }
}

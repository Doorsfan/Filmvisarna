<<<<<<< Updated upstream
import MoviePage from '../pages/MoviePage.js';

=======
>>>>>>> Stashed changes
export default class filterMovies {
  async reRenderMovies(category, age) {
    this.movies = await $.getJSON('/json/movies.json');
    if (age === 'default') {
      age = 18;
    }
    let html = '';
    let filteredMovies = [];
<<<<<<< Updated upstream
    let movieAge = '';
    this.movies.forEach((movie) => {
      if (isNaN(parseFloat(movie.ageRating))) {
        movieAge = movie.ageRating;
      } else {
        movieAge = parseInt(movie.ageRating);
      }
      console.log(movieAge);
=======
    this.movies.forEach((movie) => {
      let movieAge = parseInt(movie.ageRating);
>>>>>>> Stashed changes
      if (
        (movieAge <= age && movie.genre.includes(category)) ||
        (movieAge <= age && category === 'default') ||
        (movieAge <= age && movie.genre == category)
      ) {
        filteredMovies.push(movie);
      }
    });
    filteredMovies.forEach((data) => {
<<<<<<< Updated upstream
      let genreString = '';
      genreString = this.removingUnwantedLastComma(data, genreString);
=======
>>>>>>> Stashed changes
      html += /*html*/ `<section class="movie-info">
          <div class="movie-poster">
            <a href="#aboutPage${data.id}"><img src="${data.images[0]}"></a>
          </div>
          <div class="movie-text">
            <h2 class="title-name"><p>${data.title}</p></h2>
<<<<<<< Updated upstream
            <div class="genre"><h4>Genre: </h4> <p>${genreString}</p></div>
            <div class="runtime"><h4>Speltid: </h4> <p>${
=======
            <div class="genre"><h4>Genre:&nbsp;</h4> <p>${data.genre}</p></div>
            <div class="runtime"><h4>Speltid:&nbsp;</h4> <p>${
>>>>>>> Stashed changes
              data.length + ' minuter'
            }</p></div>
            <div class="story"><h4>Handling:&nbsp;</h4> ${
              data.description
            }</div>
          </div>
        </section>`;
    });
    html += '</div></div>';
    $('.movies-main-box').html(' ');
    $('.movies-main-box').append(html);
  }
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
}

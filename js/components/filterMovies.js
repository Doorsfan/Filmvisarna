export default class filterMovies {
  async reRenderMovies(category, age) {
    this.movies = await $.getJSON('/json/movies.json');
    if (age === 'default') {
      age = 18;
    }
    let html = '';
    let filteredMovies = [];
    this.movies.forEach((movie) => {
      let movieAge = parseInt(movie.ageRating);
      if (
        (movieAge <= age && movie.genre.includes(category)) ||
        (movieAge <= age && category === 'default') ||
        (movieAge <= age && movie.genre == category)
      ) {
        filteredMovies.push(movie);
      }
    });
    filteredMovies.forEach((data) => {
      html += /*html*/ `<section class="movie-info">
          <div class="movie-poster">
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
          </div>
        </section>`;
    });
    html += '</div></div>';
    $('.movies-main-box').html(' ');
    $('.movies-main-box').append(html);
  }
}

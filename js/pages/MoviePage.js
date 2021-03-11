export default class MoviePage {
  async fetchmoviesInfo() {
    let movies;
    await $.getJSON('/json/movies.json', (data) => {
      movies = data;
    });
    renderMovies(movies);
  }

  renderMovies(data) {
    $('body').append('<div class="movie-container"></div>');
    data.forEach((data) => {
      let html = $(/*html*/ `
        <section class="movie-info">
          <div class="movie-poster">
            <img src="${data.images[0]}" style="height: 100px">
          </div>
          <div class="movie-text">
            <h3 class="title-name">${data.title}
            </h3>
            <p><h4>Genre:</h4> ${data.genre}</p>
            <p><h4>Speltid:</h4> ${data.length + ' minuter'}</p>
            <h4>Handling:</h4> ${data.description}
          </div><hr>
        </section>
  `);
      $('.movie-container').append(html);
    });
  }
}

fetchmoviesInfo();

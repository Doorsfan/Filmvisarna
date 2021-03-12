export default class MoviePage {
  constructor() {
    console.log('Creating instance');
    this.fetchmoviesInfo();
  }

  async fetchmoviesInfo() {
    let movies;
    await $.getJSON('/json/movies.json', (data) => {
      movies = data;
    });
    console.log(movies);
  }

  render() {
    let html;
    console.log('rendering');
    $('body').append('<div class="movie-container"></div>');
    movies.forEach((data) => {
      html += $(/*html*/ `
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
      return html;
    });
  }
}

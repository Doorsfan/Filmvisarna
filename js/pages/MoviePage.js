export default class MoviePage {
  constructor() {
    console.log('Creating movie page');
  }

  async read() {
    this.movies = await $.getJSON('/json/movies.json');
    console.log(this.movies);
  }

  async render() {
    console.log('rendering');
    if (!this.movies) {
      await this.read();
    }
    let html = $('<div class="movie-container">');

    // $('body').append('<div class="movie-container"></div>');
    console.log(this.movies);
    this.movies.forEach((data) => {
      html.append(/*html*/ `
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
    });
    html.append('</div>');
    console.log(html);

    //
    return $('body').append(html);
  }
}

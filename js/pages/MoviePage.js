export default class MoviePage {
  constructor() {}

  async read() {
    this.movies = await $.getJSON('/json/movies.json');
  }

  async render() {
    if (!this.movies) {
      await this.read();
    }
    let html = '<div class="movie-container">';
    this.movies.forEach((data) => {
      html += /*html*/ `<section class="movie-info">
          <div class="movie-poster">
            <a href="#aboutPage${data.id}"><img src="${
        data.images[0]
      }" style="height: 100px"></a>
          </div>
          <div class="movie-text">
            <h3 class="title-name">${data.title}
            </h3>
            <h4>Genre:</h4> <p>${data.genre}</p>
            <h4>Speltid:</h4> <p>${data.length + ' minuter'}</p>
            <h4>Handling:</h4> ${data.description}
          </div><hr>
        </section>`;
    });

    html += '</div>';
    return html;
  }
}

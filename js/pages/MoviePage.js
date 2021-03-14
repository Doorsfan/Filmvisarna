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
            <h2 class="title-name"><p>${data.title}</p></h2>
            <div class="genre"><h4>Genre:&nbsp;</h4> <p>${
              data.genre
            } &emsp;</p></div>
            <div class="runtime"><h4>Speltid:&nbsp;</h4> <p>${
              data.length + ' minuter'
            }</p></div>
            <h4>Handling:&nbsp;</h4> ${data.description}
          </div>
        </section>`;
    });

    html += '</div>';
    return html;
  }
}

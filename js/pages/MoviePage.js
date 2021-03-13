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
          <figure class="movie-poster">
              <a href="#"><img src="${data.images[0]}" alt=""></a>
          </figure>
          <div class="movie-text">
            <h2 class="title-name"><p>${data.title}</p></h2>
            <h4>Genre:&nbsp;</h4> <p>${data.genre} &emsp;</p>
            <h4>Speltid:&nbsp;</h4> <p>${data.length + ' minuter'}</p>
            <h4>Handling:&nbsp;</h4> ${data.description}
          </div>
        </section>`;
    });

    html += '</div>';
    return html;
  }
}

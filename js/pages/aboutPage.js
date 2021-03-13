export default class AboutPage {
  constructor(movieTitle) {
    this.movieTitle = movieTitle;
    this.movie;
  }

  async read() {
    this.movies = await $.getJSON('/json/movies.json');
    await Promise.all(
      this.movies.map(async (data) => {
        if (data.id === this.movieTitle) {
          this.movie = await data;
          return;
        }
      })
    );
  }

  createPage() {
    let html = $(/*html*/ `<div class ="about-container"></div>`);
    html.append(/*html*/ `
    <div class="trailer">
      <iframe width="420" height="315"
      src="https://www.youtube.com/embed/${this.movie.youtubeTrailers}"></iframe>
    </div>
    <div class="about-text">
      <p>Titel: ${this.movie.title}</p>
      <p>Genre: ${this.movie.genre}</p>
      <p>Produktions år: ${this.movie.productionYear}</p>
      <p>Språk: ${this.movie.language}</p>
      <p>Skådespelare: ${this.movie.actors}</p>
      <p>Director: ${this.movie.director}</p>
      ${this.movie.description}
    </div>
    <div class="movie-posters"></div>
    `);
    return html;
  }

  async render() {
    if (!this.movies) {
      await this.read();
    }

    return this.createPage();
  }
}

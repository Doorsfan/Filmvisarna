import DisplaySpecificShow from '../components/DisplayNextShow.js';

export default class AboutPage {
  constructor(movieID) {
    this.movieID = movieID;
  }

  //Ask alex if its confusing
  async read() {
    this.movies = await $.getJSON('/json/movies.json');
    await Promise.all(
      this.movies.map(async (data) => {
        if (data.id === this.movieID) {
          this.movie = await data;
          return;
        }
      })
    );
    this.displayShow = await new DisplaySpecificShow(this.movieID).render();
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
      <p>Regissör: ${this.movie.director}</p>
      ${this.movie.description}
    </div>
    <div class="movie-posters">
    <a href="#aboutPage${this.movie.id}"><img src="${this.movie.images[0]}" height="100px"></a>
    </div>
    
    `);
    return html;
  }

  async render() {
    if (!this.movies) {
      await this.read();
    }
    return this.createPage().append(this.displayShow);
  }
}

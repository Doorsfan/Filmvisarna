import DisplaySpecificShow from '../components/DisplayNextShow.js';

export default class AboutPage {
  constructor(movieID) {
    this.movieID = movieID;
  }

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
    let length = this.timeConvert(this.movie.length);
    let html = $(/*html*/ `<div class ="about-container"></div>`);
    html.append(/*html*/ `
    <div class="trailer">
      <iframe width="420" height="315"
      src="https://www.youtube.com/embed/${this.movie.youtubeTrailers}"></iframe>
    </div>
<<<<<<< Updated upstream
    <div class="about-info">
      <p>TITEL</p><h3> ${this.movie.title}</h3>
      <p>GENRE</p><p> ${this.movie.genre}</p>
      <p>LAND</p><p> ${this.movie.productionCountries}</p>
      <p>PRODUKTIONSÅR</p><p> ${this.movie.productionYear}</p>
      <p>SPRÅK</p><p> ${this.movie.language}</p>
      <p>SKÅDESPELARE</p><p> ${this.movie.actors}</p>
      <p>LÄNGD</p><p> ${length}</p>
      
    </div>
    <div class="movie-story">
      <p>${this.movie.description}</p>
=======
    <div class="about-text">
      <p>Titel: ${this.movie.title}</p>
      <p>Genre: ${this.movie.genre}</p>
      <p>Land: ${this.movie.productionCountries}</p>
      <p>Produktionsår: ${this.movie.productionYear}</p>
      <p>Språk: ${this.movie.language}</p>
      <p>Skådespelare: ${this.movie.actors}</p>
      <p>Regissör: ${this.movie.director}</p>
      <p>Längd: ${length}</p>
      
    </div>
    <div class="movie-posters">
    <a href="#aboutPage${this.movie.id}"><img src="${this.movie.images[0]}"></a>
    <a href="#aboutPage${this.movie.id}"><img src="${this.movie.images[0]}"></a>
    <a href="#aboutPage${this.movie.id}"><img src="${this.movie.images[0]}"></a>
    <a href="#aboutPage${this.movie.id}"><img src="${this.movie.images[0]}"></a>
>>>>>>> Stashed changes
    </div>
    
    `);
    return html;
  }

  timeConvert(n) {
    let num = n;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return `${rhours}tim ${rminutes}min`;
  }

  async render() {
    if (!this.movies) {
      await this.read();
    }
    return this.createPage().append(this.displayShow);
  }
}

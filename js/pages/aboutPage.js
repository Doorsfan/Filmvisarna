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
    let review = '';
    this.movie.reviews.map((data) => {
      review += /*html*/ `
        <div class="reveiw-box">
          <div>
            ${data.quote} - ${data.source}
          </div>
          <div>
            ${data.stars} / ${data.max} ⭐️
          </div>
        </div >
          `;
    });

    let html = $(/*html*/ `<div class ="about-container"></div>`);
    html.append(/*html*/ `
    <div class="trailer">
    <iframe width="420" height="315"
    src="https://www.youtube.com/embed/${this.movie.youtubeTrailers}"></iframe>
    </div>
    <div class="about-info_container">
    <div class="about-info">
        <p>Titel:</p><p> ${this.movie.title}</p>
        <p>Genre:</p><p> ${this.movie.genre}</p>
        <p>Land:</p><p> ${this.movie.productionCountries}</p>
        <p>Produktionsår:</p><p> ${this.movie.productionYear}</p>
        <p>Språk:</p><p> ${this.movie.language}</p>
        <p>Skådespelare:</p><p> ${this.movie.actors}</p>
        <p>Längd:</p><p> ${Math.floor(this.movie.length / 60)}
        tim ${this.movie.length % 60}min</p>  
      </div>
      <div class="movie-reviews">${review}</div>
      <div class="movie-disc">
      ${this.movie.description}
      </div>
    </div>
    <hr class="separator"/>
      <div class="movie-pictures">
      <div class="container">
      <img src="${this.movie.pictures[0]}">
        <div class="middle">
    <div class="text">${this.movie.title}</div>
  </div>
  </div>
  <div class="container">
      <img src="${this.movie.pictures[1]}">
        <div class="middle">
    <div class="text">${this.movie.title}</div>
  </div>
  </div>

  <div class="container">
      <img src="${this.movie.pictures[2]}">
        <div class="middle">
    <div class="text">${this.movie.title}</div>
  </div>
  </div>

  <div class="container">
      <img src="${this.movie.pictures[3]}">
        <div class="middle">
    <div class="text">${this.movie.title}</div>
  </div>
  </div>

  <div class="container">
      <img src="${this.movie.pictures[4]}">
        <div class="middle">
    <div class="text">${this.movie.title}</div>
  </div>
  </div>
      </div>
    <hr class="separator"/>
    <div class="next-show">Boka direkt</div>

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

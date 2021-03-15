import filterMovies from '../components/filterMovies.js';
export default class MoviePage {
  constructor() {}

  async read() {
    this.movies = await $.getJSON('/json/movies.json');
  }
  // Mikael bygger HTMLen som ska returnas enligt MoviePage strukturens HTML i Render
  // Martin skapar Två dropdown menyer - en för Ålder och en för Kategori
  // Martin eller Mikael fixar till det movies.json - stämmer av när vi känner att det ska göras
  // Martin OCH Mikael gör logiken för change listener till Dropdown meny tillsamans

  async render() {
    //Implement default case handling in terms of Category - so like,
    // if !($('myHypotheticalDropdown') == '') {
    //   return new filterMovies().render($('myHypotheticalDropdown'));
    // }

    if (!this.movies) {
      await this.read();
    }
    let html = /*html*/ `<div class="movie-container"><h1>Våra filmer</h1><div class="movie-filter">
    <select id="#category-filter"><option>Genre</option>
    <option value="drama">drama</option>
    <option value="">brott</option>
    <option value="">komedi</option>
    </select>
    <select id="#age-filter"><option>Åldersgrupp</option>
    <option value="">-7</option>
    <option value="">7+</option>
    <option value="">15+</option>
    </select>
    </div>`;

    this.movies.forEach((data) => {
      html += /*html*/ `<section class="movie-info">
          <div class="movie-poster">
            <a href="#aboutPage${data.id}"><img src="${data.images[0]}"></a>
          </div>
          <div class="movie-text">
            <h2 class="title-name"><p>${data.title}</p></h2>
            <div class="genre"><h4>Genre:&nbsp;</h4> <p>${
              data.genre
            } &emsp;</p></div>
            <div class="runtime"><h4>Speltid:&nbsp;</h4> <p>${
              data.length + ' minuter'
            }</p></div>
            <div class="story"><h4>Handling:&nbsp;</h4> ${
              data.description
            }</div>
          </div>
        </section>`;
    });

    html += '</div>';
    return html;
  }
}

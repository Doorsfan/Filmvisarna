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

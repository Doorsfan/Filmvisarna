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
    // if !($('myCategoryDropdown').length == 0 && $('myAgeDropdown').length == 0) {
    //   return new filterMovies().renderByAgeAndCategory($('myCategoryDropdown'),$('myAgeDropdown'));
    // }
    // else if !($('myCategoryDropdown').length == 0){
    //   return new filterMovies().renderByCategory($('myCategoryDropdown'));
    // }
    // else if !($('myAgeDropdown').length == 0){
    //   return new filterMovies().renderByAge($('myAgeDropdown'));
    // }

    if (!this.movies) {
      await this.read();
    }
    let html = /*html*/ `<div class="movie-container"><h1>Våra filmer</h1><div class="movie-filter">
    <select id="category-filter">
    <option value="default">Genre</option>
    <option value="Drama">Drama</option>
    <option value="Brott">Brott</option>
    <option value="Komedi">Komedi</option>
    <option value="Romans">Romans</option>
    <option value="Ädventyr">Ädventyr</option>
    <option value="Familjefilm">Familjefilm</option>
    <option value="Skräck">Skräck</option>
    <option value="Mysterium">Mysterium</option>
    </select>
    <select id="age-filter">
    <option value="default">Åldersgrupp</option>
    <option value="6">6</option>
    <option value="14">14</option>
    <option value="18">18</option>
    </select>
    </div>
    <div class="movies-mainBox">`;

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

    html += '</div></div>';
    return html;
  }
}

$('body').on('change', '#category-filter', () => {
  if ($('#category-filter').val() !== "default" && $('#age-filter').val() !== "default") {
    new filterMovies().renderByAgeAndCategory($('#category-filter').val(), $('#age-filter').val());
  }
  else {
    new filterMovies().renderByCategory($('#category-filter').val());  
  }
  
});

$('body').on('change', '#age-filter', () => {
  if ($('#category-filter').val() !== 'default' && $('#age-filter').val() !== 'default') {
    new filterMovies().renderByAgeAndCategory($('#category-filter').val(), $('#age-filter').val());
  }
  else {
    new filterMovies().renderByAge($('#age-filter').val());
    
  }
})

async function renderByCategory(category) {
  let html = '<div class="movie-container">';
  let myMovies = await $.getJSON('/json/movies.json'); //Is run in the background, is not waited for
  for (const myFile of myMovies) {
    //for of loop to Force Synchronized iteration in Asynch Context
    myMovies.forEach((data) => {
      if (Array.isArray(data.genre)) {
        data.genre.forEach((genre) => {
          //Genre: ['Drama', 'Crime']
          if (genre == category) {
            // 'Drama', 'Crime'
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
          }
        });
      } else {
        if (data.genre == category) {
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
        }
      }
    });
  }
  html += '</div>';
  console.log('i was run');
  return html;
}
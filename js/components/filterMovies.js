export default class filterMovies {
  async renderByAge(age) {
    let html = '';
    this.myMovies = await $.getJSON('/json/movies.json');
    for (const data of this.myMovies) {
      //for of loop to Force Synchronized iteration in Asynch Context
      let movieAge = parseInt(data.ageRating);
      let wantedAge = parseInt(age);
      // Searched at 14 - Should show 4,6,14
      if (movieAge <= wantedAge) {
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
      }
    }
    console.log(html);
    $('.movies-main-box').html('');
    $('.movies-main-box').append(html);
  }

  async renderByAgeAndCategory(category, age) {
    let html = '';
    this.myMovies = await $.getJSON('/json/movies.json');
    for (const data of this.myMovies) {
      //for of loop to Force Synchronized iteration in Asynch Context
      let movieAge = parseInt(data.ageRating);
      let wantedAge = parseInt(age);
      if (Array.isArray(data.genre)) {
        data.genre.forEach((genre) => {
          if (genre == category && movieAge <= wantedAge) {
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
          }
        });
      } else {
        if (data.genre == category && movieAge <= wantedAge) {
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
        }
      }
    }

    $('.movies-main-box').html('');
    $('.movies-main-box').append(html);
  }

  async renderByCategory(category) {
    let html = '';
    this.myMovies = await $.getJSON('/json/movies.json');
    for (const data of this.myMovies) {
      //for of loop to Force Synchronized iteration in Asynch Context
      if (Array.isArray(data.genre)) {
        data.genre.forEach((genre) => {
          if (genre === category) {
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
          }
        });
      } else {
        if (data.genre == category) {
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
        }
      }
    }
    $('.movies-main-box').html('');
    $('.movies-main-box').append(html);
  }
}

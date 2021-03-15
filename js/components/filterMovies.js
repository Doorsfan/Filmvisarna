export default class filterMovies {
  async renderByAge(age) {
    let html = '<div class="movie-container">';
    this.myMovies = await $.getJSON('/json/movies.json'); //Is run in the background, is not waited for
    for (const data of this.myMovies) {
      //for of loop to Force Synchronized iteration in Asynch Context

        let movieAge = parseInt(data.ageRating);
        let wantedAge = parseInt(age);
        // Searched at 14 - Should show 4,6,14
        if (movieAge <= wantedAge) {
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
    html += '</div>';
    $('.movies-mainBox').html('');
    $('.movies-mainBox').append(html);
  }

  async renderByAgeAndCategory(category,age) {
    let html = '<div class="movie-container">';
    this.myMovies = await $.getJSON('/json/movies.json'); //Is run in the background, is not waited for
    for (const data of this.myMovies) {
      //for of loop to Force Synchronized iteration in Asynch Context
      let movieAge = parseInt(data.ageRating);
      let wantedAge = parseInt(age);
      if (Array.isArray(data.genre)) {
        data.genre.forEach((genre) => {
          //Genre: ['Drama', 'Crime']
          if (genre == category && movieAge <= wantedAge) {
            // 'Drama', 'Crime'
            html += /*html*/ `<section class="movie-info">
                <div class="movie-poster">
                  <a href="#aboutPage${data.id}"><img src="${data.images[0]
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
      }
      else {
        if (data.genre == category && movieAge <= wantedAge) {
          html += /*html*/ `<section class="movie-info">
              <div class="movie-poster">
                <a href="#aboutPage${data.id}"><img src="${data.images[0]
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
    }
    html += '</div>';
    $('.movies-mainBox').html('');
    $('.movies-mainBox').append(html);
  }

  async renderByCategory(category) {
    let html = '<div class="movie-container">';
    this.myMovies = await $.getJSON('/json/movies.json'); //Is run in the background, is not waited for
    for (const data of this.myMovies) {
      //for of loop to Force Synchronized iteration in Asynch Context
      if (Array.isArray(data.genre)) {
        data.genre.forEach((genre) => {
          //Genre: ['Drama', 'Crime']
          if (genre === category) {
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
      //end of for loop
    }
    html += '</div>';
    $('.movies-mainBox').html('');
    $('.movies-mainBox').append(html);
  }
}

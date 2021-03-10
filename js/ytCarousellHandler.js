fetchYoutubeRef();

async function fetchYoutubeRef() {
  let movie;
  await $.getJSON('/json/movies.json', (data) => {
    movie = data;
  });
  renderTrailer(movie);
}

// needed for debugging
function renderTrailer(data) {
  //variable to use
  let html = $(`<div class="video-slider"></div>`);

  data.forEach((movie) => {
    html.append(`
    <div class="slide">
      <iframe class"video" src="https://www.youtube.com/embed/${movie.youtubeTrailers[0]}?enablejsapi=1" frameborder="0"></iframe>
      </div>
  `);
  });
  html.append(`
  <div class="slide-arrow left"></div>
  <div class="slide-arrow right"></div>
  `);
  //rendering
  $('body').prepend(html);
}

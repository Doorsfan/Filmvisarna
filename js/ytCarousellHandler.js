fetchYoutubeRef();

async function fetchYoutubeRef() {
  let movie;
  await $.getJSON('/json/movies.json', (data) => {
    movie = data;
  });
  renderTrailer(movie);
}

function renderTrailer(data) {
  //variable to use
  let html = $(`<div class="video-slider"></div>`);

  data.forEach((movie) => {
    html.append(`
    <div class="slide">
      <iframe class="video" src="https://www.youtube.com/embed/${movie.youtubeTrailers}?ecver=2&enablejsapi=1" frameBorder="0"></iframe>
      </div>
  `);
  });
  html.append(`
  <div class="slide-arrow left"></div>
  <div class="slide-arrow right"></div>
  `);

  $('body').prepend(html);
}
$(document).ready(function () {
  // Additionnal code for the slider
  let pos = 0;
  let slides;
  let numOfSlides;

  function nextSlide(slides) {
    slides.eq(pos).animate({ left: '-100%' }, 500);
    pos = pos >= numOfSlides - 1 ? 0 : ++pos;
    slides.eq(pos).css({ left: '100%' }).animate({ left: 0 }, 500);
  }

  function previousSlide() {
    slides.eq(pos).animate({ left: '100%' }, 500);
    pos = pos == 0 ? numOfSlides - 1 : --pos;
    slides.eq(pos).css({ left: '-100%' }).animate({ left: 0 }, 500);
  }

  $('body').on('click', '.left', function (e) {
    slides = $('.slide');
    numOfSlides = slides.length;
    onYouTubeIframeAPIReady();
    // stopCurrentVideo(slides);
    previousSlide();
  });
  $('body').on('click', '.right', function (e) {
    slides = $('.slide');
    numOfSlides = slides.length;
    onYouTubeIframeAPIReady();
    // stopCurrentVideo(slides);
    nextSlide(slides);
  });
});

function onYouTubeIframeAPIReady() {
  $('.slide').each(function (index, slide) {
    // Get the `.video` element inside each `.slide`
    let iframe = $(slide).find('.video')[0];
    // Create a new YT.Player from the iFrame, and store it on the `.slide` DOM object
    slide.video = new YT.Player(iframe);
  });
}

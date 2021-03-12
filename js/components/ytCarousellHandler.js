// Additionnal code for the slider

export default class ytSlider {
  render(data) {
    let html = $(/*html*/ `<div class="video-slider">`);

    data.forEach((movie) => {
      html.append(/*html*/ `
    <div class="slide">
      <iframe class="video" src="https://www.youtube.com/embed/${movie.youtubeTrailers[0]}?ecver=2&enablejsapi=1" frameBorder="0"></iframe>
      </div>
  `);
    });
    html.append(/*html*/ `
  <div class="slide-arrow left"></div>
  <div class="slide-arrow right"></div>
  </div>
  `);

    return html;
  }
}
let slides, numOfSlides;
let pos = 0;

$('body').on('click', '.left', function (e) {
  slides = $('.slide');
  this.numOfSlides = slides.length;
  // onYouTubeIframeAPIReady(slides);
  // stopCurrentVideo(slides);
  previousSlide(slides);
});

$('body').on('click', '.right', function (e) {
  slides = $('.slide');
  numOfSlides = slides.length;
  // onYouTubeIframeAPIReady(slides);
  // stopCurrentVideo(slides);
  nextSlide(slides);
});

function previousSlide() {
  slides.eq(pos).animate({ left: '100%' }, 500);
  // "loop"
  pos = pos == 0 ? numOfSlides - 1 : --pos;
  slides.eq(pos).css({ left: '-100%' }).animate({ left: 0 }, 500);
}
function nextSlide(slides) {
  slides.eq(pos).animate({ left: '-100%' }, 500);
  // "loop"
  pos = pos >= numOfSlides - 1 ? 0 : ++pos;
  slides.eq(pos).css({ left: '100%' }).animate({ left: 0 }, 500);
}

// Additionnal code for the slider

export default class ytSlider{
pos = 0;
 slides;
 numOfSlides;
fetchYoutubeRef();

async  fetchYoutubeRef() {
  let movie = await $.getJSON('/json/movies.json', (data) => {});
}

 renderTrailer(data) {
  let html = $(`<div class="video-slider"></div>`);

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
  `);

  $('body').prepend(html);

}

 nextSlide(slides) {
  slides.eq(pos).animate({ left: '-100%' }, 500);
  // "loop"
  pos = pos >= numOfSlides - 1 ? 0 : ++pos;
  slides.eq(pos).css({ left: '100%' }).animate({ left: 0 }, 500);
}

 previousSlide() {
  slides.eq(pos).animate({ left: '100%' }, 500);
  // "loop"
  pos = pos == 0 ? numOfSlides - 1 : --pos;
  slides.eq(pos).css({ left: '-100%' }).animate({ left: 0 }, 500);
}

}

$('body').on('click', '.left', function (e) {
  slides = $('.slide');
  numOfSlides = slides.length;
  // onYouTubeIframeAPIReady(slides);
  // stopCurrentVideo(slides);
  previousSlide();
});

$('body').on('click', '.right', function (e) {
  slides = $('.slide');
  numOfSlides = slides.length;
  // onYouTubeIframeAPIReady(slides);
  // stopCurrentVideo(slides);
  nextSlide(slides);
});

//youtubeAPI
// function onYouTubeIframeAPIReady(slides) {
//   $(slides).each(function (index, slide) {
//     // Get the `.video` element inside each `.slide`
//     let iframe = $(slide).find('.video')[0];
//     // Create a new YT.Player from the iFrame, and store it on the `.slide` DOM object
//     slide.video = new YT.Player(iframe);
//   });



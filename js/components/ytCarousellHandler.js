// Additionnal code for the slider

export default class ytSlider {
  render(data) {
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

    return html;
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

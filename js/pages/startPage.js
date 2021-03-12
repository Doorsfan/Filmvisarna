import ytSlider from '../components/ytCarousellHandler.js';

export default class StartPage {
  constructor() {
    this.addEventHandelers();
  }

  async read() {
    this.movies = await $.getJSON('/json/movies.json');
    console.log(this.movies);
  }

  async render() {
    console.log('rendering start page');
    if (!this.movies) {
      await this.read();
    }
    return $('body').prepend(new ytSlider().render(this.movies));
  }

  addEventHandelers() {
    $('body').on('click', '.left', function (e) {
      slides = $('.slide');
      numOfSlides = slides.length;
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

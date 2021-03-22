// Additionnal code for the slider

export default class ytSlider {
  constructor() {
    this.eventHandler();
    this.pos = 0;
  }

  eventHandler() {
    $('main').on('click', '.slide-arrow', () => {
      event.target.className.includes('left')
        ? this.previousSlide()
        : this.nextSlide();
    });
  }
  render(data) {
    let html = $(/*html*/ `<div class="video-slider">`);

    data.forEach((movie) => {
      html.append(/*html*/ `
    <div class="slide">
      <iframe class="video" src="https://www.youtube.com/embed/${movie.youtubeTrailers[0]}?ecver=2&enablejsapi=1" frameBorder="0" allowfullscreen></iframe>
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

  previousSlide() {
    let slides = $('.slide');
    let numOfSlides = slides.length;
    slides.eq(this.pos).animate({ left: '100%' }, 500);
    // "loop"
    this.pos = this.pos == 0 ? numOfSlides - 1 : --this.pos;
    slides.eq(this.pos).css({ left: '-100%' }).animate({ left: 0 }, 500);
  }
  nextSlide() {
    let slides = $('.slide');
    let numOfSlides = slides.length;
    slides.eq(this.pos).animate({ left: '-100%' }, 500);
    // "loop"
    this.pos = this.pos >= numOfSlides - 1 ? 0 : ++this.pos;
    slides.eq(this.pos).css({ left: '100%' }).animate({ left: 0 }, 500);
  }
}

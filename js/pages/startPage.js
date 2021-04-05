import ytSlider from '../components/ytCarousellHandler.js';

export default class StartPage {
  constructor() {
    this.yt = new ytSlider();
  }

  async read() {
    this.movies = await $.getJSON('/json/movies.json');
  }

  async render() {
    if (!this.movies) {
      await this.read();
    }

    let allMovies = '';
    let blinkingPosts = '';
    let bestMovies = '';
    let counter = 1;
    let currentSlide = 0;
    let ytSlider = await this.yt.render(this.movies);

    this.movies.forEach((data) => {
      blinkingPosts += /*html*/ `
          <div class="start-poster ${data.id}">
            <a href="#aboutPage/${data.id}">
                <img src="${data.images[0]}">
                <div class="start-poster--backdrop">Mer</div>
            </a>
          </div>
      `;

      allMovies += /*html*/ `
        <div class="slideshow-slide">
        <img class="embezzle" src="../../images/embezzle.png"/>
          <a href="#aboutPage/${data.id}">
            <img class="slideshow-image" src="${data.images[0]}" alt="nyckeln till frihet" />
            <aside class="slide-aside">
              <p>${data.title}</p>
              <h3>SPELAS NU</h3>
              <p>${data.reviews[0].quote}<br> - ${data.reviews[0].source}</p>
              <img class="smoke" src="../../images/smoke.png"/>
            </aside>
          </a>
        </div>
      `;

      if (counter < 6) {
        bestMovies += /*html*/ `
          <li class="toplist-listitem">
           <a href="#aboutPage/${data.id}">
             <span class="bestof-span">${counter}.</span>
             <img class="bestof-img" src="${data.images[0]}"/>
             <div class="start-poster--backdrop">Mer</div>
             </a>
          </li>
        `;
        counter++;
      }
    });
    let timer = '';

    let showSlides = function () {
      let slides = $('.slideshow-slide');

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }

      if (window.location.hash === '#startPage') {
        slides[currentSlide].style.display = 'flex';
        if (currentSlide != slides.length - 1) {
          currentSlide++;
        } else {
          currentSlide = 0;
        }
      } else {
        return;
      }
      timer = setTimeout(showSlides, 4000);
    };

    $('main').on('input', '.slider', (el) => {
      let width = document
        .querySelector('.poster-container')
        .getBoundingClientRect().width;
      let ratio = 1700 - width;
      ratio = ratio / 100;
      $('.relic').css('marginLeft', `-${el.target.value * ratio}px`);
    });

    $('main').on('input', '.slider2', (el) => {
      let width = document
        .querySelector('.bestof-container')
        .getBoundingClientRect().width;
      let ratio = 1500 - width;
      ratio = ratio / 100;
      $('.bestof-ul').css('marginLeft', `-${el.target.value * ratio}px`);
    });

    let setupObserver = function () {
      let posterContainer = document.querySelector('.poster-container');
      let bestofContainer = document.querySelector('.bestof-container');

      console.log(posterContainer);

      const obsOptions = {
        root: null,
        threshold: 0.15,
      };

      const obsCallBack = function (entries, observer) {
        const [entry] = entries;
        console.log(entry);

        if (!entry.isIntersecting) return;

        entry.target.classList.remove('element--hidden');
        observer.unobserve(entry.target);
      };

      const observer = new IntersectionObserver(obsCallBack, obsOptions);
      observer.observe(posterContainer);
      observer.observe(bestofContainer);
    };

    $('main').load('load', showSlides);

    setTimeout(setupObserver, 3000);

    return `
      <div class="big-container">
        <div class="startpage-infobar">
          <p>Välkommen! <br> Filmvisarnas Biografer håller för tillfället öppet, trots nuvarande coronapandemi.</p>
        </div>
        <div class="startpage-coverphoto"></div>
        <div class="startpage-skew"></div>
        <div class="slideshow-container">
          ${allMovies}
        </div>
        <h2 class="ourmovies-title">VÅRA FILMER</h2>
        <div class="poster-container element--hidden">
          ${blinkingPosts}
        </div>
        <input type="range" min="1" max="100" value="1" class="slider" id="myRange">
        <h2 class="bestmovies-title">BÄST I BETYG</h2>
        <div class="bestof-container element--hidden">
          <ul class="bestof-ul">
          ${bestMovies}
          </ul>
        </div>
        <input type="range" min="1" max="100" value="1" class="slider2" id="myRange">
        <div class="video-container">
          <h3>FILMTRAILERS</h3>
          ${ytSlider[0].outerHTML}
          <img class="trailer-seats" src="../../images/movieseats.png"/>
        </div>
      </div>
    `;
  }
}

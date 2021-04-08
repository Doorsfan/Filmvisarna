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
      let ratio = 1270 - width;
      ratio = ratio / 100;
      if (el.target.value >= 100) {
        $('.arrowAnim').css('display', 'none');
      } else {
        $('.arrowAnim').css('display', 'block');
      }
      $('.relic').css('marginLeft', `-${el.target.value * ratio}px`);
    });

    $('main').on('input', '.slider2', (el) => {
      let width = document
        .querySelector('.bestof-container')
        .getBoundingClientRect().width;
      let ratio = 1140 - width;
      ratio = ratio / 100;
      if (el.target.value >= 100) {
        $('.arrowAnim').css('display', 'none');
      } else {
        $('.arrowAnim').css('display', 'block');
      }
      $('.bestof-ul').css('marginLeft', `-${el.target.value * ratio}px`);
    });

    let setupObserver = function () {
      let posterContainer = document.querySelector('.poster-container');
      let bestofContainer = document.querySelector('.bestof-container');
      let videoContainer = document.querySelector('.video-container');

      console.log(posterContainer);

      const obsOptions = {
        root: null,
        threshold: 0.15,
      };

      const obsCallBack = function (entries, observer) {
        const [entry] = entries;

        if (!entry.isIntersecting) return;

        entry.target.classList.remove('element--hidden');
        observer.unobserve(entry.target);
      };

      const observer = new IntersectionObserver(obsCallBack, obsOptions);
      observer.observe(posterContainer);
      observer.observe(bestofContainer);
      observer.observe(videoContainer);
    };

    $('main').load('load', showSlides);

    setTimeout(setupObserver, 3000);

    return /*html*/ `
      <div class="big-container">
        <div class="startpage-coverphoto"></div>
        <img src="../../images/smoke2.png" class="smoke2"/>
        <div class="startpage-skew"></div>
        <div class="startpage-skew2"></div>
        <div class="slideshow-container">
          ${allMovies}
        </div>
        <section class="section-all_movies">
          <h2 class="ourmovies-title">VÅRA FILMER<img src="../../images/popcorn2.png" class="popcorn" /></h2>
          <div class="poster-container element--hidden">
          <div class="arrowAnim">
            <div class="arrowSliding">
              <div class="arrow"></div>
            </div>
            <div class="arrowSliding delay1">
              <div class="arrow"></div>
            </div>
            <div class="arrowSliding delay2">
              <div class="arrow"></div>
            </div>
            <div class="arrowSliding delay3">
              <div class="arrow"></div>
            </div>
          </div> 
            ${blinkingPosts}
            <div class="carousel-shadow"></div>
          </div>
          <input type="range" min="1" max="100" value="1" class="slider" id="myRange">
        </section>
        <section class="section-best_movies">
          <h2 class="bestmovies-title">BÄST I BETYG<img src="../../images/trophy.png" class="popcorn" /></h2>
          <div class="bestof-container element--hidden">
          <div class="arrowAnim">
            <div class="arrowSliding">
              <div class="arrow"></div>
            </div>
            <div class="arrowSliding delay1">
              <div class="arrow"></div>
            </div>
            <div class="arrowSliding delay2">
              <div class="arrow"></div>
            </div>
            <div class="arrowSliding delay3">
              <div class="arrow"></div>
            </div>
          </div> 
            <ul class="bestof-ul">
            ${bestMovies}
            </ul>
            <div class="carousel-shadow"></div>
          </div>
          <input type="range" min="1" max="100" value="1" class="slider2" id="myRange">
        </section>
          <div class="video-container element--hidden">
            <h3>FILMTRAILERS<img src="../../images/movie.png" class="popcorn" /></h3>
            ${ytSlider[0].outerHTML}
          </div>
          <div class="last-section"></div>
         <img class="trailer-seats" src="../../images/movieseats.png"/>
      </div>
    `;
  }
}

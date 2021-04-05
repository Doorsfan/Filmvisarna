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

    let slider = document.getElementById('myRange');
    //  output = document.getElementById('demo');
    // output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    $('main').on('input', '.slider', (el) => {
      console.log(el.target.value);
      260;
      $('.relic').css('marginLeft', `-${el.target.value * 2}px`);
    });
    // slider.oninput = function () {
    //   output.innerHTML = this.value;
    // };

    $('main').load('load', showSlides);

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
        <div class="poster-container">
          ${blinkingPosts}
        </div>
        <input type="range" min="1" max="100" value="1" class="slider" id="myRange">
        <h2 class="bestmovies-title">BÄST I BETYG</h2>
        <div class="bestof-container">
          <ul>
          ${bestMovies}
          </ul>
        </div>
        <input type="range" min="1" max="100" value="1" class="slider" id="myRange">
        <div class="video-container">
          <h3>FILMTRAILERS</h3>
          ${ytSlider[0].outerHTML}
        </div>
      </div>
    `;
  }
}

import ytSlider from '../components/ytCarousellHandler.js';

export default class StartPage {
  constructor() {
    this.yt = new ytSlider();
  }

  async read() {
    this.movies = await $.getJSON('/json/movies.json');
  }

  async render() {
    let sliderContainer1 = '';
    let posterContainer = '';
    let bestList = '';
    let counter = 1;
    let currentSlide = 0;

    if (!this.movies) {
      await this.read();
    }

    let movz = [];
    this.movies.forEach((movie) => {
      movz.push(movie);
    });

    console.log(movz);

    this.movies.forEach((data) => {
      posterContainer += /*html*/ `
        <div class="start-poster ${data.id}">
          <a href="#aboutPage/${data.id}"><img src="${data.images[0]}"></a>
        </div>
      `;

      sliderContainer1 += /*html*/ `
        <div class="slideshow-slide">
          <a href="#aboutPage/${data.id}">
            <img src="${data.images[0]}" alt="nyckeln till frihet" />
            <aside class="slide-aside">
              <p>${data.title}</p>
              <h3>SPELAS NU</h3>
              <p>${data.reviews[0].quote}<br> - ${data.reviews[0].source}</p>
            </aside>
          </a>
        </div>
      `;

      if (counter < 6) {
        bestList += /*html*/ `
          <li class="toplist-listitem">
           <a href="#aboutPage/${data.id}">
             <span class="bestof-span">${counter}.</span>
             <img class="bestof-img" src="${data.images[0]}"/>
            </a>
          </li>
        `;
        counter++;
      }
    });

    $('main').load('load', showSlides);

    let ytSlider = await this.yt.render(this.movies);

    function showSlides() {
      let slides = document.getElementsByClassName('slideshow-slide');

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }

      slides[currentSlide].style.display = 'flex';
      if (currentSlide != slides.length - 1) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }
      setTimeout(showSlides, 4000);
    }

    return `
      <div class="big-container">
        <div class="startpage-infobar">
          <p>Välkommen! <br> Filmvisarnas Biografer håller för tillfället öppet, trots nuvarande coronapandemi.</p>
        </div>
        <div class="startpage-coverphoto"></div>
        <div class="startpage-skew"></div>
        <h1 class="h1-aktuellt">AKTUELLT</h1>
        <div class="slideshow-container">
          ${sliderContainer1}
        </div>
        <h2 class="ourmovies-title">VÅRA FILMER</h2>
        <div class="poster-container">
          ${posterContainer}
        </div>
        <h2 class="bestmovies-title">BÄST I BETYG</h2>
        <div class="bestof-container">
          <ul>
          ${bestList}
          </ul>
        </div>
        <div class="video-container">
          <h3>FILMTRAILERS</h3>
          ${ytSlider[0].outerHTML}
        </div>
      </div>
    `;
  }
}

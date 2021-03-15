import ytSlider from '../components/ytCarousellHandler.js';

export default class StartPage {
  constructor() {
    this.yt = new ytSlider();
  }

  async read() {
    this.movies = await $.getJSON('/json/movies.json');
  }

  async render() {
    let currentSlide = 0;

    if (!this.movies) {
      await this.read();
    }
    let startPage = $(/*html*/ `<div class="big-container"></div>`);
    startPage.append(`<div class="startpage-infobar"><p>Välkommen! <br> Filmvisarnas Biografer håller för tillfället öppet, trots nuvarande coronapandemi.</p></div>
      <div class="startpage-coverphoto"></div>
       <div class="startpage-skew"></div>
       <h1 class="h1-aktuellt">AKTUELLT</h1>
      `);
    let html1 = $(
      /*html*/
      `<div class="startpage-infobar"><p>Välkommen! <br> Filmvisarnas Biografer håller för tillfället öppet, trots nuvarande coronapandemi.</p></div>
      <div class="startpage-coverphoto"></div>
       <div class="startpage-skew"></div>
       <h1 class="h1-aktuellt">AKTUELLT</h1>
      `
    );
    // startPage.append(html1);

    let html3 = $('<div class="poster-container"></div>');
    this.movies.forEach((data) => {
      console.log(data);
      html3.append(/*html*/ `
          <div class="start-poster ${data.id}">
            <a href="#aboutPage${data.id}"><img src="${data.images[0]}"></a>
          </div>
        `);
    });

    let html5 = $(/*html*/ `
      <div class="slideshow-container">
        <div class="slideshow-slide"><a href="#aboutPagenyckeln"><img src="/images/movie_posters/nyckeln_till_frihet_poster1.jpg" alt="nyckeln till frihet" /><aside class="slide-aside"><p>NYCKELN TILL FRIHET</p><h3>SPELAS NU</h3><p>"En av världens bästa filmer"<br> - Moviezine.se</p></aside></a></div>
        <div class="slideshow-slide"><a href="#aboutPagerelic"><img src="/images/movie_posters/relic.jpg" alt="relic" /><aside class="slide-aside"><p>RELIC</p><h3>SPELAS NU</h3><p>"Skräck som bäst!"<br> - Ginza</p></aside></a></div>
        <div class="slideshow-slide"><a href="#aboutPagepatersson"><img src="/images/movie_posters/paterson.jfif" alt="paterson" /><aside class="slide-aside"><p>PATERSON</p><h3>SPELAS NU</h3><p>”Jim Jarmusch,<br> den lakoniska humorns specialist”<br> - DN</p></aside></a></div>
        <div class="slideshow-slide"><a href="#aboutPageharry"><img src="/images/movie_posters/harry_potter1.jpg" alt="harry potter" /><aside class="slide-aside"><p>HARRY POTTER</p><h3>SPELAS NU</h3><p>"En film för generationer!"<br> - Sydsvenskan</p></aside></a></div>
        <div class="slideshow-slide"><a href="#aboutPagegudfadern"><img src="/images/movie_posters/the_godfather.jpg" alt="godfather" /><aside class="slide-aside"><p>THE GODFATHER</p><h3>SPELAS NU</h3><p>"En äkta klassiker som förvarats genom tiden"<br> - DN </p></aside></a></div>
        <div class="slideshow-slide"><a href="#aboutPageonkel"><img src="/images/movie_posters/min_onkel_1.jpg" alt="onkel" /><aside class="slide-aside"><p>MON ONCLE</p><h3>SPELAS NU</h3><p>"Unforgettably funny, <br>wonderfully observed, <br>and always technically brilliant."<br>- Time Out</p></aside></a></div>
        </div>
      </div>
    `);
    startPage.append(html5);

    let html2 = $(
      `<h2 style="font-size: 3rem; text-align: center; margin-bottom: 2rem;">VÅRA FILMER</h2>`
    );
    startPage.append(html2);

    startPage.append(html3);

    let html4 = $(/*html*/ `
    <h2 style="text-align: center; font-size: 3rem; margin-top: 15rem;margin-bottom: 2rem;">BÄST I BETYG</h2>
    <div class="bestof-container">
      <ul style="display: flex; justify-content: center;">
        <li class="toplist-listitem"><a href="#aboutPagenyckeln"><span class="bestof-span">1.</span><img class="bestof-img" src="/images/movie_posters/nyckeln_till_frihet_poster1.jpg"/></a></li> 
        <li class="toplist-listitem"><a href="#aboutPagerelic"><span class="bestof-span">2.</span><img class="bestof-img" src="/images/movie_posters/relic.jpg"/></a></li>
        <li class="toplist-listitem"><a href="#aboutPagepatersson"><span class="bestof-span">3.</span><img class="bestof-img" src="/images/movie_posters/paterson.jfif"/></a></li>
        <li class="toplist-listitem"><a href="#aboutPageharry"><span class="bestof-span">4.</span><img class="bestof-img" src="/images/movie_posters/harry_potter1.jpg"/></a></li>
        <li class="toplist-listitem"><a href="#aboutPagegudfadern"><span class="bestof-span">5.</span><img class="bestof-img" src="/images/movie_posters/the_godfather.jpg"/></a></li>
      </ul>
    </div>
    `);

    startPage.append(html4);

    let ytSlider = this.yt.render(this.movies);
    let sliderContainer = $(
      /*html*/ `<div class="video-container"><h3>FILMTRAILERS</h3></div>`
    );
    sliderContainer.append(ytSlider);
    startPage.append(sliderContainer);

    $('main').load('load', showSlides);

    function showSlides() {
      let slides = document.getElementsByClassName('slideshow-slide');

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }

      slides[currentSlide].style.display = 'block';
      if (currentSlide != slides.length - 1) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }
      setTimeout(showSlides, 2000);
    }

    return startPage;
  }
}

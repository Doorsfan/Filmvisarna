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

    // let sliderContainer = $('');
    // let ytSlider = this.yt.render(this.movies);
    // console.log(ytSlider);
    // sliderContainer += ytSlider;

    $('main').load('load', showSlides);

    let sliderContainer = $(
      /*html*/ `<div class="video-container"><h3>FILMTRAILERS</h3></div>`
    );
    let ytSlider = await this.yt.render(this.movies);
    sliderContainer.append(ytSlider);

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
      < class="big-container">
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
          ${sliderContainer[0].outerHTML}
      </div>
    `;

    //FRÅGOR
    //1. VARFÖR KAN JAG INTE SPRÄNGA IN JQUERY OBJEKTET, UTAN MÅSTE APPENDA DEN... OCH HUR LÖSER JAG DET DÅ SÅ JAG KAN SPRÄNGA IN DEN?
    //2. ÄR DENNA TYP AV KODSTUKTUR BÄTTRE SOM JAG NU HAR ORGANISERAT TEXTEN? --
    //3. HUR RESIZAR JAG TEXT SÅ DEN INTE BLIR FÖR STOR I EN CONTAINER (MEDIA-QUERIES)
    //4. JAG SKAPAR JU MINDRE JQUERY OBJEKT I DENNA TYPEN OCH LÄGGER RENT HTML I VARIBLER, ÄR DETTA OKEJ ELLER VILL JAG ANVÄNDA MIG AV JQUERY ISTÄLLET
    //5. ÄR DET LUGNT MED MINA MEDIA-QUERIES? ÄR DET CHILL ATT LÖSA SÅ MÅNGA SAKER?
  }
}
// ${ytSlider}

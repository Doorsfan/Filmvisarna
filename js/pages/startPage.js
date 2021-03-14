import ytSlider from '../components/ytCarousellHandler.js';

export default class StartPage {
  constructor() {
    this.yt = new ytSlider();
  }

  async read() {
    this.movies = await $.getJSON('/json/movies.json');
  }

  async readSchedule() {
    this.movieSchedule = await $.getJSON('/json/movieSchedule.json');
  }

  //ugly code
  async render() {
    let currentSlide = 0;
    console.log('rendering StartPage');
    if (!this.movies && !this.movieschedule) {
      await this.read();
      await this.readSchedule();
    }
    let bigDiv = $(/*html*/ `<div class="big-container"></div>`);
    let html1 = $(
      /*html*/
      `<div class="startpage-coverphoto"></div>
       <div class="startpage-skew"></div>
       <h1 class="h1-aktuellt">AKTUELLT</h1>
       <hr class="startpage-divider"/>`
    );
    bigDiv.append(html1);

    let ytSlider = this.yt.render(this.movies);
    let sliderContainer = $(/*html*/ `<div class="video-container"></div>`);
    sliderContainer.append(ytSlider);
    bigDiv.append(sliderContainer);

    //let startP = sliderContainer.add(html);
    let html2 = $(
      `<h2 style="font-size: 5rem; text-align: center;">Våra Filmer</h2>`
    );
    bigDiv.append(html2);

    // let movieInfo = [];
    let html3 = $('<div class="poster-container"></div>');
    this.movies.forEach((data) => {
      // movieInfo.push(data);
      html3.append(/*html*/ `
          <div class="start-poster ${data.id}">
            <a href="#aboutPage${data.id}"><img src="${data.images[0]}"></a>
          </div>
        `);
    });

    bigDiv.append(html3);

    let html4 = $(/*html*/ `
    <h2 style="text-align: center; font-size: 5rem; margin-top: 15rem;">Bäst i Betyg</h2>
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

    bigDiv.append(html4);

    let html5 = $(/*html*/ `
      <div class="slideshow-container">
        <div class="slideshow-slide"><img src="/images/movie_posters/nyckeln_till_frihet_poster1.jpg" alt="nyckeln till frihet" /></div>
        <div class="slideshow-slide"><img src="/images/movie_posters/relic.jpg" alt="relic" /></div>
        <div class="slideshow-slide"><img src="/images/movie_posters/paterson.jfif" alt="paterson" /></div>
        <div class="slideshow-slide"><img src="/images/movie_posters/harry_potter1.jpg" alt="harry potter" /></div>
        <div class="slideshow-slide"><img src="/images/movie_posters/the_godfather.jpg" alt="godfather" /></div>
        <div class="slideshow-slide"><img src="/images/movie_posters/min_onkel_1.jpg" alt="onkel" /></div>
        </div>
      </div>
    `);
    bigDiv.append(html5);

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

    return bigDiv;
  }
}

// for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = 'none';
//     }
//     slideIndex++;
//     if (slideIndex > slides.length) {
//       slideIndex = 1;
//     }
//     slides[slideIndex - 1].style.display = 'block';
//     setTimeout(showSlides, 2000); // Change image every 2 seconds
//   }
// let html5 = $(
//   /*html*/
//   `
//  <h3 class="startpage-saloonheading">Spelas idag</h3>
//   <div class="startpage-saloons">
//     <div class="startpage-saloon">
//       <h3>Savannen</h3>
//       <div class="saloon-container">

//       </div>
//     </div>
//     <div class="startpage-saloon"><h3>Lilla Paris</h3></div>
//   </div>
//   `
// );

// this.movieSchedule.map((item) => {
//   let savannen = [];
//   let lillaParis = [];

//   if (
//     item.auditorium === 'Savannen' &&
//     item.date === new Date().toLocaleDateString()
//   ) {
//     console.log(item.date);
//     console.log(new Date().toLocaleDateString());
//   }
// });

// console.log('FILMSCHEMA');
// console.log(this.movieSchedule);

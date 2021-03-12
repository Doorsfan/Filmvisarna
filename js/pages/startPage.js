import ytSlider from '../components/ytCarousellHandler.js';

export default class StartPage {
  yt = new ytSlider();

  async read() {
    this.movies = await $.getJSON('/json/movies.json');
  }

  async render() {
    console.log('rendering start page');
    if (!this.movies) {
      await this.read();
    }

    //append the body, this is where we change where!
    return $('.main').append(this.yt.render(this.movies));
  }
}

export default class AboutPage {
  async read() {
    this.movies = await $.getJSON('/json/movies.json');
  }

  async createPage() {
    if (!this.movies) {
      await read();
    }
  }
}

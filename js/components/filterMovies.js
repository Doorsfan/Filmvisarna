export default class filterMovies {
  filterCategory(category) {
    this.read(category);
  }
  async read(category) {
    let html = '/*html*/ `';
    this.myMovies = await $.getJSON('/json/movies.json'); //Is run in the background, is not waited for
    for (const myFile of this.myMovies) {
      this.myMovies.forEach((element) => {
        if (Array.isArray(element.genre)) {
          element.genre.forEach((genre) => { //Genre: ['Drama', 'Crime']
            if (genre == category) { // 'Drama', 'Crime'
              console.log(
                'Found a match for the movie of: ' +
                element.title +
                ' based on the genre of: ' +
                genre
              );
            }
          });
        } else {
          if (element.genre == category) {
            console.log(
              'Found a match for the movie of: ' +
              element.title +
              ' based on the genre of: ' +
              category
            );
          }
        }
      });
    }
  }
}

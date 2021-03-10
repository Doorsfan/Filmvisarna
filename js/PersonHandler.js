export default class PersonHandler {

  constructor(app) {
    this.changeListener = app.changeListener;
    this.addEventHandlers();
    this.read();
  }

  addEventHandlers() {
    // Listen to clicks on the add person button => run addPerson
    $('body').on('click', '.add-person', () => this.addPerson());
    // Listen to changes to persons.json => run read
    this.changeListener.on('persons.json', () => this.read());
  }

  async read() {
    // Read data from a JSON file
    this.persons = await JSON._load('persons.json');
    console.log('Read');
    console.table(this.persons);
    // Render
    this.render();
  }

  render() {
    // Render the list of persons to the DOM
    // (Note: You don't have to re-render the whole DOM
    // but we do it here since this is a small test app)
    $('body').html(`<h1>Persons</h1>`);
    for (let person of this.persons) {
      $('body').append(`<h3>${person.name}</h3>`);
    }
    // And an add button...
    $('body').append(`
      <button class="add-person">Add person</button>
    `);
  }

  async addPerson() {
    let name = prompt('The name of the new person:');
    // Add the person to the list
    this.persons.push({ name }); // (short for {name: name})
    // Save the data to a JSON file
    await JSON._save('persons.json', this.persons);
    console.log('Saved');
    console.table(this.persons);
  }

}
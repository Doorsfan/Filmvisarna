export default class PeoplePage {

  constructor(changeListener) {
    this.changeListener = changeListener;
    this.addEventHandlers();
    this.read();
  }

  addEventHandlers() {
    // Listen to clicks on the add person button => run addPerson
    $('body').on('click', '.add-person', () => this.addPerson());
    // Listen to changes to persons.json => run read
    this.changeListener.on('persons.json', () => this.reRender());
  }

  async read() {
    // Read data from a JSON file
    this.persons = await JSON._load('persons.json');
    console.log('Read');
    console.table(this.persons);
  }

  // custom method for rerendering without route change
  reRender(){
      this.read();
     $('main').html(this.render());
  }

  // standard method for rendering, called from the router
  render() {
    if(this.persons){
        // Render the list of persons
        return `
            <h1>Persons</h1>
            ${this.persons.map(person => `<h2>${person.name}</h2>`).join('')}
            <button class="add-person">Add person</button>
        `;
    }else{
        // custom solution for when this page is loaded on browser refresh
        setTimeout(()=>{
            this.reRender()
        },0)
    }
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
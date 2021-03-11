export default class PersonHandler {
  //When we create a instance of the PersonHandler class, we call it's Constructor
  //just like in Java - however, we also pass in the App variable, which is basically
  //the server instance - that we append eventListeners to - such as changes to modifications
  //of Json files
  constructor(app) {
    this.changeListener = app.changeListener; //Assign a "change" listener to be used for JSON files, so when
    //JSON is changed, the app will be aware of this change - removing the need to restart the server or re-read the JSON

    this.addEventHandlers(); //A function that attaches evenhandlers to JSON files - basically, this is the function
    //that is responsible for handling what to do based on changes in the JSON files OR adding event handlers for the
    //HTML elements - such as clicking, changing in a navbar, writing in a text field, etc.

    this.read(); //This is an async function that fetches data from a JSON file - in this case, we treat it
    //as a chain of events - with Start the PersonHandler Object -> Read from a JSON file -> Render the data
    //So, if you want to read from OUR OWN Json files, like Movies, Bookings, etc. - You make a similar structure
    //but instead read from our JSON files - so, you'd write movieSchedule.json instead of persons.json in the
    //read() function
  }

  addEventHandlers() {
    // Access the Body element in the HTML, find the element with the id of "add-person", on a click on said
    //element - run the function of addPerson() - The css selector for said item comes before the name, so:
    // ID SELECTOR - #myDiv (In HTML <div id="myDiv"></div>)
    // CLASS SELECTOR - .myDiv (In HTML <div class="myDiv"></div>)
    // The CLASS SELECTOR applies to ALL classes of the HTML structure - so .add-person, would find
    // ALL elements with the class="add-person" tag.
    //
    //DO NOTE - HTML can have several classes to them, and you can specify a more specific class
    //notation with jquery - such as:
    //
    // MULTIPLE CLASS SELECTOR - .myFirstClass.mySecondClass (in HTML <div class="myFirstClass mySecondClass")
    $('body').on('click', '.add-person', () => this.addPerson());
    // This binds a ChangeListener to a JSON file - and assigns so that the read() function is called, when
    //a change occurs.
    // In this case, it is assigned to persons.json - and runs the read() function when a change is detected.
    // To add a changeListener for the JSON we use - just change the name to, for instance, bookings.json
    // or whatever you wish to listen to being changed.
    this.changeListener.on('persons.json', () => this.read());
  }

  //This function is bound to a changeListener - and will be run every time a change is detected
  //in the file it is bound to - for instance, persons.json
  async read() {
    // Here we read in the data from persons.jsos with await JSON._load - and assign it to a variable
    // we call persons - that is bound to the PersonHandler Object with this
    this.persons = await JSON._load('persons.json');
    console.log('Read');
    console.table(this.persons); //You can format data in a prettier format, such as JSON, with console.table, to get
    // a nicer format of it
    // This is the function that renders the elements - in this instance, it will reset the entire HTML of the body
    // element - but could be modified to render whatever suits your needs.
    this.render();
  }

  render() {
    /*
    // Render the list of persons to the DOM
    // (Note: You don't have to re-render the whole DOM
    // but we do it here since this is a small test app)
    $('body').html(`<h1>Persons</h1>`); //Access the innerHTML of the body element in the HTML document
    //NOTE: We use `` backticks to allow for putting in variables from JS into the HTML
    for (let person of this.persons) { //Go through the JSON data
      $('body').append(`<h3>${person.name}</h3>`); //Append the persons name based on the JSON data
      //By using `` we can use Javascript variables and insert them into HTML
    }
    // And an add button...
    $('body').append(`
      <button class="add-person">Add person</button> 
    `);
    */
  }

  async addPerson() {
    let name = prompt('The name of the new person:'); //Prompt is a text input prompt that comes up
    // Add the person to the list
    this.persons.push({ name }); // (short for {name: name})
    // Save the data to a JSON file
    await JSON._save('persons.json', this.persons); //Saves all the data to the JSON file called persons.json
    // NOTE: Saving to a JSON file will save ALL the data to the File in one step - it does not APPEND.
    // If you save only ONE piece of Data, it will OVERWRITE EVERYTHING AND REPLACE IT WITH THAT 1 ELEMENT.
    console.log('Saved');
    console.table(this.persons);
  }
}

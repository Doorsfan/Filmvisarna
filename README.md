### What is this? 
This small skeleton/scaffold does the following:
1) Adds the methods JSON._load(file) and JSON._save(file,data) to the built-in JSON object.
2) Adds a change listener for listening to file changes. This can be used for hot reloads but also to detect when json files changes (bookings etc).
3) Shows you good programming practices for how to write object oriented code in JavaScript by dividing your program into classes.
4) Has a small example of reading and writing to JSON files as well as listening to when they change in the *js/PersonHandler.js* file

### How to use
1) Install Node.js,  https://nodejs.org/en/, preferably current version.
2) Run **npm install** in the terminal (in VSC - Visual Studio Code) ONCE! This will create the folder **node_modules**. You can reach the Terminal by choosing Terminal in the main menu!
3) Run **node index** in the terminal in (VSC) to start your project
4) To stop the server, press *Ctrl+C* (or close the VSC window)

### How to use in your Git project
1) Make sure that you have *.gitignore*-file with node_modules included on a separate line.
Copy the files and the file structure (but not the node_modules folder) to the root folder of your git project. Push and commit!

##### Please Note: 
When you start to work on writing a booking system or something similar: Be smart about how you divide your json into different files. For example: You could store personal account settings in separate json files named after the username... (If a file does not exist it will be created when using JSON._save). And you code store bookings for a certain event in a file with the name of the event (may constructed by place + time?). If you are smart about this you will have much less json to load for ONE specific user!

*Also note:* Not for production but for learning and prototyping frontend applications without having to deal with backend and databases!

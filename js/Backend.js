module.exports = class Backend { //Exports the Backend Class so it can be used in other classes with imports

  constructor() { //The constructor of the Class
    this.loadDependencies(); //Load the dependencies of the project
    this.basePath = this.path.join(__dirname, '../'); //Set up the Base System Path to be the Current Working Dir
    this.startServer(); //Start the Server
    this.changeNotify(); //Handle event handlers based on Requests to the Server
  }

  //Here we load the Dependencies for the project:
  //Express: A lightweight Server plugin to run a local server
  //open: A plugin for opening images, browsers, URLs etc.
  //chokidar: A plugin for handling file change listening
  //jsonflex: A json stringifier/parser
  //path: A plugin that helps with handling System paths and working with Working Dirs
  loadDependencies(d =
    ['express', 'open', 'chokidar', 'jsonflex', 'path'] //The dependencies
  ) {
    d.forEach(x => this[x] = require(x)); //In JS, we use require to mean "Force inclusion of this when running this script"
  }

  startServer() {
    this.app = this.express(); //Start up the Express Server
    this.app.use(this.express.static(this.basePath)); //Declare which path Express is to use for serving static content
    this.app.use(this.jsonflex({ //Utilize the JSON parser/JSON stringifier
      jsonDir: 'json' //The relative path to where the json files are
    }));
    this.app.listen(3000, () => //Open a server on the port of 3000
      console.log('Listening on port 3000'));
    this.open('http://127.0.0.1:3000'); //Open the URL of localhost with a target port of 3000
  }

  changeNotify() {
    let responses = []; //A list of responses
    this.app.get('/changes', (req, res) => { //Based on requests routed to the /changes path
      responses.push(res); //Push the response object to the responses Array
      req.on('close', () => { 
        let index = responses.indexOf(res);
        index >= 0 && responses.splice(index, 1);
      });
      res.writeHead(200, { //Write an Okay status for a response
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      });
    });
    this.chokidar.watch(this.basePath).on('change', path => { //handling change event propagation
      path = path.split(this.basePath)[1];
      path = 'data: ' + (path[0] === '/' ? path : '/' + path) + '\n\n';
      responses.forEach(x => x.write(path))
    });
  }

}
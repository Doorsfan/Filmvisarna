module.exports = class Backend {

  constructor() {
    this.loadDependencies();
    this.basePath = this.path.join(__dirname, '../');
    this.startServer();
    this.changeNotify();
  }

  loadDependencies(d =
    ['express', 'open', 'chokidar', 'jsonflex', 'path']
  ) {
    d.forEach(x => this[x] = require(x));
  }

  startServer() {
    this.app = this.express();
    this.app.use(this.express.static(this.basePath));
    this.app.use(this.jsonflex({
      jsonDir: 'json'
    }));
    this.app.listen(3000, () =>
      console.log('Listening on port 3000'));
    this.open('http://127.0.0.1:3000');
  }

  changeNotify() {
    let responses = [];
    this.app.get('/changes', (req, res) => {
      responses.push(res);
      req.on('close', () => {
        let index = responses.indexOf(res);
        index >= 0 && responses.splice(index, 1);
      });
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      });
    });
    this.chokidar.watch(this.basePath).on('change', path => {
      path = path.split(this.basePath)[1];
      path = 'data: ' + (path[0] === '/' ? path : '/' + path) + '\n\n';
      responses.forEach(x => x.write(path))
    });
  }

}
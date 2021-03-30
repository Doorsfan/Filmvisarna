export default class ChangeListener {
  constructor() {
    // Only allow one file listener instance
    if (ChangeListener.one) {
      throw new Error('Only create one ChangeListener instance!');
    }
    ChangeListener.one = true;
    // Connect to a SSE source that tells us when files changes
    this.eventSource = new EventSource('/changes');
    this.eventSource.onmessage = (event) => this.fileChange(event.data);
    // Memory for event handlers
    this.events = [];
  }

  // Register event handlers for listening on changes
  // to specific files
  on(file, object, func) {
    this.object = object;
    this.events.push({ file, func });
  }

  fileChange(filePath) {
    // Ignore changes in .git folder
    // (caused by git auto fetching)
    if (filePath.includes('.git')) {
      return;
    }
    // Loop through registered events and call them on file match
    let goBack = false;
    this.events.map(async ({ file, func }) => {
      let schedule = await JSON._load(file);

      schedule.forEach((show) => {
        if (show.film === this.object.film && show.date === this.object.date) {
          if (show.bookedSeats.length == this.object.bookedSeats.length) {
            console.log('For the show of ', show);
            console.log('There was a trigger to return');
            goBack = true;
            return;
          }
        }
      });
      if (goBack) {
        console.log('Should have returned in goback statement');
        return;
      }
      filePath.includes(file) && func();
    });
    // Note:
    // You SHOULD NOT reload the page for json files
    // that can be change usin JSON._save
    // For now: Do not reload on any json file changes

    if (filePath.slice(-5) === '.json') {
      return;
    }

    // Reload the page on changes (same behavior as LiveServer)
    if (!goBack) {
      console.log('reload');
      location.reload();
    }
  }
}

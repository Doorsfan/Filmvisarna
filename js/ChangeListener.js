export default class ChangeListener {

  constructor() {
    // Only allow one file listener instance
    if (ChangeListener.one) {
      throw (new Error('Only create one ChangeListener instance!'));
    }
    ChangeListener.one = true;
    // Connect to a SSE source that tells us when files changes
    this.eventSource = new EventSource("/changes");
    this.eventSource.onmessage = event => this.fileChange(event.data);
    // Memory for event handlers
    this.events = [];
  }

  // Register event handlers for listening on changes
  // to specific files
  on(file, func) {
    this.events.push({ file, func });
  }

  fileChange(filePath) {
<<<<<<< Updated upstream
    // Ignore changes in .git folder
    // (caused by git auto fetching)
=======
<<<<<<< HEAD
    // Ignoring changes in .git directory
=======
    // Ignore changes in .git folder
    // (caused by git auto fetching)
>>>>>>> main
>>>>>>> Stashed changes
    if (filePath.includes('.git')) {
      return;
    }
    // Loop through registered events and call them on file match
    this.events.forEach(({ file, func }) => {
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
    location.reload();
  }

}
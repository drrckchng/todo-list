export class Project {
  constructor(name) {
    this.name = name;
  }
  tasks = [];
  addTask(task) {
    this.tasks.push(task);
  }
  // Method to rename setter?
}

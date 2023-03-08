export class Task {
  constructor(name, desc, date, starred) {
    this.name = name;
    this.desc = desc;
    this.date = date;
    this.starred = starred;
  }
  tasks = [];
  addTask(task) {
    tasks.push(task);
  }
  // Method to check date
  // Method to change name
  // Method to change desc
}


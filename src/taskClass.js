let taskId = 0;
export class Task {
  constructor(name, desc, date, starred) {
    this.name = name;
    this.desc = desc;
    this.date = date;
    this.starred = starred;
    this.taskId = taskId;
    this.complete = false;
    taskId += 1;
  }
  toggleStarState = function() {
    this.starred = !starred;
  };
  rename = function(newName) {
    this.name = newName;
  };
  changeDesc = function(newDesc) {
    this.desc = newDesc;
  };
  changeDate = function(newDate) {
    this.date = newDate;
  }
}


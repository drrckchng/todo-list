let projectId = 0;

export class Project {
  constructor(name) {
    this.name = name;
    this.projectId = projectId;
    projectId += 1;
  }
  rename = function(newName) {
    this.name = newName;
  }
}

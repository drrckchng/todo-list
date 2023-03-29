import { Task } from './taskClass.js';
import { Project } from './projectClass.js';
import { addProjectDiv, deleteProjectForm } from './manipulateDOM.js';

export const projectsTracker = [];
export const tasksTracker = [];

export function createProject(name) {
  const project = new Project(name); // project name should be pulled from DOM on creation
  projectsTracker.push(project);
  addProjectDiv(project);
}

export function checkValidProject(event) {
  const projectName = event.target.form[0].value;
  if (projectName === "") {
    alert("Please enter a project name");
  } else {
    createProject(projectName);
    deleteProjectForm(event);
  }
  event.preventDefault();
}

// TODO: Add checkValidTask to check for valid task settings
export function checkValidTask(event) {
}

// TODO: Add a function call to delete all tasks matching projectId
export function deleteProject(index) {
  projectsTracker.splice(index, 1);
}

// TODO: Implement way to append task to a projetId
export function createTask(name, desc, date, starred, targetProjectId) {
  const task = new Task(name, desc, date, starred); // task properties pulled from DOM on creation
  // get currently selected project ID from DOM
  task.projectId = targetProjectId;
  tasksTracker.push(task);
}


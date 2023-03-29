import { Task } from './taskClass.js';
import { Project } from './projectClass.js';
import { addProjectDiv, deleteProjectForm, deleteTaskForm } from './manipulateDOM.js';
import { parse } from 'date-fns';

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
  const taskProperties = Array.from(event.target.form).splice(0, 4);
  const taskName = taskProperties[0].value;
  const taskDesc = taskProperties[1].value;
  const taskDate = taskProperties[2].value;
  const taskStarred = taskProperties[2].checked;
  if ((taskName !== "") && (taskDate !== "")) {
    const taskDateConvert = parse(taskDate); // convert date string to date object
    createTask(taskName, taskDesc, taskDateConvert, taskStarred, event.target.dataset.projectId);
    deleteTaskForm(event);
  } else {
    alert("Project name and date are required");
  }
  event.preventDefault();
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


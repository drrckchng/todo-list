import { Task } from './taskClass.js';
import { Project } from './projectClass.js';
import { addProjectDiv, deleteProjectForm, deleteTaskForm, renameProjectDiv } from './manipulateDOM.js';
import { parseISO } from 'date-fns';
import { filterProjectTasks } from './filter.js';

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

export function checkValidTask(event) {
  const taskProperties = Array.from(event.target.form).splice(0, 4);
  const taskName = taskProperties[0].value;
  const taskDesc = taskProperties[1].value;
  const taskDate = taskProperties[2].value;
  const taskStarred = taskProperties[3].checked;
  if ((taskName !== "") && (taskDate !== "")) {
    const taskDateConvert = parseISO(taskDate); // convert date string to date object
    createTask(taskName, taskDesc, taskDateConvert, taskStarred, parseInt(event.target.dataset.projectId));
    deleteTaskForm(event);
    filterProjectTasks(event)
    // document.querySelector(`[data-project-id='${event.target.dataset.projectId}']`).click();
  } else {
    alert("Project name and date are required");
  }
  event.preventDefault();
}

// TODO: Add function to rename project using class method
export function renameProject(event) {
  const newName = event.target.parentElement.parentElement.children[1].value;
  const projectId = parseInt(event.target.dataset.projectId);
  projectsTracker[projectId].rename(newName);
  renameProjectDiv(projectId, newName);
}

// TODO: Add a function call to delete all tasks matching projectId
export function deleteProject(index) {
  projectsTracker.splice(index, 1);
}

export function createTask(name, desc, date, starred, targetProjectId) {
  const task = new Task(name, desc, date, starred); // task properties pulled from DOM on creation
  // get currently selected project ID from DOM
  task.projectId = targetProjectId;
  tasksTracker.push(task);
}


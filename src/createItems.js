import { Task } from './taskClass.js';
import { Project } from './projectClass.js';
import { addProjectDiv, clickAllTasks, deleteProjectForm, deleteTaskForm, renameProjectDiv } from './manipulateDOM.js';
import { parseISO } from 'date-fns';
import { filterProjectTasks } from './filter.js';

export const projectsTracker = [];
export const tasksTracker = [];

// TODO: Update localStorage
function updateProjectsLocalStorage() {
  console.log("update projects ls");
}

function updateTasksLocalStorage() {
  console.log("update tasks ls");
}

export function createProject(name) {
  const project = new Project(name);
  projectsTracker.push(project);
  updateProjectsLocalStorage();
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
  let taskDesc = taskProperties[1].value;
  const taskDate = taskProperties[2].value;
  const taskStarred = taskProperties[3].checked;

  if (taskDesc === "") {
    taskDesc = "...";
  }

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

export function renameProject(event) {
  const newName = event.target.parentElement.parentElement.children[1].value;
  const projectId = parseInt(event.target.dataset.projectId);
  projectsTracker[projectId].rename(newName);
  renameProjectDiv(projectId, newName);
  updateProjectsLocalStorage();
}

export function deleteProject(projectId) {
  let index;
  for (let i = 0; i < projectsTracker.length; i++) {
    if (projectsTracker[i].projectId === projectId) {
      index = i;
    }
  }
  updateProjectsLocalStorage();
  projectsTracker.splice(index, 1);
  for (let i = tasksTracker.length - 1; i >= 0; i--) {
    if (tasksTracker[i].projectId === parseInt(projectId)) {
      tasksTracker.splice(i, 1);
    }
  }
  updateTasksLocalStorage();
  clickAllTasks();
}

export function deleteTask(targetTaskId) {
  for (let i = tasksTracker.length - 1; i >= 0; i--) {
    if (tasksTracker[i].taskId === targetTaskId) {
      tasksTracker.splice(i, 1);
    }
  }
  updateTasksLocalStorage();
}

export function createTask(name, desc, date, starred, targetProjectId) {
  const task = new Task(name, desc, date, starred); // task properties pulled from DOM on creation
  // get currently selected project ID from DOM
  task.projectId = targetProjectId;
  tasksTracker.push(task);
  updateTasksLocalStorage();
}


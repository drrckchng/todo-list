import { filterTasks } from './filter.js';

export function addListeners() {
  addFilterListeners();
  addProjectListener();
}

function addFilterListeners() {
  const filterTaskButtons = Array.from(document.querySelector(".side-bar .tasks").children);
  filterTaskButtons.forEach(function(button) {
    button.addEventListener("click", filterTasks);
  });
}

function addProjectListener() {
  const addProjectButton = document.querySelector(".projects li");
  // addProjectListener.addEventListener("click", newProject);
}

export function addProjectDiv(project) {
  const projectsList = document.getElementById("projects-list");
  const projectItem = document.createElement("div");
  projectsList.appendChild(projectItem);
  projectItem.textContent = project.name;
  projectItem.dataset.projectId = project.projectId;
  projectItem.classList.add("project-item");
  // add listener that will filter tasks that match project id
}

export function displayTask(tasks) {
  clearTasks();
  const taskArea = document.getElementById("displayed-tasks");
  tasks.forEach((task => {
    const taskDiv = document.createElement("div");
    createTaskItem(taskDiv, task.name);
    createTaskItem(taskDiv, task.desc);
    createTaskItem(taskDiv, task.date);
    createTaskItem(taskDiv, task.starred);
    taskArea.appendChild(taskDiv);
  }));
}

function createTaskItem(parent, property) {
  const taskProperty = document.createElement("p");
  taskProperty.textContent = property;
  parent.appendChild(taskProperty);
}

function clearTasks() {
  const taskArea = document.getElementById("displayed-tasks");
  taskArea.textContent = '';
}

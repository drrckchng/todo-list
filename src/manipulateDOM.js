import { filterTasks, filterProjectTasks } from './filter.js';

export function addListeners() {
  addFilterListeners();
}

function addFilterListeners() {
  const filterTaskButtons = Array.from(document.querySelector(".side-bar .tasks").children);
  filterTaskButtons.forEach(function(button) {
    button.addEventListener("click", filterTasks);
  });
}

// Add new project to the side bar
export function addProjectDiv(project) {
  const projectsList = document.getElementById("projects-list");
  const projectItem = document.createElement("div");
  projectsList.appendChild(projectItem);
  projectItem.textContent = project.name;
  projectItem.dataset.projectId = project.projectId; // Set custom dataset attribute
  projectItem.classList.add("project-item");

  projectItem.addEventListener("click", filterProjectTasks);
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

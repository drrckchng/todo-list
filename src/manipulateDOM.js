import { filterTasks, filterProjectTasks } from './filter.js';
import { checkValidProject } from './createItems.js';

export function addListeners() {
  const filterTaskButtons = Array.from(document.querySelector(".side-bar .tasks").children);
  filterTaskButtons.forEach(function(button) {
    button.addEventListener("click", filterTasks);
  });

  document.getElementById("add-project").addEventListener("click", addProjectForm);
}

function addProjectForm() {
  const projectsList = document.getElementById("projects-list");
  const projectForm = document.createElement("form");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Project name...");

  const confirmButton = document.createElement("input");
  confirmButton.setAttribute("type", "submit");
  confirmButton.setAttribute("value", "Add");
  confirmButton.addEventListener("click", checkValidProject)

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Cancel";
  deleteButton.addEventListener("click", deleteProjectForm);

  projectForm.append(input, confirmButton, deleteButton);

  projectsList.appendChild(projectForm);

}


export function deleteProjectForm(event) {
  event.target.parentElement.remove();
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


export function displayTask(tasks, targetProjectId) {
  clearTasks();
  const taskArea = document.getElementById("displayed-tasks");
  tasks.forEach((task => {
    const taskDiv = document.createElement("div");
    const properties = [task.name, task.desc, task.date, task.starred];
    properties.forEach(prop => {
      createTaskItem(taskDiv, prop);
    });
    taskArea.appendChild(taskDiv);
  }));

  const addTaskButton = document.createElement("button");
  addTaskButton.textContent = "Add task";
  const mainContentArea = document.querySelector(".main-content");
  mainContentArea.appendChild(addTaskButton);
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

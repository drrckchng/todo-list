import { filterTasks, filterProjectTasks } from './filter.js';
import { checkValidProject, checkValidTask } from './createItems.js';

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

function addNewTaskListener(button) {
  button.addEventListener("click", addTaskForm);
}

export function changeSectionHeader(header) {
  const sectionHeader = document.querySelector(".main-content .section");
  sectionHeader.textContent = ""; // Clear header
  sectionHeader.textContent = header;
}

// TODO: Refactor...
function addTaskForm(event) {
  const targetProjectId = parseInt(event.target.dataset.projectId);
  const displayedTasks = document.getElementById("displayed-tasks");
  const newTaskForm = document.createElement("form");

  const nameDiv = document.createElement("div");
  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "form-task-name");
  nameLabel.textContent = "Name:";
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("name", "taskName");
  nameInput.setAttribute("id", "form-task-name");
  nameDiv.append(nameLabel, nameInput);

  const descDiv = document.createElement("div");
  const descLabel = document.createElement("label");
  descLabel.setAttribute("for", "form-task-desc");
  descLabel.textContent = "Description:";
  const descInput = document.createElement("input");
  descInput.setAttribute("type", "text");
  descInput.setAttribute("name", "taskDesc");
  descInput.setAttribute("id", "form-task-desc");
  descDiv.append(descLabel, descInput);

  const dateDiv = document.createElement("div");
  const dateLabel = document.createElement("label");
  dateLabel.setAttribute("for", "form-task-date");
  dateLabel.textContent = "Date:";
  const dateInput = document.createElement("input");
  dateInput.setAttribute("type", "date");
  dateInput.setAttribute("name", "taskDate");
  dateInput.setAttribute("id", "form-task-date");
  dateDiv.append(dateLabel, dateInput);

  const starredDiv = document.createElement("div");
  const starredLabel = document.createElement("label");
  starredLabel.setAttribute("for", "form-task-starred");
  starredLabel.textContent = "Starred:";
  const starredInput = document.createElement("input");
  starredInput.setAttribute("type", "checkbox");
  starredInput.setAttribute("name", "taskStarred");
  starredInput.setAttribute("id", "form-task-starred");
  starredDiv.append(starredLabel, starredInput);

  const submitDiv = document.createElement("div");
  const submitInput = document.createElement("input");
  submitInput.setAttribute("type", "submit");
  submitInput.setAttribute("value", "Add");
  submitInput.setAttribute("id", "form-submit");
  submitInput.addEventListener("click", checkValidTask);
  submitInput.dataset.projectId = targetProjectId; // pass project id to attribute
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", deleteTaskForm)
  submitDiv.append(submitInput, cancelButton);

  newTaskForm.append(nameDiv, descDiv, dateDiv, starredDiv, submitDiv);
  displayedTasks.appendChild(newTaskForm);
}

export function deleteProjectForm(event) {
  event.target.parentElement.remove();
}

export function deleteTaskForm(event) {
  event.target.parentElement.parentElement.remove();
  event.preventDefault();
}

export function addProjectDiv(project) {
  const projectsList = document.getElementById("projects-list");
  const projectItem = document.createElement("div");
  const projectName = document.createElement("p");
  const projectOpts = document.createElement("span");
  projectOpts.classList.add("material-icons");
  projectName.textContent = project.name;
  projectOpts.textContent = "more_vert";
  projectOpts.addEventListener("click", makeProjectOpts);
  projectItem.dataset.projectId = project.projectId; // Set custom dataset attribute
  projectItem.classList.add("project-item");
  projectItem.append(projectName, projectOpts);
  projectsList.appendChild(projectItem);
  projectItem.addEventListener("click", filterProjectTasks);
  projectItem.click(); // click on project after creation
}

// TODO: Create options menu for project
function makeProjectOpts(event) {
  const parentDiv = event.target.parentElement;
  const targetProjectId = parentDiv.dataset.projectId;
  const optsDiv = document.createElement("div");
  optsDiv.classList.add("dropdown");
  parentDiv.append(optsDiv);

  const renameOpt = document.createElement("a");
  renameOpt.setAttribute("href", "#rename");
  const renameOptIcon = document.createElement("span");
  renameOptIcon.classList.add("material-icons");
  renameOptIcon.textContent = "drive_file_rename_outline";
  renameOpt.append(renameOptIcon);

  const deleteOpt = document.createElement("a");
  deleteOpt.setAttribute("href", "#delete");
  const deleteOptIcon = document.createElement("span");
  deleteOptIcon.classList.add("material-icons");
  deleteOptIcon.textContent = "delete";
  deleteOpt.append(deleteOptIcon);

  optsDiv.append(renameOpt, deleteOpt);

  event.stopPropagation();
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
  if (targetProjectId !== undefined) {
    const buttonDiv = document.getElementById("add-task");
    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "Add task";
    addTaskButton.dataset.projectId = targetProjectId;
    buttonDiv.appendChild(addTaskButton);
    addNewTaskListener(addTaskButton);
  }
}

function createTaskItem(parent, property) {
  const taskProperty = document.createElement("p");
  taskProperty.textContent = property;
  parent.appendChild(taskProperty);
}

function clearTasks() {
  const taskArea = document.getElementById("displayed-tasks");
  const buttonArea = document.getElementById("add-task");
  taskArea.textContent = "";
  buttonArea.textContent = "";
}

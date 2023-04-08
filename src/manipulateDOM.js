import { filterTasks, filterProjectTasks } from './filter.js';
import { checkValidProject, checkValidTask, renameProject } from './createItems.js';
import { format } from 'date-fns';

export function addListeners() {
  const filterTaskButtons = Array.from(document.querySelector(".side-bar .tasks").children);
  filterTaskButtons.forEach(function(button) {
    button.addEventListener("click", filterTasks);
  });
  document.getElementById("add-project").addEventListener("click", addProjectForm);
  document.querySelector(".overlay").addEventListener("click", toggleModal);
  document.querySelector(".modal-cancel-button").addEventListener("click", toggleModal);
}

// TODO: Add listener to stars to toggle "starred" state

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
  projectOpts.addEventListener("click", toggleVis);
  projectItem.dataset.projectId = project.projectId; // Set custom dataset attribute
  projectItem.classList.add("project-item");
  projectItem.append(projectName, projectOpts);
  projectsList.appendChild(projectItem);
  projectItem.addEventListener("click", filterProjectTasks);
  makeProjectOpts(projectItem);
  projectItem.click(); // click on project after creation
}

function makeProjectOpts(item) {
  const targetProjectId = item.dataset.projectId;
  const optsDiv = document.createElement("div");
  optsDiv.classList.add("dropdown");
  item.append(optsDiv);

  const renameOpt = document.createElement("a");
  renameOpt.setAttribute("href", "#rename");
  const renameOptIcon = document.createElement("span");
  renameOptIcon.classList.add("opt-icon", "material-icons-round");
  renameOptIcon.textContent = "drive_file_rename_outline";
  const renameOptLabel = document.createElement("p");
  renameOptLabel.textContent = "Rename";
  renameOpt.append(renameOptIcon, renameOptLabel);
  renameOpt.addEventListener("click", passRenameProject);

  const deleteOpt = document.createElement("a");
  deleteOpt.setAttribute("href", "#delete");
  const deleteOptIcon = document.createElement("span");
  deleteOptIcon.classList.add("opt-icon", "material-icons-round");
  deleteOptIcon.textContent = "delete";
  const deleteOptLabel = document.createElement("p");
  deleteOptLabel.textContent = "Delete";
  deleteOpt.append(deleteOptIcon, deleteOptLabel);

  optsDiv.append(renameOpt, deleteOpt);

  // Click listener to html DOM to toggle visibility of drop down menu
  document.documentElement.addEventListener("click", function() {
    if (optsDiv.classList.contains("show")) {
      toggleVis(optsDiv);
    }
  })

  // TODO: Stop propagation on icons
  // Click listener to stop propgation on icons
  document.querySelectorAll(".opt-icon").forEach(icon => {
    icon.addEventListener("click", function() {
      event.stopPropagation();
    })
  });
}

function toggleModal() {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
}

function passRenameProject(event) {
  toggleVis(event.target.parentElement);
  toggleModal();

  const projectId = parseInt(event.target.parentElement.parentElement.dataset.projectId);
  const addButton = document.querySelector(".modal-add-button");
  addButton.dataset.projectId = projectId;
  addButton.addEventListener("click", renameProject);

  event.stopPropagation();
}

export function renameProjectDiv(projectId, newName) {
  const project = document.querySelector(`[data-project-id="${projectId}"]`);
  project.children[0].textContent = newName;
  toggleModal();
}

export function createRenameForm() {

  const section = document.createElement("section");
  section.classList.add("modal", "hidden");

  const action = document.createElement("p");
  action.textContent = "Rename Project";

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "rename-input");
  input.setAttribute("placeholder", "New project name...");

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("modal-buttons");

  const addButton = document.createElement("button");
  addButton.classList.add("btn", "modal-add-button");
  addButton.textContent = "Add";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("btn", "modal-cancel-button");
  cancelButton.textContent = "Cancel";

  buttonDiv.append(addButton, cancelButton);

  section.append(action, input, buttonDiv);

  const overlay = document.createElement("div");
  overlay.classList.add("overlay", "hidden");

  document.body.append(section, overlay);

}

function toggleVis(event) {
  if (event.target !== undefined) { // clicked from more_vert click
    event.target.nextSibling.classList.toggle("show");
    event.stopPropagation();
  } else { // clicked outside of element
    event.classList.toggle("show");
  }
}

// TODO: Create option to mark task as done
// TODO: Create options for task delete
// TODO: Allow edit of task item on click
// TODO: Add event listener to toggle starred status
export function displayTask(tasks, targetProjectId) {
  clearTasks();
  const taskArea = document.getElementById("displayed-tasks");
  tasks.forEach((task => {
    const taskDiv = document.createElement("div");
    // Convert date to human readable
    const formattedDate = format(task.date, "MMMM do yyyy");
    const properties = [task.name, task.desc, formattedDate];
    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");
    createTaskItem(taskDetails, task.name);
    createTaskItem(taskDetails, task.desc);
    taskDiv.append(taskDetails);
    createTaskItem(taskDiv, formattedDate);
    createTaskStar(taskDiv, task.starred) // Add icon for starred
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

function createTaskStar(parent, property) {
  const star = document.createElement("span");
  star.classList.add("material-icons");
  if (property) {
    star.textContent = "star";
  } else {
    star.textContent = "star_border";
  }
  parent.appendChild(star);
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

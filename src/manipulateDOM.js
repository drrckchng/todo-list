import { filterTasks, filterProjectTasks } from './filter.js';
import { checkValidProject, checkValidTask, deleteProject, deleteTask, renameProject, tasksTracker } from './createItems.js';
import { format, parse } from 'date-fns';

export function addListeners() {
  const filterTaskButtons = Array.from(document.querySelector(".side-bar .tasks").children);
  filterTaskButtons.forEach(function(button) {
    button.addEventListener("click", filterTasks);
  });
  document.getElementById("add-project").addEventListener("click", addProjectForm);
  document.querySelector(".overlay").addEventListener("click", toggleModal);
  document.querySelector(".modal-cancel-button").addEventListener("click", toggleModal);
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

  const buttonDiv = document.createElement("div");
  buttonDiv.append(confirmButton, deleteButton);

  projectForm.append(input, buttonDiv);
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
  submitDiv.classList.add("add-task-button-div");
  submitDiv.append(submitInput, cancelButton);

  newTaskForm.append(nameDiv, descDiv, dateDiv, starredDiv, submitDiv);
  displayedTasks.appendChild(newTaskForm);
}

export function deleteProjectForm(event) {
  event.target.parentElement.parentElement.remove();
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

function makeProjectOpts(item, event) {
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
  renameOpt.addEventListener("click", (event) => {
    passRenameProject(event, targetProjectId);
  });

  const deleteOpt = document.createElement("a");
  deleteOpt.setAttribute("href", "#delete");
  const deleteOptIcon = document.createElement("span");
  deleteOptIcon.classList.add("opt-icon", "material-icons-round");
  deleteOptIcon.textContent = "delete";
  const deleteOptLabel = document.createElement("p");
  deleteOptLabel.textContent = "Delete";
  deleteOpt.append(deleteOptIcon, deleteOptLabel);
  deleteOpt.addEventListener("click", (event) => {
    passDeleteProject(event, targetProjectId);
  });

  optsDiv.append(renameOpt, deleteOpt);

  // Click listener to html DOM to toggle visibility of drop down menu
  document.documentElement.addEventListener("click", function() {
    if (optsDiv.classList.contains("show")) {
      toggleVis(optsDiv);
    }
  })

  // Click listener to stop propgation on icons
  // TODO: Fix to allow clicking on icon to execute function
  document.querySelectorAll(".opt-icon").forEach(icon => {
    icon.addEventListener("click", function(event) {
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

function passRenameProject(event, targetProjectId) {
  toggleVis(event.target.parentElement);
  toggleModal();

  const addButton = document.querySelector(".modal-add-button");
  addButton.dataset.projectId = targetProjectId;
  addButton.addEventListener("click", renameProject);

  event.stopPropagation();
}

function passDeleteProject(event, targetProjectId) {
  toggleVis(event.target.parentElement);
  deleteProject(targetProjectId);
  deleteProjectDiv(targetProjectId);

  event.stopPropagation();
}

function deleteProjectDiv(targetProjectId) {
  const projectDivs = document.querySelectorAll(".project-item");
  projectDivs.forEach(div => {
    if (div.dataset.projectId === targetProjectId) {
      div.remove();
    }
  })
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

// TODO: Create options for task delete
export function displayTask(tasks, targetProjectId) {
  clearTasks();
  const taskArea = document.getElementById("displayed-tasks");
  tasks.forEach((task => {
    const taskDiv = document.createElement("div");
    taskDiv.dataset.taskId = task.taskId;
    // Convert date to human readable
    const formattedDate = format(task.date, "MMMM do yyyy");

    const taskComplete = document.createElement("div");
    taskComplete.classList.add("task-complete");
    createTaskCheck(taskComplete, task.complete, task);
    taskDiv.append(taskComplete);

    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");
    createTaskItem(taskDetails, task.name, "task-item-name");
    createTaskItem(taskDetails, task.desc, "task-item-desc");
    taskDiv.append(taskDetails);
    createTaskItem(taskDiv, formattedDate, "task-item-date");
    createTaskStar(taskDiv, task.starred, task) // Add icon for starred

    const taskDelete = document.createElement("div");
    taskDelete.classList.add("task-delete");
    createTaskDelete(taskDelete, task);
    taskDiv.append(taskDelete);

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

function createTaskDelete(parent, task) {
  const taskId = task.taskId;
  const deleteButton = document.createElement("span");
  deleteButton.classList.add("material-icons");
  deleteButton.textContent = "delete";
  parent.appendChild(deleteButton);

  deleteButton.addEventListener("click", function(event) {
    deleteTaskDiv(event, taskId);
  });
}

function deleteTaskDiv(event, targetTaskId) {
  event.target.parentElement.parentElement.remove();
  deleteTask(targetTaskId);
}

function createTaskCheck(parent, property, task) {
  const taskId = task.taskId;
  const check = document.createElement("span");
  check.classList.add("material-icons");
  check.dataset.complete = task.complete;
  if (property) {
    check.textContent = "check_circle";
  } else {
    check.textContent = "radio_button_unchecked";
  }
  check.addEventListener("click", function(event) {
    toggleCheck(event, taskId);
  });
  parent.appendChild(check);
}

// TODO: Change task item visually to indicate completeted task upon TRUE
function toggleCheck(event, taskId) {
  tasksTracker.forEach(task => {
    if (task.taskId === taskId) {
      if (task.complete === true) {
        task.complete = false;
        event.target.textContent = "radio_button_unchecked";
      } else {
        task.complete = true;
        event.target.textContent = "check_circle";
      }
    }
  });
}

function createTaskStar(parent, property, task) {
  const star = document.createElement("span");
  star.classList.add("material-icons");
  star.dataset.taskId = task.taskId;
  if (property) {
    star.textContent = "star";
  } else {
    star.textContent = "star_border";
  }
  star.addEventListener("click", toggleStarDiv);
  parent.appendChild(star);
}

function toggleStarDiv(event) {
  const targetTaskId = parseInt(event.target.dataset.taskId);
  tasksTracker.forEach(task => {
    if (task.taskId === targetTaskId) {
      if (task.starred === true) {
        task.starred = false;
        event.target.textContent = "star_border";
      } else {
        task.starred = true;
        event.target.textContent = "star";
      }
    }
  });
}

function createTaskItem(parent, property, className) {
  const taskProperty = document.createElement("p");
  taskProperty.classList.add(className);
  taskProperty.textContent = property;
  taskProperty.addEventListener("click", editInPlace);
  parent.appendChild(taskProperty);
}

function editInPlace(event) {
  let targetTaskId = parseInt(event.target.parentElement.parentElement.dataset.taskId);
  // if target task id is no valid, search for it just one parent up
  if (isNaN(targetTaskId)) {
    targetTaskId = parseInt(event.target.parentElement.dataset.taskId);
  }

  // save old values and clear
  const old = event.target.textContent;
  event.target.textContent = "";

  // create input
  const input = document.createElement("input");
  input.dataset.taskId = targetTaskId;

  // If target is task name or desc...
  if (event.target.parentElement.className === "task-details") {
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", old);
  } else { // is date
    input.setAttribute("type", "date");
  }

  // create confirm button
  const confirm = document.createElement("span");
  confirm.classList.add("material-icons");
  confirm.textContent = "check_circle";
  confirm.addEventListener("click", (event) => {
    changeTaskDetail(event, targetTaskId);
  });

  // create cancel button
  const cancel = document.createElement("span");
  cancel.classList.add("material-icons");
  cancel.textContent = "cancel";
  cancel.addEventListener("click", (event) => {
    cancelTaskDetail(event, old);
  });
  event.target.append(input, confirm, cancel);
}

function changeTaskDetail(event, targetTaskId) {

  // Grab input value
  let newValue = event.target.previousSibling.value;

  const targetClassName = event.target.parentElement.className;

  // Allow empty description
  if (targetClassName === 'task-item-desc' && newValue === '') {
    newValue = "...";
  }

  // if input value is NOT empty
  if (newValue !== "") {


    let targetTask;

    // Grab correct task object
    tasksTracker.forEach(task => {
      if (task.taskId === targetTaskId) {
        targetTask = task;
      }
    });

    if (targetClassName === "task-item-name") {
      targetTask.rename(newValue);
    } else if (targetClassName === "task-item-desc") {
      targetTask.changeDesc(newValue);
    } else if (targetClassName === "task-item-date") {
      const newDateObj = parse(newValue, "yyyy-MM-dd", new Date());
      newValue = format(newDateObj, "MMMM do yyyy");
      targetTask.changeDate(newDateObj);
    }

    // Change text content to new value
    event.target.parentElement.textContent = newValue;

  } else {
    alert("Enter a new value");
  }
  event.stopPropagation();
}

function cancelTaskDetail(event, oldData) {
  event.target.parentElement.textContent = oldData; // Clear input element
  event.stopPropagation();
}

function clearTasks() {
  const taskArea = document.getElementById("displayed-tasks");
  const buttonArea = document.getElementById("add-task");
  taskArea.textContent = "";
  buttonArea.textContent = "";
}

export function clickAllTasks() {
  document.getElementById("filter-all").click();
}

import './style.css';
import "@fontsource/lato";
import "@fontsource/lato/900.css";
import 'material-icons/iconfont/material-icons.css';
import { projectsTracker, tasksTracker, createProject, createTask, deleteProject, populateTrackers } from './createItems.js';
import { addListeners, clickAllTasks, createRenameForm } from './manipulateDOM.js';

// Initial page load
createRenameForm(); // create modal form for rename
addListeners();

// Load default project if no previous storage detected
if (projectsTracker.length === 0) {
  createProject("Todo List");
}

populateTrackers();

// Click on "All Tasks" button
window.onload = function() {
  clickAllTasks();
}


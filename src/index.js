import './style.css';
import "@fontsource/lato";
import "@fontsource/lato/900.css";
import 'material-icons/iconfont/material-icons.css';
// import { format } from 'date-fns';
// import {Task} from './taskClass.js';
// import {Project} from './projectClass.js';
import { projectsTracker, tasksTracker, createProject, createTask, deleteProject } from './createItems.js';
import { addListeners } from './manipulateDOM.js';

// Initial page load
addListeners();
createProject("Todo List");
createProject("Breakfast");

// Click on "All Tasks" button
window.onload = function() {
  document.getElementById("filter-all").click();
}

// Test cases
createTask("Task One", "This is a task", new Date(), true, 0);
createTask("Task Two", "This is a task", new Date(2023, 2, 1), false, 0);
createTask("Eat cereal", "This is a task", new Date(2023, 2, 20), true, 1);
createTask("Peel apple", "This is a task", new Date(2023, 2, 20), false, 1);
console.log(projectsTracker);
console.log(tasksTracker);

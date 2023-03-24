import './style.css';
import "@fontsource/lato";
import "@fontsource/lato/900.css";
// import { format } from 'date-fns';
// import {Task} from './taskClass.js';
// import {Project} from './projectClass.js';
import { projectsTracker, tasksTracker, createProject, createTask, deleteProject } from './createItems.js';
import { addListeners } from './manipulateDOM.js';

// Initial page load
addListeners();
createProject("Todo List");

// Test cases
createTask("Task One", "This is a task", new Date(), true, 0);
createTask("Task One", "This is a task", new Date(2023, 2, 1), true, 0);
createTask("Task One", "This is a task", new Date(2023, 2, 20), true, 0);
createTask("Task One", "This is a task", new Date(2023, 2, 20), false, 0);
console.log(projectsTracker);
console.log(tasksTracker);

// Call method to select "All Tasks" view
// Call upon function to set event listeners from manipulateDOM
  // From there, have it call a function to return filtered list of tasks
 

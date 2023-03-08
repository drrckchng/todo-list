import './style.css';
import "@fontsource/lato";
import "@fontsource/lato/900.css";
import {Task} from './taskClass.js';
import {Project} from './projectClass.js';
// import * from './manipulateDOM.js';

// Create initial project on load
const initialProject = new Project("Todo List");
// Create test task for testing purposes
const testTask = new Task("Test task", "Please do ASAP", "2023-03-03", true);
// Push test task into initial project
initialProject.addTask(testTask);

// Print project
console.log("test");
console.log(initialProject.tasks);


import './style.css';
import "@fontsource/lato";
import "@fontsource/lato/900.css";
import {Task} from './taskClass.js';
import {Project} from './projectClass.js';
// import * from './manipulateDOM.js';

const initialProject = new Project("Todo List");
const testTask = new Task("Test task", "Please do ASAP", "2023-03-03", true);
initialProject.tasks.push(testTask);
console.log(initialProject);


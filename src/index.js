import './style.css';
import "@fontsource/lato";
import "@fontsource/lato/900.css";
import {Task} from './taskClass.js';
import {Project} from './projectClass.js';

const testProject = new Project("Project");
const testTask = new Task("Name", "Desc", "2021-01-01", true);
testProject.tasks.push(testTask);
console.log(testProject);

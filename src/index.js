import './style.css';
import "@fontsource/lato";
import "@fontsource/lato/900.css";
// import {Task} from './taskClass.js';
// import {Project} from './projectClass.js';
import {projectsTracker, createInitialProject} from './createItems.js';
// import * from './manipulateDOM.js';
//

createInitialProject();
console.log(projectsTracker);

// Call upon function to set event listeners from manipulateDOM
  // From there, have it call a function to return filtered list of tasks

 

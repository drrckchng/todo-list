// Add import for task filter script
import {filterTasks} from './filter.js';

export function addListeners() {
  const filterTaskButtons = Array.from(document.querySelector(".side-bar .tasks").children);
  filterTaskButtons.forEach(function(button) {
    button.addEventListener("click", filterTasks);
  });
}

// export function addProject() {
//   // create new div and append to sidebar
//   // create new project object (from createItems.js)
//   // get project ID
//   // add listener that will filter tasks that match project id
// }

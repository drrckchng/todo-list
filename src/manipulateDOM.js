// Add import for task filter script
import {filterTasks} from './filter.js';

export function addListeners() {
  // Grab elements and add event listeners
  const filterTaskButtons = document.querySelector(".side-bar .tasks").children;

  document.getElementById("filter-all").addEventListener("click", filterTasks);
  // const filterTodayTasks = document.getElementById("filter-today");
  // const filterWeekTasks = document.getElementById("filter-week");
  // const filterStarred = document.getElementById("filter-starred");
}

// function addProject() {
//   // create new div and append to sidebar
//   // create new project object (from createItems.js)
//   // get project ID
//   // add listener that will filter tasks that match project id
// }

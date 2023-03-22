import { filterTasks } from './filter.js';

export function addListeners() {
  const filterTaskButtons = Array.from(document.querySelector(".side-bar .tasks").children);
  filterTaskButtons.forEach(function(button) {
    button.addEventListener("click", filterTasks);
  });
}

export function addProjectDiv(project) {
  const sidebar = document.querySelector(".side-bar .projects")[0];
  const projectTab = document.createElement("div");
  // append projectTab to sidebar (below p but above add project btn)
  const projectId = project.projectId;
  // assign some sort of attribute to projectId
  // add listener that will filter tasks that match project id
}

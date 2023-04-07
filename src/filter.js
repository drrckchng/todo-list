import { tasksTracker, projectsTracker } from './createItems.js';
import { differenceInDays } from 'date-fns';
import { changeSectionHeader, displayTask } from './manipulateDOM.js';

// Filter tasks matching date criteria
export function filterTasks(event) {
  const today = new Date();
  const filterSetting = event.target.id;
  const filteredTasks = [];

  if (filterSetting === "filter-all") {
    displayTask(tasksTracker);
  } else {
    if (filterSetting === "filter-today") {
      tasksTracker.forEach(task => {
        if (differenceInDays(today, task.date) === 0) {
          filteredTasks.push(task);
        }
      });
    } else if (filterSetting === "filter-week") {
      tasksTracker.forEach(task => {
        if (differenceInDays(today, task.date) <= 7) {
          filteredTasks.push(task);
        }
      });
    } else if (filterSetting === "filter-starred") {
      tasksTracker.forEach(task => {
        if (task.starred === true) {
          filteredTasks.push(task);
        }
      });
    }
    displayTask(filteredTasks);
  }
  changeSectionHeader(event.target.textContent);
}

// Filter tasks matching project id and call displayTask
export function filterProjectTasks(event) {
  const targetProjectId = parseInt(event.target.dataset.projectId);
  const targetProject = findProject(targetProjectId);
  const filteredTasks = [];
  tasksTracker.forEach(task => {
    if (task.projectId === targetProjectId) {
      filteredTasks.push(task);
    }
  });
  changeSectionHeader(targetProject.name);
  displayTask(filteredTasks, targetProjectId);
}

// Grab matching project and return
function findProject(targetId) {
  for (let i = 0; i < projectsTracker.length; i++) {
    if (projectsTracker[i].projectId === targetId) {
      return projectsTracker[i];
    }
  }
}

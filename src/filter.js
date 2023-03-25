import { tasksTracker } from './createItems.js';
import { differenceInDays } from 'date-fns';
import { displayTask } from './manipulateDOM.js';

// Filter tasks matching date criteria
export function filterTasks(event) {

  const today = new Date();
  const filterSetting = event.target.id;
  const filteredTasks = [];

  if(filterSetting === "filter-today") {
    tasksTracker.forEach(task => {
      if(differenceInDays(today, task.date) === 0) {
        filteredTasks.push(task);
      }
    });
    displayTask(filteredTasks);
  } else if(filterSetting === "filter-week") {
    tasksTracker.forEach(task => {
      if(differenceInDays(today, task.date) <= 7) {
        filteredTasks.push(task);
      }
    });
    displayTask(filteredTasks);
  } else if(filterSetting === "filter-starred") {
    tasksTracker.forEach(task => {
      if(task.starred === true) {
        filteredTasks.push(task);
      }
    });
    displayTask(filteredTasks);
  } else if(filterSetting === "filter-all") {
    displayTask(tasksTracker);
  } 
}

// Filter tasks matching project id and call displayTask
export function filterProjectTasks(event) {
  const targetProjectId = parseInt(event.target.dataset.projectId);
  const filteredTasks = [];
  tasksTracker.forEach(task => {
    console.log(task.projectId);
    if(task.projectId === targetProjectId) {
      filteredTasks.push(task);
    }
  });
  displayTask(filteredTasks);
}


import { tasksTracker } from './createItems.js';
import { format, differenceInDays } from 'date-fns';

export function filterTasks(event) {
  const today = new Date();
  const filterSetting = event.target.id;
  const filteredTasks = [];
  if(filterSetting === 'filter-today') {
    tasksTracker.forEach(task => {
      if(differenceInDays(today, task.date) === 0) {
        filteredTasks.push(task);
      }
    });
  } else if(filterSetting === 'filter-week') {
    tasksTracker.forEach(task => {
      if(differenceInDays(today, task.date) <= 7) {
        filteredTasks.push(task);
      }
    });
  } else if(filterSetting === 'filter-starred') {
    tasksTracker.forEach(task => {
      if(task.starred === true) {
        filteredTasks.push(task);
      }
    });
  } else if(filterSetting === 'filter-all') {
    console.log(tasksTracker); // change to return later
  }
  console.log(filteredTasks); // change to return later
}


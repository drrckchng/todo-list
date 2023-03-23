import { tasksTracker } from './createItems.js';
import { format } from 'date-fns';

export function filterTasks(event) {
  const filterSetting = event.target.id;
  if(filterSetting === 'filter-all') {
    console.log(tasksTracker);
  } else if(filterSetting === 'filter-today') {
    const array = [];
    tasksTracker.forEach(task => {
      if(task.date === format(new Date(), 'yyyy-MM-dd')) {
        array.push(task);
      }
    });
    console.log(array);
  } else if(filterSetting === 'filter-week') {
  } else if(filterSetting === 'filter-starred') {
  }
}


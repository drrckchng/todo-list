import { tasksTracker } from './createItems.js';

export function filterTasks(event) {
  const filterSetting = event.target.id;
  if(filterSetting === 'filter-all') {
    console.log(tasksTracker);
  } else if(filterSetting === 'filter-today') {
    console.log("filter today");
  } else if(filterSetting === 'filter-week') {
    console.log("filter week");
  } else if(filterSetting === 'filter-starred') {
    console.log("filter starred");
  }
}

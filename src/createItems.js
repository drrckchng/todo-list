import { Task } from './taskClass.js';
import { Project } from './projectClass.js';

export const projectsTracker = [];
export const tasksTracker = [];

export function createInitialProject() {
  const initialProject = new Project("Todo List"); // project name should be pulled from DOM on creation
  projectsTracker.push(initialProject);
  // call method to create DOM element and append to side bar
}

export function createTask(name, desc, date, starred, selectedProjectId) {
  const task = new Task(name, desc, date, starred); // task properties pulled from DOM on creation
  // get currently selected project ID 
  task.projectId = selectedProjectId;
  tasksTracker.push(task);
  // filter all tasks and select that match project ID
  // set projectId property in the task
}


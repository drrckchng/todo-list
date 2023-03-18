import { Task } from './taskClass.js';
import { Project } from './projectClass.js';

export const projectsTracker = [];
export const tasksTracker = [];

export function createInitialProject() {
  const initialProject = new Project("Todo List"); // project name should be pulled from DOM on creation
  projectsTracker.push(initialProject);
  // call method to create DOM element and append to side bar
}

export function createTask() {
  const task = new Task("Test", "this is a test", "2023-03-12", true); // task properties pulled from DOM on creation
  // get currently selected project ID 
  const selectedProjectId = 0; // test case
  task.setProjectId(selectedProjectId);
  // filter all tasks and select that match project ID
  // set projectId property in the task
}


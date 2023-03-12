// import {Task} from './taskClass.js';
import {Project} from './projectClass.js';

export const projectsTracker = [];

export function createInitialProject() {
  const initialProject = new Project("Todo List");
  // Create test task for testing purposes
  // const testTask = new Task("Test task", "Please do ASAP", "2023-03-03", true);
  // initialProject.addTask(testTask);

  // Print project
  console.log(initialProject.projectId);

  projectsTracker.push(initialProject);
}


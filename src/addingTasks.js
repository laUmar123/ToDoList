import { generateTask, generateTaskInput } from "./mainGenerator";
import { format } from "date-fns";
import { allProjects } from "./projectGenerator";
import { Task } from "./TaskFF";
import { project } from "./projectGenerator";
import { findAllTasksDueNextSevenDays, findAllTasksDueToday } from "./updatingNav";
import { updateAllProjectsStringified } from "./createProjectBtnFunc";

/**
 * This function displays the task input fields so the user can create a task
 */
function addTaskBtnFunctionality() {
    const tasksContainer = document.querySelector('.tasks');
    tasksContainer.append(generateTaskInput(['task-input-container']));
}

/**
 * This function generates the task onto the screen based on the details the user has provided
 * @param {object} task a Task object, so the task can be displayed according to its values 
 * @returns a DOM element
 */
function loadTask(task) {
    const tasksContainer = document.querySelector('.tasks');
    const generatedTask = generateTaskInput(['task-input-container', 'hide']);
    generatedTask.append(generateTask(task.taskNo, task.name, task.details, task.date, task.isImportant));
    tasksContainer.append(generatedTask);
    return tasksContainer;
}

/**
 * If the user presses create the task is created, and the input form is hidden
 * @param {object} e self generated event object when used on an event listener 
 */
function createTaskBtnFunctionality(e) {
    if (e.target.classList.contains('create-task-btn')) {
        creatingTaskLogic(e);
        updateAllProjectsStringified();
    }
}

/**
 * If the user edits the task, the old version of the task is removed and a new one is put in its place
 * @param {object} e self generated event object when used on an event listener 
 */
function createEditTaskBtnFunctionality(e) {
    if (e.target.classList.contains('create-edit-task-btn')) {
        let projectUnder = '';
        getAllTasks().forEach(task => {
            if (retrieveTaskTitleFromSummary(e) === task.name && retrieveTaskDescriptionFromSummary(e) === task.details && retrieveTaskDateFromSummary(e) === task.date) {
                projectUnder = findProject(task.projectUnder);
                projectUnder.removeTask(task);
            }
        });
        creatingEditTaskLogic(e, projectUnder);
        updateAllProjectsStringified();
    }
}
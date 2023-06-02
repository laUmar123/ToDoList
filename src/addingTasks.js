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

/**
 * If the user is cancelling editting the task, then we hide the edit form, and show the task summary
 * @param { object } e self generated event object when used on an event listener
*/
function cancelEditTaskBtnFunctionality(e) {
    if (e.target.classList.contains('cancel-edit-task-btn')) {
        hideTaskInputContainer(e);
        getParentTask(e).querySelector('.task-summary').classList.remove('hide');
    }
}

/**
 * If the user presses the edit button on a task, we update the buttons on that task to have different functionality from the creating a new task buttons
 * @param {object} e self generated event object when used on an event listener 
 */
function editBtnFunctionality(e) {
    if (e.target.classList.contains('edit-btn')) {
        if (getParentTask(e).querySelector('.cancel-task-btn')) getParentTask(e).querySelector('.cancel-task-btn').className = 'cancel-edit-task-btn btn';
        if (getParentTask(e).querySelector('.create-task-btn')) getParentTask(e).querySelector('.create-task-btn').className = 'create-edit-task-btn btn';
        getParentTask(e).querySelector('.task-input-container').classList.remove('hide');
        getParentTask(e).querySelector('.task-summary').classList.add('hide');
    }
}

/**
 * If the user deletes a project, we remove the project and jump reupdate the various nav-items for task display
 * @param {object} e self generated event object when used on an event listener 
 */
function deleteBtnFunctionality(e) {
    if (e.target.classList.contains('delete-btn')) {
        getAllTasks().forEach(task => {
            if (retrieveTaskTitleFromSummary(e) === task.name && retrieveTaskDescriptionFromSummary(e) === task.details && retrieveTaskDateFromSummary(e) === task.date) {
                findProject(task.projectUnder).removeTask(task);
            }
        })
        removeParentTask(e);
        if (document.querySelector('.today').classList.contains('active-nav-item')) findAllTasksDueToday();
        if (document.querySelector('.all-tasks').classList.contains('active-nav-item')) allTasksBtnFunctionality();
        if (document.querySelector('.next-seven-days').classList.contains('active-nav-item')) findAllTasksDueNextSevenDays();
        if (document.querySelector('.important').classList.contains('active-nav-item')) importantBtnFunctionality();
        updateAllProjectsStringified();
    }
}

/**
 * Checks whether or not the user has pressed the important button on the task
 * @param {object} e self generated event object when used on an event listener 
 * @returns return a boolean whether or not the important button is active or not
 */
function isImgEmptyStar(e) {
    if (e.target.getAttribute('src') === './../src/assets/empty-star.png') return true;
    if (e.target.getAttribute('src') === './../src/assets/favourite.png') return false;
};

/**
 * Finds the task and updates its isImportant value
 * @param {object} e self generated event object when used on an event listener 
 * @param {boolean} isTaskImportant a true or false value on whether or not the task should be important
 */
function changeTaskIsImportant(e, isTaskImportant) {
    getAllTasks().forEach(task => {
        if (retrieveTaskTitleFromSummary(e) === task.name && retrieveTaskDescriptionFromSummary(e) === task.details && retrieveTaskDateFromSummary(e) === task.date) {
            task.isImportant = isTaskImportant;
        };
    });
};

/**
 * If the user presses the important star, we update the star to show important, or if its already important then not important
 * @param {object} e self generated event object when used on an event listener 
 */
function importantTaskBtnFunctionality(e) {
    if (e.target.classList.contains('favourite')) {
        if (isImgEmptyStar(e)) {
            e.target.src = "./../src/assets/favourite.png";
            changeTaskIsImportant(e, true);
        } else if (!isImgEmptyStar(e)) {
            changeTaskIsImportant(e, false);
            e.target.src = "./../src/assets/empty-star.png";
            importantBtnFunctionality();
        }
        updateAllProjectsStringified();
    }
};

/**
 * Loops through all tasks and finds all the important tasks
 * @returns an Array of all important tasks
 */
function getAllImportantTasks() {
    return getAllTasks().filter(task => {
        if (task.isImportant === true) {
            return task;
        }
    });
};

/**
 * If the user presses the important nav-item, we print all important tasks onto the screen, and if there are none, we show the no tasks image
 */
function importantBtnFunctionality() {
    if (getAllImportantTasks().length === 0) {
        document.querySelector('.no-tasks-container').classList.remove('hide');
        printAllTasks(getAllImportantTasks());
    }
    else {
        printAllTasks(getAllImportantTasks());
        document.querySelector('.no-tasks-container').classList.add('hide');
    }
    updateAllProjectsStringified();
}; updateAllProjectsStringified
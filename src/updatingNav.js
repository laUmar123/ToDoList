import { format, add, compareAsc, parse, sub } from "date-fns";
import { getAllTasks, printAllTasks, printAllTasksFromProject } from "./addingTasks";
import { allProjects } from "./projectGenerator";
import { updateAllProjectsStringified } from "./createProjectBtnFunc";

/**
 * This function updates the active nav item by removing the active nav item class from the previous nav item, and assigning on the nav-item that has been clicked, as well as updating the main heading's text content
 * @param {object} e self generated event object when used on an event listener 
 */
function updateActiveNavItem(e) {
    if (e.target.classList.contains('nav-item')) {
        removeActiveNavItem();
        e.target.classList.add('active-nav-item');
        updateMainDisplayHeader(e.target.innerText);
        document.querySelector('.add-task-btn').classList.add('hide');
        updateAllProjectsStringified();
    }
};

/**
 * This function updates the active project if any part of the project is clicked
 * @param {object} e self generated event object when used on an event listener 
 */
function updateActiveProject(e) {
    if (e.target.classList.contains('project')) {
        document.querySelector('.no-tasks-container').classList.add('hide');
        updateMainDisplayHeader(e.target.querySelector('.project-name').innerText);
        removeActiveNavItem();
        e.target.classList.add('active-nav-item');
        document.querySelector('.add-task-btn').classList.remove('hide');
        printAllTasksFromProject(e.target.querySelector('.project-name').innerText);
        updateAllProjectsStringified();
    } else if (e.target.classList.contains('project-icon')) {
        document.querySelector('.no-tasks-container').classList.add('hide');
        updateMainDisplayHeader(e.target.nextElementSibling.innerText);
        removeActiveNavItem();
        e.target.closest('.project').classList.add('active-nav-item');
        document.querySelector('.add-task-btn').classList.remove('hide');
        printAllTasksFromProject(e.target.nextElementSibling.innerText);
        updateAllProjectsStringified();
    } else if (e.target.classList.contains('project-name')) {
        document.querySelector('.no-tasks-container').classList.add('hide');
        updateMainDisplayHeader(e.target.innerText);
        removeActiveNavItem();
        e.target.closest('.project').classList.add('active-nav-item');
        document.querySelector('.add-task-btn').classList.remove('hide');
        printAllTasksFromProject(e.target.innerText);
        updateAllProjectsStringified();
    }
};

/**
 * This function will be used when updating the current active project or nav item, and it will be used to update the amin display
 * @param {string} text the text we want the main heading to display 
 */
function updateMainDisplayHeader(text) {
    const projectMainDisplayName = document.querySelector('.list-display-type');
    projectMainDisplayName.innerText = text;
};

/**
 * removes the 'active-nav-item' from all classes
 */
function removeActiveNavItem() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active-nav-item'));
    document.querySelectorAll('.project').forEach(item => item.classList.remove('active-nav-item'));
};

/**
 * This allows us to manually set the active nav-item in cases of when the user deletes a project and we need to default to an active nav-item
 * @param {Element} target the element we want to make the active item 
 */
function manuallySetActiveItem(target) {
    removeActiveNavItem();
    target.classList.add('active-nav-item');
    updateMainDisplayHeader(target.innerText);
    document.querySelector('.add-task-btn').classList.add('hide');
};

/**
 * Gets the current date 
 * @returns a Date object
 */
function getTodayDate() {
    const date = format(new Date(), 'dd/MM/yyyy');
    return date;
};

/**
 * Gets all the tasks due on the date that have been passed in
 * @param {Date} date a date object 
 * @returns an Array that contains all the tasks due today
 */
function getAllTasksDueToday(date) {
    const todayTasks = getAllTasks().filter(individualTask => {
        if (individualTask.date === date) return individualTask;
    });
    return todayTasks;
}

/**
 * finds all the tasks that are due for the next seven days based on the day the user has access the website
 * @returns an Array of all the tasks due in the next seven days, excluding all tasks that were due on days before the current day
 */
function getAllTasksDueForNextSevenDays() {
    const tasks = getAllTasks().filter(individualTask => {
        if ((compareAsc(parse(individualTask.date, 'dd/MM/yyyy', new Date()), add(new Date(), { days: 7 })) === -1 || compareAsc(parse(individualTask.date, 'dd/MM/yyyy', new Date()), add(new Date(), { days: 7 })) === 0) && compareAsc(parse(individualTask.date, 'dd/MM/yyyy', new Date()), sub(new Date(), { days: 1 })) === 1) return individualTask;
    });
    return tasks;
}

/**
 * generates onto the screen all the tasks that are due today and if there are none then an image is displayed
 */
function findAllTasksDueToday() {
    const tasks = getAllTasksDueToday(getTodayDate());
    if (tasks.length === 0) document.querySelector('.no-tasks-container').classList.remove('hide');
    else document.querySelector('.no-tasks-container').classList.add('hide');
    printAllTasks(tasks);
    updateAllProjectsStringified();
};

/**
 * generates onto the screen all the tasks that are due for the next seven days and if there are none then an image is displayed
 */
function findAllTasksDueNextSevenDays() {
    const tasks = getAllTasksDueForNextSevenDays();
    if (tasks.length === 0) document.querySelector('.no-tasks-container').classList.remove('hide');
    else document.querySelector('.no-tasks-container').classList.add('hide');
    printAllTasks(tasks);
    updateAllProjectsStringified();
};

export { updateActiveNavItem, updateActiveProject, manuallySetActiveItem, findAllTasksDueToday, findAllTasksDueNextSevenDays }
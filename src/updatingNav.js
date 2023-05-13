import { format, add, compareAsc, parse, sub } from "date-fns";
import { getAllTasks, printAllTasks, printAllTasksFromProject } from "./addingTasks";
import { allProjects } from "./projectGenerator";
import { updateAllProjectsStringified } from "./createProjectBtnFunc";

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
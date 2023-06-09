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
 * If the user cancels task creation that task's input fields are removed from the DOM
 * @param {object} e self generated event object when used on an event listener 
 */
function cancelTaskBtnFunctionality(e) {
    if (e.target.classList.contains('cancel-task-btn')) {
        removeParentTask(e);
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

/**
 * This function is called whenever we need to create a task, and it takes all the values from the task form, and prints the task on screen, while also making it a Task instance
 * @param {object} e self generated event object when used on an event listener 
 */
function creatingTaskLogic(e) {
    const taskTitle = retrieveTaskTitleFromInput(e);
    const taskDescription = retrieveTaskDescriptionFromInput(e);
    const taskDate = checkIfValidDate(e.target.closest('.task-input-container').querySelector('#task-date').value);
    hideTaskInputContainer(e);
    const activeProject = findProject(findActiveProject());
    activeProject.addToTasks(Task(activeProject.projectName, taskTitle, taskDescription, taskDate, activeProject.getTasks().length, false));
    removeParentTask(e);
    printLastTask(activeProject.projectName);
}

/**
 * This function is used to create a new task when the user edits a task
 * @param {object} e self generated event object when used on an event listener 
 * @param {object} projectUnder the project the task is under 
 */
function creatingEditTaskLogic(e, projectUnder) {
    const taskTitle = retrieveTaskTitleFromInput(e);
    const taskDescription = retrieveTaskDescriptionFromInput(e);
    const taskDate = checkIfValidDate(e.target.closest('.task-input-container').querySelector('#task-date').value);
    hideTaskInputContainer(e);
    const activeProject = projectUnder;
    activeProject.addToTasks(Task(activeProject.projectName, taskTitle, taskDescription, taskDate, activeProject.getTasks().length, false));
    removeParentTask(e);
    if (document.querySelector('.today').classList.contains('active-nav-item')) findAllTasksDueToday();
    else printLastTask(activeProject.projectName);
}

/**
 * Gets the parent task DOM element
 * @param {object} e self generated event object when used on an event listener  
 * @returns the DOM element of the e.target
 */
function getParentTask(e) {
    return e.target.closest('.task');
}

/**
 * Deletes the parent task DOM element of e.target
 * @param {object} e self generated event object when used on an event listener  
 */
function removeParentTask(e) {
    getParentTask(e).remove();
}

/**
 * Hides the task input container
 * @param {object} e self generated event object when used on an event listener  
 */
function hideTaskInputContainer(e) {
    getParentTask(e).querySelector('.task-input-container').classList.toggle('hide');
}

/**
 * the value of the title of the task in the input form
 * @param {object} e self generated event object when used on an event listener  
 * @returns retrieves the title of the task
 */
function retrieveTaskTitleFromInput(e) {
    return getParentTask(e).querySelector('#task-title').value;
};

/**
 * the value of the title of the task in the task summary
 * @param {object} e self generated event object when used on an event listener  
 * @returns retrieves the title of the task
 */
function retrieveTaskTitleFromSummary(e) {
    return getParentTask(e).querySelector('.task-name').innerText;
};

/**
 * This function retrieves task details from the task summary
 * @param {object} e self generated event object when used on an event listener  
 * @returns a string that describes the task
 */
function retrieveTaskDescriptionFromSummary(e) {
    return getParentTask(e).querySelector('.task-information').innerText;
}

/**
 * This function retrieves task details from the task input
 * @param {object} e self generated event object when used on an event listener  
 * @returns a string that describes the task
 */
function retrieveTaskDescriptionFromInput(e) {
    return getParentTask(e).querySelector('#task-details').value;
}

/**
 * This function retrieves the task due date from the task summary
 * @param {object} e self generated event object when used on an event listener  
 * @returns a string that shows the due date
 */
function retrieveTaskDateFromSummary(e) {
    return getParentTask(e).querySelector('.complete-date').innerText;
}

/**
 * This function retrieves the task due date from the task input
 * @param {object} e self generated event object when used on an event listener  
 * @returns a string that shows the due date
 */
function retrieveTaskDateFromInput(e) {
    return getParentTask(e).querySelector('#task-date').value;
}

//Checks if user entered a valid date and returns and formats the date accordingly
function checkIfValidDate(date) {
    if (date === '') return 'No Deadline';
    return format(new Date(date), 'dd/MM/yyyy');
};

/**
 * Finds the current active project
 * @returns a string that is the name of that project
 */
function findActiveProject() {
    const [active] = Array.from(document.querySelectorAll('.project')).filter(project => {
        if (project.classList.contains('active-nav-item')) return project;
    });
    return active.querySelector('.project-name').innerText;
};

/**
 * Finds the project object that has the same name as the argument passed in
 * @param {string} projectName the name of the project
 * @returns an object 
 */
function findProject(projectName) {
    const [project] = allProjects.filter(project => {
        if (project.projectName === projectName) return project;
    })
    return project
};

/**
 * removes all tasks from the DOM and thus removing it from the screen
 */
function deleteAllTasksFromDom() {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => task.remove());
}

/**
 * This function retrieves the project, and prints all the tasks that are stored under that project
 * @param {string} projectName the name of the project
 */
function printAllTasksFromProject(projectName) {
    deleteAllTasksFromDom();
    const project = findProject(projectName);
    project.getTasks().forEach(task => {
        loadTask(task);
    });
};

/**
 * This function prints all the tasks in the array
 * @param {Array} arrOfTasks an array of tasks 
 */
function printAllTasks(arrOfTasks) {
    deleteAllTasksFromDom();
    arrOfTasks.forEach(task => loadTask(task));
};

/**
 * This function prints the last task stored under the project that has been passed
 * @param {string} projectName the name of the project
 */
function printLastTask(projectName) {
    const project = findProject(projectName);
    loadTask(project.getTasks().at(-1));
};

/**
 * This function retrieves all tasks from every project
 * @returns an array of every task
 */
function getAllTasks() {
    const allTasks = [];
    allProjects.forEach(project => {
        allTasks.push(...project.getTasks());
    });
    return allTasks;
}

/**
 * This function runs when the user clicks the All Tasks button in the nav, and it prints every task stored in every project
 */
function allTasksBtnFunctionality() {
    if (getAllTasks().length === 0) {
        document.querySelector('.no-tasks-container').classList.remove('hide');
        printAllTasks(getAllTasks());
    } else {
        printAllTasks(getAllTasks());
        document.querySelector('.no-tasks-container').classList.add('hide');
    }
    updateAllProjectsStringified();
}

export { importantTaskBtnFunctionality, importantBtnFunctionality, printAllTasks, getAllTasks, addTaskBtnFunctionality, createTaskBtnFunctionality, printAllTasksFromProject, cancelTaskBtnFunctionality, editBtnFunctionality, deleteBtnFunctionality, cancelEditTaskBtnFunctionality, createEditTaskBtnFunctionality, allTasksBtnFunctionality }
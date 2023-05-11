import { generateDiv, generateButton, generateParagraph, generateImage, setAttributes } from "./commonGeneratorFunctions";
import { createProjectOnLoad } from "./createProjectBtnFunc";
let dataCellValue = 0; //used to keep track of the number of projects that have been created
let allProjects = []; //used to store all instances of project

/**
 * This runs whenever the page is loaded, it retrieves the allProjects array from local storage if the user has previously created projects, and creates a project instance out of each project again
 */
window.addEventListener('load', function () {
    if (this.localStorage.getItem('allProjects')) {
        const ex = JSON.parse(this.localStorage.getItem('allProjects'));
        allProjects = ex.map(e => {
            return project(e.projectName, e.projectNum, e.tasks, e.currentTasks)
        });
        createProjectOnLoad(allProjects)
    }
});

/**
 * This factory function is used to create a project instance, it can be used for both new projects, or when the page loads a project needs to have its methods attached to itself again
 * @param {string} projectName the name of the project
 * @param {number} projectNum the number of the project based on the number of projects there already are
 * @param {Array} tasks an array of all the tasks attach to that project, by default it will be an empty array
 * @param {number} currentTasks the total number of current tasks assigned to that project
 * @returns an object that has a set of properties and methods attached to it
 */
function project(projectName, projectNum, tasks = [], currentTasks = 0) {
    const incrementTasks = () => currentTasks++;
    const decrementTasks = () => currentTasks--;
    const getCurrentTasksNum = () => currentTasks;
    const updateTaskNumbers = () => tasks.forEach((task, index) => task.taskNo = index);
    const addToTasks = (task) => tasks.push(task);
    const getTasks = () => tasks;
    const removeTask = (taskObj) => tasks.forEach((task, index) => {
        if (task === taskObj) {
            tasks.splice(index, 1);
            decrementTasks();
            updateTaskNumbers();
        };
    });
    return { projectName, projectNum, tasks, currentTasks, getTasks, getCurrentTasksNum, incrementTasks, addToTasks, removeTask };
};

/**
 * THis project is used to create a project on screen
 * @param {string} name the name of the project 
 * @returns a DOM element that will be displayed on the screen
 */
function generateProject(name) {
    const container = generateDiv(['project']);
    container.dataset.project = dataCellValue;
    allProjects.push(project(name, dataCellValue));
    container.append(generateImage('./../src/assets/project-icon.svg', 'a rocket icon that is slightly tilted to the right', ['project-icon']), generateParagraph(name, ['project-name']), renameForm(), generateProjectConfiguration());
    return container;
};

/**
 * This function is used to generate a project that already exists but needs to be displayed on screen again
 * @param {string} name the name of the project
 * @param {number} dataCellValue the number of the project
 * @returns a DOM element
 */
export function generateProjectOnLoad(name, dataCellValue) {
    const container = generateDiv(['project']);
    container.dataset.project = dataCellValue;
    container.append(generateImage('./../src/assets/project-icon.svg', 'a rocket icon that is slightly tilted to the right', ['project-icon']), generateParagraph(name, ['project-name']), renameForm(), generateProjectConfiguration());
    return container;
};

/**
 * Generates the configuration part of the project, such as being able to rename or delete the project
 * @returns a DOM element
 */
function generateProjectConfiguration() {
    const container = generateDiv(['project-configuration']);
    const verticalDotsImg = generateImage('./../src/assets/expand.svg', '3 vertical dots', ['project-options']);
    verticalDotsImg.dataset.project = dataCellValue;
    const projectBtns = generateDiv([`project-btns`, 'hide', `project-${dataCellValue}`]);
    projectBtns.append(generateButton(['rename-project-btn'], 'Rename'), generateButton(['delete-project-btn'], 'Delete'));
    container.append(verticalDotsImg, projectBtns);
    dataCellValue++;
    return container;
};

/**
 * Generates the rename form that pops up if the user clicks on rename
 * @returns a DOM element
 */
function renameForm() {
    const renameContainer = generateDiv(['rename-project', 'hide']);
    const nameInputField = document.createElement('input');
    nameInputField.id = 'project-rename-input';
    setAttributes(nameInputField, [['type', 'text'], ['name', 'project-name'], ['placeholder', 'Enter Project Name'], ['maxlength', '20']]);
    renameContainer.append(nameInputField, generateButton(['btn', 'confirm-rename-btn'], 'Rename'));
    return renameContainer;
};

export { allProjects, project, generateProject }
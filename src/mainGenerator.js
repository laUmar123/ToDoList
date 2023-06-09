import { generateButton, generateDiv, generateHeading, generateImage, generateParagraph, setAttributes } from "./commonGeneratorFunctions";

/**
 * This function will be used to generate the entire main part of the page
 * @returns a DOM element 
 */
function generateMain() {
    const mainContainer = document.createElement('main');
    const tasksContainer = generateDiv(['tasks']);
    tasksContainer.append(generateNoTasksImage());
    mainContainer.append(generateHeading('h2', 'All Tasks', ['list-display-type']), tasksContainer, generateAddTask());
    return mainContainer;
};

/**
 * This function is used to generate the button that will be used to generate create a task
 * @returns a DOM element
 */
function generateAddTask() {
    const container = generateDiv(['add-task-btn', 'hide']);
    container.append(generateImage('./../src/assets/add.png', 'a plus icon', ['add-task-btn-icon']), generateParagraph('Add a task', ['add-task-btn-msg']));
    return container;
};

/**
 * This function creates the task element itself, and attaches an input form to the task using the generateTaskFormInput() function
 * @param {Array} classes this takes an array of classes that we want to add to the div that is generated
 * @returns a DOM element
 */
function generateTaskInput(classes) {
    const container = generateDiv(['task']);
    const inputsContainer = generateDiv(classes);
    inputsContainer.append(generateTaskFormInput('task-title-input', 'Title:', 'input', [['id', 'task-title'], ['type', 'textbox'], ['name', 'task-name'], ['placeholder', 'What is the task title?'], ['maxlength', '20']]), generateTaskFormInput('task-details-input', 'Details:', 'textarea', [['id', 'task-details'], ['name', 'task-details'], ['placeholder', 'e.g. I am going to learn DOM Fundamentals'], ['rows', '3']]), generateTaskFormInput('task-date-input', 'Date:', 'input', [['id', 'task-date'], ['type', 'date'], ['name', 'task-deadline-date']]), generateTaskInputButtons());
    container.append(inputsContainer);
    return container
};

/**
 * This function generates the task summary part of the task element
 * @param {Number} taskNumber the number of task
 * @param {string} taskTitle the task's title
 * @param {string} taskInformation details about the task
 * @param {Date} date the date the task needs to be completed by
 * @param {boolean} isImportant a true or false value depending on whether or not the task is important
 * @returns a DOM element
 */
function generateTask(taskNumber, taskTitle, taskInformation, date, isImportant) {
    const taskSummary = generateDiv(['task-summary']);
    taskSummary.append(generateCheckbox(taskNumber), generateTaskDetails(taskTitle, taskInformation), generateTaskModification(date, isImportant));
    return taskSummary;
}

/**
 * This generates the form that pops up when the user clicks add task
 * @param {Array} containerClass these are the classes we want to add to the container
 * @param {string} labelText this is the text we want to display as the heading of the form
 * @param {string} elementType this is the html element that we want to create, more specifically the form input that we want to create 
 * @param {Array} attributesArr an array of arrays where each index contains an array that has the attribute name and its corresponding value 
 * @returns a DOM element that contains all the required elements for the user to input a task
 */
function generateTaskFormInput(containerClass, labelText, elementType, attributesArr) {
    const container = generateDiv([containerClass, 'task-input']);
    const label = generateHeading('h6', labelText, ['task-input-label']);
    const labelInput = document.createElement(elementType);
    labelInput.classList.add('task-input-form');
    setAttributes(labelInput, attributesArr);
    container.append(label, labelInput);
    labelInput.required = true;
    return container;
};

/**
 * this function generates the buttons along with its classes that are required for the input form field
 * @returns a DOM element that contains the buttons for the task input form
 */
function generateTaskInputButtons() {
    const container = generateDiv(['task-input-buttons']);
    container.append(generateButton(['btn', 'create-task-btn'], 'Add'), generateButton(['btn', 'cancel-task-btn'], 'Cancel'));
    return container;
};

/**
 * This function is used to generate a checkbox that is specific to a certain task
 * @param {Number} taskNumber this is the new task's number in the list of tasks
 * @returns returns a DOM element that is a checkbox
 */
function generateCheckbox(taskNumber) {
    const container = generateDiv(['checkbox-wrapper-19']);
    const checkbox = document.createElement('input');
    setAttributes(checkbox, [['type', 'checkbox'], ['id', `check-box-${taskNumber}`]]);
    const label = document.createElement('label');
    setAttributes(label, [['for', `check-box-${taskNumber}`], ['class', 'check-box']]);
    container.append(checkbox, label);
    return container;
};

/**
 * this function generates the task's details based on what the user has entered in the input form
 * @param {string} taskTitle the title of the task
 * @param {string} taskInformation a description of what to do
 * @returns a DOM element 
 */
function generateTaskDetails(taskTitle, taskInformation) {
    const container = generateDiv(['task-details']);
    const title = generateHeading('h6', taskTitle, ['task-name']);
    const details = generateParagraph(taskInformation, ['task-information']);
    container.append(title, details);
    return container;
};

/**
 * This function generates the modification part of the task display
 * @param {Date} date a Date instance of when the task needs to be completed by
 * @param {boolean} isImportant a boolean value of whether or not the task is important
 * @returns a DOM element
 */
function generateTaskModification(date, isImportant = false) {
    const container = generateDiv(['task-modification']);
    const deadlineDate = generateParagraph(date, ['complete-date']);
    let img = '';
    if (!isImportant) img = generateImage('./../src/assets/empty-star.png', 'an outline of a star', ['favourite']);
    else img = generateImage('./../src/assets/favourite.png', 'a yellow star', ['favourite']);
    container.append(deadlineDate, img, generateButton(['btn', 'edit-btn'], 'Edit'), generateButton(['btn', 'delete-btn'], 'Delete'));
    return container
};

/**
 * This function is used to generate the 'no task' image that is displayed when there are not tasks for the user to do
 * @returns a DOM element
 */
function generateNoTasksImage() {
    const container = generateDiv(['no-tasks-container']);
    container.append(generateImage('./../src/assets/tasks-complete.png', 'image of a large checklist with all tasks ticked', ['no-tasks-img']), generateHeading('h3', 'Yay No Tasks!', ['no-tasks-msg']));
    return container;
}

export { generateTaskInput, generateTask, generateMain, generateNoTasksImage }
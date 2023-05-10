import { generateDiv, generateButton, generateParagraph, generateImage, setAttributes } from "./commonGeneratorFunctions";
import { createProjectOnLoad } from "./createProjectBtnFunc";
let dataCellValue = 0; //used to keep track of the number of projects that have been created
let allProjects = []; //used to store all instances of project

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
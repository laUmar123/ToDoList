import { generateDiv, generateButton, generateImage, setAttributes } from "./commonGeneratorFunctions";

/**
 * Generates the project modal that will be used when the user wants to create a project
 * @returns a DOM element
 */
export function projectModal() {
    const container = generateDiv(['project-creation', 'hide']);
    container.append(generateImage('./../src/assets/project-icon.svg', 'a rocket icon that is slightly tilted to the right'), projectNameInput(), projectCreationButtons());
    return container;
};

/**
 * Generates the project name form by creating the form element and appending the input form, and adds the required attributes to it
 * @returns a DOM element
 */
function projectNameInput() {
    const container = generateDiv(['project-creation-name']);
    const formContainer = document.createElement('form');
    formContainer.classList.add('project-creation-form');
    const nameInputField = document.createElement('input');
    nameInputField.id = 'project-name-input';
    setAttributes(nameInputField, [['type', 'text'], ['name', 'project-name'], ['placeholder', 'Enter Project Name'], ['maxlength', '20']]);
    formContainer.append(nameInputField);
    container.append(formContainer);
    return container;
};

/**
 * Generates the buttons that are going to be used to create the project or cancel the process
 * @returns a DOM element
 */
function projectCreationButtons() {
    const container = generateDiv(['project-creation-form-btns']);
    container.append(generateButton(['btn', 'create-btn'], 'Create'), generateButton(['btn', 'cancel-btn'], 'Cancel'));
    return container;
};
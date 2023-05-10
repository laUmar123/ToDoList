import { generateProject, generateProjectOnLoad } from './projectGenerator';
import { addProjectBtnFunc } from './addProjectButtonFunctionality';
import { allProjects } from './projectGenerator';

/**
 * This function will be used to update or add all projects to local storage by stringifying the allProjects array, it will be used whenever the user creates a new project
 */
export function updateAllProjectsStringified() {
    const allProjects_stringified = JSON.stringify(allProjects);
    localStorage.setItem('allProjects', allProjects_stringified);
}

/**
 * This function creates a project based on the user's input and displays it on the screen
 */
export function createProjectBtnFunc() {
    const projectNameInputField = document.querySelector('#project-name-input');
    const userProjectsContainer = document.querySelector('.user-projects');
    userProjectsContainer.prepend(generateProject(projectNameInputField.value));
    projectNameInputField.value = '';
    addProjectBtnFunc();
    updateAllProjectsStringified();
}

/**
 * This function is used to recreate the projects on the page the user has previously created everytime they use the webpage again
 * @param {Array} projects an array of projects that will become project objects whenever the user loads the webpage 
 */
export function createProjectOnLoad(projects) {
    const userProjectsContainer = document.querySelector('.user-projects');
    projects.forEach(project => {
        userProjectsContainer.prepend(generateProjectOnLoad(project.projectName, project.projectNum));
    });
};
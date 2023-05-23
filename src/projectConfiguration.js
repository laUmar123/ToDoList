import { allTasksBtnFunctionality } from "./addingTasks";
import { allProjects } from "./projectGenerator";
import { manuallySetActiveItem } from "./updatingNav";

/**
 * Hides or shows the project configuration options for the project it has been clicked on
 * @param {object} e self generated event object when used on an event listener 
 */
function toggleProjectConfiguration(e) {
    const getDataProjectValue = e.target.getAttribute('data-project')
    if (e.target.classList.contains('project-options')) {
        Array.from(document.querySelectorAll('.project-btns')).filter(btn => !btn.classList.contains(`project-${getDataProjectValue}`)).forEach(btn => btn.classList.add('hide'))
        document.querySelector(`.project-${getDataProjectValue}`).classList.toggle('hide');
    } else {
        document.querySelectorAll('.project-btns').forEach(btn => btn.classList.add('hide'));
    }
};

/**
 * If the user pressed delete this logic will run, and will remove the project from the allProjects array and remove it from the DOM
 * @param {object} e self generated event object when used on an event listener 
 */
function deleteProject(e) {
    const getProjectParentElement = e.target.closest('.project');
    if (e.target.classList.contains('delete-project-btn')) {
        getProjectParentElement.remove();
        allProjects.forEach((project, index) => {
            if (project.projectNum === Number(getProjectParentElement.dataset.project)) allProjects.splice(index, 1);
        });
        manuallySetActiveItem(document.querySelector('.nav-item'));
        allTasksBtnFunctionality();
    };
};

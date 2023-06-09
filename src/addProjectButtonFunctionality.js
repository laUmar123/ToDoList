/**
 * This function is used whenever the user presses the add project button, it blurs the background out, and hides or shows the project creation modal
 */
export function addProjectBtnFunc() {
    document.querySelector('#project-name-input').value = '';
    document.querySelector('.project-creation').classList.toggle('hide');
    document.querySelector('.container').classList.toggle('blurred-background');
};
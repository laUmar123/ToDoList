import './style.css';
import { projectModal } from './projectCreationModal';
import { generatePageHeader } from './pageHeaderGenerator';
import { generateDiv } from './commonGeneratorFunctions';
import { generateNav } from './navGenerator';
import { addProjectBtnFunc } from './addProjectButtonFunctionality';
import { createProjectBtnFunc, createProjectOnLoad } from './createProjectBtnFunc';
import { confirmRename, deleteProject, toggleProjectConfiguration, toggleProjectRename } from './projectConfiguration';
import { findAllTasksDueNextSevenDays, findAllTasksDueToday, updateActiveNavItem, updateActiveProject } from './updatingNav';
import { generateMain } from './mainGenerator';
import { addTaskBtnFunctionality, allTasksBtnFunctionality, cancelEditTaskBtnFunctionality, cancelTaskBtnFunctionality, createEditTaskBtnFunctionality, createTaskBtnFunctionality, deleteBtnFunctionality, editBtnFunctionality, importantBtnFunctionality, importantTaskBtnFunctionality } from './addingTasks';

const pageDiv = generateDiv(['container']);
const mainContainer = document.body;

pageDiv.append(generatePageHeader(), generateNav(), generateMain());
mainContainer.append(projectModal(), pageDiv);

const addProjectBtn = document.querySelector('.add-project'); //the add project button
const createProjectBtn = document.querySelector('.create-btn'); //the create button on the modal window
const cancelProjectBtn = document.querySelector('.cancel-btn'); //the cancel button on the modal window
const nav = document.querySelector('nav'); //selects the nav element
const addTaskBtn = document.querySelector('.add-task-btn'); //the add task button that appears on the main section
const allTasksBtn = document.querySelector('.all-tasks');
const todayBtn = document.querySelector('.today');
const nextSevenDaysBtn = document.querySelector('.next-seven-days');
const importantBtn = document.querySelector('.important');

addProjectBtn.addEventListener('click', addProjectBtnFunc);
cancelProjectBtn.addEventListener('click', addProjectBtnFunc);
createProjectBtn.addEventListener('click', createProjectBtnFunc);
document.documentElement.addEventListener('click', toggleProjectConfiguration);
document.documentElement.addEventListener('click', deleteProject);
document.documentElement.addEventListener('click', toggleProjectRename);
document.documentElement.addEventListener('click', confirmRename);
document.documentElement.addEventListener('click', updateActiveProject);
nav.addEventListener('click', updateActiveNavItem);
addTaskBtn.addEventListener('click', addTaskBtnFunctionality);
document.documentElement.addEventListener('click', createTaskBtnFunctionality);
document.documentElement.addEventListener('click', cancelTaskBtnFunctionality);
document.documentElement.addEventListener('click', editBtnFunctionality);
document.documentElement.addEventListener('click', deleteBtnFunctionality);
document.documentElement.addEventListener('click', cancelEditTaskBtnFunctionality);
document.documentElement.addEventListener('click', createEditTaskBtnFunctionality);
document.documentElement.addEventListener('click', importantTaskBtnFunctionality);
allTasksBtn.addEventListener('click', allTasksBtnFunctionality);
todayBtn.addEventListener('click', findAllTasksDueToday);
nextSevenDaysBtn.addEventListener('click', findAllTasksDueNextSevenDays);
importantBtn.addEventListener('click', importantBtnFunctionality);
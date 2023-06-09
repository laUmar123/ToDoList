import { generateDiv, generateHeading, generateParagraph } from "./commonGeneratorFunctions";

export function generateNav() {
    const navContainer = document.createElement('nav');
    navContainer.append(generateHeading('h2', 'View Tasks'), navItemsContainer(), generateHeading('h2', 'Projects'), userProjectsContainer());
    return navContainer;
};


function navItemsContainer() {
    const navItemsContainer = generateDiv(['nav-items']);
    navItemsContainer.append(generateParagraph('<img src="./../src/assets/cabinet.png" />All Tasks', ['nav-item', 'active-nav-item', 'all-tasks']));
    navItemsContainer.append(generateParagraph('<img src="./../src/assets/today.png" />Today', ['nav-item', 'today']));
    navItemsContainer.append(generateParagraph('<img src="./../src/assets/seven-days.png" />Next 7 Days', ['nav-item', 'next-seven-days']));
    navItemsContainer.append(generateParagraph('<img src="./../src/assets/favourite.png" />Important', ['nav-item', 'important']));
    return navItemsContainer;
};

function userProjectsContainer() {
    const userProjects = generateDiv(['user-projects']);
    userProjects.append(generateHeading('h3', '<img src="./../src/assets/add.png" />Add Project', ['add-project']));
    return userProjects;
};
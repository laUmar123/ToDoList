import { generateHeading, generateImage } from "./commonGeneratorFunctions";

/**
 * a function that creates a contianer and appends all needed things into the container and returns it
 * @returns an element container that contains everything that should be in the header
 */
export function generatePageHeader() {
    const headerContainer = document.createElement('header');
    const title = generateHeading('h1', 'What<span>ToDo</span>', ['title'])
    title.prepend(generateImage('./../src/assets/checklist.png', 'A green circle with a white tick inside of it'));
    headerContainer.append(title);
    return headerContainer;
};
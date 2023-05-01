/**
 * A generator function that generates a button element with the specified classes and text
 * @param {Array} classes an array of strings, where each element is a class
 * @param {string} text the string that should be in the button 
 * @returns a button element
 */
function generateButton(classes, text) {
    const button = document.createElement('button');
    if (classes) button.classList.add(...classes);
    button.innerHTML = text;
    return button;
};

/**
 * Generates a <div> with the specified classes
 * @param {Array} classes an array of strings, where each element is a class
 * @returns a div element
 */
function generateDiv(classes) {
    const div = document.createElement('div');
    if (classes) div.classList.add(...classes);
    return div;
};

/**
 * Genereates a heading element that is of the specified size and classes
 * @param {string} size a string that specifies which element to use, e.g. 'h1'
 * @param {string} text the text the heading will display
 * @param {Array} classNames an array of strings, where each element is a class
 * @returns a heading element
 */
function generateHeading(size, text, classNames) {
    const heading = document.createElement(size);
    heading.innerHTML = text;
    if (classNames) heading.classList.add(...classNames);
    return heading;
};

/**
 * Generates an img element
 * @param {string} source a string that specifies the path to the image 
 * @param {string} alt an alternate text incase the image doesn't show
 * @param {Array} classNames an array of strings, where each element is a class
 * @returns 
 */
function generateImage(source, alt, classNames = false) {
    const img = document.createElement('img');
    img.setAttribute = ('alt', alt);
    if (classNames) img.classList.add(...classNames);
    img.src = source;
    return img;
};

/**
 * Generates a <p> element
 * @param {string} text the string text that would go inbetween the <p></p> elements
 * @param {Array} classes an array of strings, where each element is a class
 * @returns a <p></p> element
 */
function generateParagraph(text, classes) {
    const para = document.createElement('p');
    para.innerHTML = text;
    if (classes) para.classList.add(...classes);
    return para;
};

/**
 * this function adds all the passed attributes and their associated values into the element
 * @param {Element} element the element we want to set these attributes on
 * @param {Array} attributeAndValue an array of all the attributes and their associated values
 */
function setAttributes(element, attributeAndValue) {
    for (let [attribute, value] of attributeAndValue) {
        element.setAttribute(attribute, value);
    }
};

export { generateButton, generateDiv, generateHeading, generateImage, generateParagraph, setAttributes }
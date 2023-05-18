/**
 * A factory function used to generate instances of Task
 * @param {object} projectUnder the project that this task has been generated under 
 * @param {string} name the name of the task
 * @param {string} details details about the task
 * @param {Date} date the date the task is supposed to be completed by
 * @param {number} taskNo the task number based on the number of previous tasks
 * @param {boolean} isImportant a true or false value depending on whether or not the task is important
 * @returns an object that has a set of properties attached to it
 */
export function Task(projectUnder, name, details, date, taskNo, isImportant) {
    return { projectUnder, name, details, date, taskNo, isImportant }
}
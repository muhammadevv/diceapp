/**
 * An asynchronous task.
 * @typedef {Function} AsyncTask
 * @returns {Promise<void>}
 */

/**
 * A function that runs an asynchronous task.
 * @typedef {Function} RunAsyncTask
 * @returns {Promise<void>}
 */

/**
 * Runs a single instance of an asynchronous task without overlapping.
 *
 * @param {AsyncTask} asyncTask - The asynchronous task to be executed.
 * @returns {RunAsyncTask} - A function that, when called, runs the asyncTask if it is not already running.
 */
export function runSingleInstance(asyncTask) {
  let isTaskRunning = false;
  return async () => {
    if (isTaskRunning) {
      return;
    }

    isTaskRunning = true;
    try {
      await asyncTask();
    } catch (e) {
      console.error(e);
    } finally {
      isTaskRunning = false;
    }
  };
}

// module.exports = { runSingleInstance };

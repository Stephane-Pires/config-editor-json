import chalk from "chalk";

/**
 * Logs an error message to the console in bold red color.
 *
 * @param  args - The arguments to be logged as an error message.
 */
export const logError = (...args: Array<unknown>) =>
  console.error(chalk.bold.red(...args));

/**
 * Logs an informational message to the console in blue color.
 *
 * @param args - The arguments to be logged as an informational message.
 */
export const logInfo = (...args: Array<unknown>) =>
  console.log(chalk.blue(...args));

/**
 * Logs a valid message to the console in green color.
 *
 * @param  args - The arguments to be logged as a valid message.
 */
export const logValid = (...args: Array<unknown>) =>
  console.log(chalk.green(...args));

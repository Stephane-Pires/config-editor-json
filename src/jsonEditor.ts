import fs from "fs";
import path, { resolve } from "path";
import { writeFile } from "fs/promises";
import { logError, logValid } from "./utils/log";

/**
 * Retrieves and parses a JSON input file.
 *
 * @param filename - The name of the JSON input file.
 * @returns The parsed JSON data, or null if an error occurred.
 */
export function retrieveJsonInput(
  filename: string
): Record<string, unknown> | null {
  try {
    const filePath = path.resolve(process.cwd(), "data", "inputs", filename);
    const jsonData = fs.readFileSync(filePath, "utf8");

    return JSON.parse(jsonData);
  } catch (error) {
    logError("Error reading JSON file:", error);
    return null;
  }
}

/**
 * Saves data as a JSON file to the specified location.
 *
 * @param  data - The data to be saved as JSON.
 * @param filename - The name of the output JSON file.
 */
export async function save(data: Record<string, unknown>, filename: string) {
  const filePath = resolve(process.cwd(), "data", "outputs", filename);
  const jsonData = JSON.stringify(data, null, 2);

  try {
    await writeFile(filePath, jsonData, "utf8");
    logValid("Changes saved to file:", filename);
  } catch (error) {
    logError("Error saving changes to file:", error);
  }
}

/**
 * Parses an input string and returns an array of matched substrings that correspond to the path of a json.
 *
 * @param inputString - The input string to parse.
 * @returns An array of matched substrings.
 */
export function parseKey(inputString: string): Array<string> {
  const pattern = /\b(?:[^[\].]+|\[\d+\])\b/g;
  const matches = inputString.match(pattern) || [];
  return matches;
}

/**
 * Applies modifications to a configuration object based on the provided modification object.
 *
 * @param configuration - The configuration object to be modified.
 * @param modification - An object specifying the modifications to be applied to the configuration object.
 */
export function applyModifications(
  configuration: Record<string, unknown>,
  modification: Record<string, any>
) {
  for (const key in modification) {
    try {
      const path = parseKey(key);

      const value = modification[key];

      modifyConfigAtPath(configuration, path, value);
    } catch (error) {
      logError("Error during application of modifications", error);
    }
  }
}

/**
 * Modifies a nested configuration object at the specified path by replacing the value at the path with the provided modification.
 *
 * @param  configuration - The configuration object to be modified.
 * @param  path - An array of keys representing the path to the value that needs to be modified.
 * @param  modification - The new value that will replace the existing value at the specified path.
 */
export function modifyConfigAtPath<
  T extends string | Array<any> | number | Record<string, unknown>
>(
  configuration: Record<string, any>,
  path: Array<string>,
  modification: T
): void {
  try {
    const lastKey = path.pop();

    path.forEach((pathKey) => {
      configuration = configuration[pathKey];
    });

    if (lastKey) {
      configuration[lastKey] = modification;
    }
  } catch (error) {
    logError(
      `The modification : ${modification} at path : ${path.join(
        "."
      )} has not been done. The error : ${error} occured`
    );
  }
}

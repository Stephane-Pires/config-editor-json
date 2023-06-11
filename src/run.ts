import { applyModifications, retrieveJsonInput, save } from "./jsonEditor";
import { logInfo } from "./utils/log";

logInfo("Program started at :", new Date());

const jsonConfiguration = retrieveJsonInput("configuration.json");
const jsonModification = retrieveJsonInput("modification.json");

if (jsonConfiguration !== null && jsonModification !== null) {
  applyModifications(jsonConfiguration, jsonModification);

  save(jsonConfiguration, "output.json");
}

import { intro, outro } from "@clack/prompts";
import { OUTRO_MESSAGE, WELCOME_MESSAGE } from "./texts.js";
import { readFile, writeFile } from "fs/promises";
import {
  createReplaceValuesEntryFromUser,
  userWantsToAddMoreTemplateValues,
} from "./inputUtils.js";
import { replaceTemplateItem } from "./replaceTemplateItem.js";

type personalitextOptions = {
  /** The path to the template file */
  filePath: string;
};

export async function personalitext({ filePath }: personalitextOptions) {
  /**
   * Dictionary to store the replace template and the values to replace it with
   * Example:
   * { "{{ word }}": ["Eating", "Sleeping", "Doing sport"] }
   */
  const replaceValuesDictionary: Record<string, string[]> = {};

  intro(WELCOME_MESSAGE);

  do {
    const replaceValuesEntry = await createReplaceValuesEntryFromUser();
    const [replaceTemplate, replaceValues] = replaceValuesEntry;

    // Store the replace template and the values to replace it with in the dictionary
    replaceValuesDictionary[replaceTemplate] = replaceValues;
  } while (await userWantsToAddMoreTemplateValues());

  const templateFileContent = await readFile(filePath, "utf-8");

  let results = [templateFileContent];

  const replaceEntries = Object.entries(replaceValuesDictionary);

  for (const [templateItem, replaceValues] of replaceEntries) {
    if (templateFileContent.match(templateItem) === null) continue;

    results = replaceTemplateItem(results, templateItem, replaceValues);
  }

  const writableResult = results.join("\n");
  const outputFilePath = filePath.replace(".txt", "-personalized.txt");

  await writeResultToFilePath(writableResult, outputFilePath);

  outro(OUTRO_MESSAGE + outputFilePath);
}

async function writeResultToFilePath(result: string, filePath: string) {
  return await writeFile(filePath, result, { encoding: "utf-8", flag: "a" });
}

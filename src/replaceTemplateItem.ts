/**
 * This function is used to generate the new results from the template entry.
 * It will replace the template with the values provided in each of the templateContentStrings.
 */
export const replaceTemplateItem = (
  templateContents: string[],
  templateItem: string,
  replaceValues: string[]
) => {
  return templateContents.reduce((acc, result) => {
    const newResults = replaceValues.map((replaceValue) =>
      result.replace(templateItem, replaceValue)
    );

    return [...acc, ...newResults];
  }, [] as string[]);
};

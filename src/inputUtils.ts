/**
 * This file contains functions that are used to get input from the user.
 */

import { outro, text, confirm, isCancel } from "@clack/prompts";
import {
  CANCEL_MESSAGE,
  EMPTY_STRING_VALIDATION_MESSAGE,
  REPLACE_TEMPLATE_MESSAGE,
  REPLACE_TEMPLATE_PLACEHOLDER,
  REPLACE_VALUES_MESSAGE,
  REPLACE_VALUES_PLACEHOLDER,
} from "./texts.js";

/**
 * Gets input from the user to create a replace values entry.
 * It will ask for the template and the values to replace it with.
 */
export const createReplaceValuesEntryFromUser = async () => {
  const replaceTemplate = await text({
    message: REPLACE_TEMPLATE_MESSAGE,
    placeholder: REPLACE_TEMPLATE_PLACEHOLDER,
    initialValue: REPLACE_TEMPLATE_PLACEHOLDER,

    validate(value) {
      if (!value) return EMPTY_STRING_VALIDATION_MESSAGE;
    },
  });

  if (isCancel(replaceTemplate)) {
    outro(CANCEL_MESSAGE);
    process.exit(1);
  }

  const replaceValues = await text({
    message: REPLACE_VALUES_MESSAGE,
    placeholder: REPLACE_VALUES_PLACEHOLDER,
    initialValue: REPLACE_VALUES_PLACEHOLDER,

    validate(value) {
      if (!value) return EMPTY_STRING_VALIDATION_MESSAGE;
    },
  });

  if (isCancel(replaceValues)) {
    outro(CANCEL_MESSAGE);
    process.exit(1);
  }

  const replaceValuesArray = String(replaceValues)
    .split(",")
    .map((value) => value.trim());

  return [replaceTemplate, replaceValuesArray] as const;
};

export const userWantsToAddMoreTemplateValues = async () => {
  const shouldContinue = await confirm({
    message: "Do you want to add another word to replace?",
    active: "Yes",
    inactive: "No",
  });

  if (isCancel(shouldContinue)) {
    outro(CANCEL_MESSAGE);
    process.exit(1);
  }

  return shouldContinue;
};

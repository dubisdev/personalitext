import { existsSync } from "fs";

export const ensureInitArgs = (args: string[]) => {
  // there must be at least 1 arg, the file path that must exist
  if (args.length < 1) {
    console.error("Please provide a file path");
    process.exit(1);
  }

  // get the file path
  const filePath = args[0];

  // check if the file exists
  if (!existsSync(filePath)) {
    console.error(`File ${filePath} does not exist`);
    process.exit(1);
  }

  return { filePath };
};

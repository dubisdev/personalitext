import { ensureInitArgs } from "./ensureInitArgs.js";
import { personalitext } from "./personalitext.js";

const args = process.argv.slice(2);
const { filePath } = ensureInitArgs(args);

personalitext({ filePath });

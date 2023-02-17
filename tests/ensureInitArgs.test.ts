import { describe, it, expect, vi } from "vitest";
import { ensureInitArgs } from "../src/ensureInitArgs.js";

describe("ensureInitArgs", () => {
  it("should return an object with a filePath property", () => {
    const args = ["./tests/test.txt"];
    const { filePath } = ensureInitArgs(args);
    expect(filePath).toBeTruthy();
    expect(filePath).toBe(args[0]);
  });

  it("should call process.exit when no args are provided", () => {
    vi.spyOn(process, "exit").mockImplementation(() => [] as never);
    vi.spyOn(console, "error");
    ensureInitArgs([]);
    expect(process.exit).toBeCalledTimes(2);
    expect(console.error).toBeCalledTimes(2);
  });

  it("should call process.exit when the file does not exist", () => {
    vi.spyOn(process, "exit").mockImplementation(() => [] as never);
    vi.spyOn(console, "error");
    ensureInitArgs(["./tests/doesNotExist.txt"]);
    expect(process.exit).toBeCalledTimes(1);
    expect(console.error).toBeCalledTimes(1);
  });
});

import { parseKey } from "../jsonEditor"; // Import the parseKey function from your implementation file

describe("parseKey", () => {
  test("should parse input string without array index", () => {
    const inputString = "page1.initialSettings.color";
    const expectedResult = ["page1", "initialSettings", "color"];
    const result = parseKey(inputString);
    expect(result).toEqual(expectedResult);
  });

  test("should parse input string with array index", () => {
    const inputString = "page1.data[0].value";
    const expectedResult = ["page1", "data", "0", "value"];
    const result = parseKey(inputString);
    expect(result).toEqual(expectedResult);
  });

  test("should handle empty input string", () => {
    const inputString = "";
    const expectedResult: string[] = [];
    const result = parseKey(inputString);
    expect(result).toEqual(expectedResult);
  });
});

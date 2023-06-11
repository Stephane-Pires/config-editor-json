import { retrieveJsonInput } from "../jsonEditor";

describe("retrieveJsonInput", () => {
  it("should retrieve and parse a valid JSON input file", () => {
    const filename = "test.json";
    const expectedData = { name: "John", age: 30 };

    const result = retrieveJsonInput(filename);

    expect(result).toEqual(expectedData);
  });

  it("should return null for a non-existing JSON file", () => {
    const filename = "non-existing-file.json";

    const result = retrieveJsonInput(filename);

    expect(result).toBeNull();
  });
});

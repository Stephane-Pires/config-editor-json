import { applyModifications } from "../jsonEditor";

describe("applyModifications", () => {
  let configuration: Record<string, unknown>;

  beforeEach(() => {
    configuration = {
      key1: "value1",
      key2: [10, 20],
      nested: {
        key1: "valueNested1",
        key2: ["valueNested2", "valueNested3"],
      },
    };
  });

  test("should apply modifications to the configuration object", () => {
    const modification = {
      key1: "modifiedValue1",
      "key2[0]": "modifiedValue2",
      "nested.key1": "modifiedValueNested1",
      "nested.key2[1]": { value: "modifiedValueNestedInsideObject" },
    };

    applyModifications(configuration, modification);

    expect(configuration).toEqual({
      key1: "modifiedValue1",
      key2: ["modifiedValue2", 20],
      nested: {
        key1: "modifiedValueNested1",
        key2: ["valueNested2", { value: "modifiedValueNestedInsideObject" }],
      },
    });
  });

  test("should log an error when an exception occurs", () => {
    const modification = {
      invalidKey: "value",
    };

    console.error = jest.fn();

    applyModifications(configuration, modification);

    expect(console.error).toHaveBeenCalled;
  });
});

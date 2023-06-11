import { modifyConfigAtPath } from "../jsonEditor";

describe("modifyConfigAtPath", () => {
  it("should modify a nested configuration object at the specified path", () => {
    const config = {
      foo: {
        bar: {
          baz: "oldValue",
        },
      },
    };

    const path = ["foo", "bar", "baz"];
    const modification = "newValue";

    modifyConfigAtPath(config, path, modification);

    expect(config.foo.bar.baz).toBe(modification);
  });

  it("should handle an empty path by not modifying the root configuration", () => {
    const config = {
      oldValue: "oldValue",
    };

    const path: string[] = [];
    const modification = "newValue";

    modifyConfigAtPath(config, path, modification);

    expect(config).toEqual({
      oldValue: "oldValue",
    });
  });

  it("should handle a non-existent path by not modifying the configuration", () => {
    const config = {
      foo: {
        bar: {
          baz: "oldValue",
        },
      },
    };

    const path = ["non", "existent", "path"];
    const modification = "newValue";

    modifyConfigAtPath(config, path, modification);

    expect(config).toEqual({
      foo: {
        bar: {
          baz: "oldValue",
        },
      },
    });
  });
});

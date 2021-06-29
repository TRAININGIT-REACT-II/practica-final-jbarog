import { objectMap } from "../object.helpers";

const TEST_OBJ = {a:'a',b:'b'};
const TEST_CALLBACK = value => "-"+value

describe('ObjectHelper', () => {
  describe("objectMap", () => {
    it("should map object", () => {
      const result = objectMap(TEST_OBJ,TEST_CALLBACK);
      expect(result).toEqual({a:TEST_CALLBACK('a'),b:TEST_CALLBACK('b')});
    });
  });
});

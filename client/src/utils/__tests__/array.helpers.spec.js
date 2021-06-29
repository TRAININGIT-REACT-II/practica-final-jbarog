import { arrayToObject, updateArrayIndex } from "../array.helpers";

const TEST_ARRAY = ['a','b'];
const TEST_CALLBACK = value => "-"+value

describe('ArrayHelper', () => {
  describe("arrayToObject", () => {
    it("should convert to object", () => {
      const result = arrayToObject(TEST_ARRAY);
      expect(result).toEqual({
        [TEST_ARRAY[0]]:TEST_ARRAY[0],
        [TEST_ARRAY[1]]:TEST_ARRAY[1]
      });
    });

    it("should parse and convert to object", () => {
      const result = arrayToObject(TEST_ARRAY,TEST_CALLBACK,TEST_CALLBACK);
      expect(result).toEqual({
        [TEST_CALLBACK(TEST_ARRAY[0])]:TEST_CALLBACK(TEST_ARRAY[0]),
        [TEST_CALLBACK(TEST_ARRAY[1])]:TEST_CALLBACK(TEST_ARRAY[1])
      });
    });
  });

  describe("updateArrayIndex", () => {
    let testArray;

    beforeEach(() => {
      testArray = [...TEST_ARRAY,'c'];
    });

    it("should replace index", () => {
      const result = updateArrayIndex(testArray,1,TEST_CALLBACK)
      expect(result).toEqual([
        testArray[0],
        TEST_CALLBACK(testArray[1]),
        testArray[2]
      ]);
    });
  });
});

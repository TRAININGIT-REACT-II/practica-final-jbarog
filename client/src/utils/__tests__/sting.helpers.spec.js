import { checkStringLength, templateReplace } from "../string.helpers";

const TEST_STRING = 'test';
const TEST_TEMPLATE = 'this is a ${value}';

describe('StringHelper', () => {
  describe("checkStringLength", () => {
    it("should check string", () => {
      const resultOK = checkStringLength(TEST_STRING,1,10);
      const resultLong = checkStringLength(TEST_STRING,1,2);
      const resultShort = checkStringLength(TEST_STRING,9,10);
      expect(resultOK).toBe(true);
      expect(resultLong).toBe(false);
      expect(resultShort).toBe(false);
    });
  });
  describe("templateReplace", () => {
    it("should replace template", () => {
      const result = templateReplace(TEST_TEMPLATE,{value:'test'});
      expect(result).toBe('this is a test');
    });
  });
});

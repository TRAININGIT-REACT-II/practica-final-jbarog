module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/../../../__mocks__/styleMock.js",
  },
};

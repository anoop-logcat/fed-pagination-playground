/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  displayName: "app-main",
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  collectCoverage: true,
  moduleFileExtensions: ["ts", "js"],
  coverageDirectory: "coverage",
  testTimeout: 120000,
};

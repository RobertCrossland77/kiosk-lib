/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { resolve } = require("path");

module.exports = {
  clearMocks: true,
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./src/singleton.ts"],
};

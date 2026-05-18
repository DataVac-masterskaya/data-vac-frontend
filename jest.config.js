/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },

moduleNameMapper: {
  "^@datavac/ui-kit$": "<rootDir>/node_modules/@datavac/ui-kit",
},
transformIgnorePatterns: [
  "node_modules/(?!(?:@datavac/ui-kit)/)"
],
}
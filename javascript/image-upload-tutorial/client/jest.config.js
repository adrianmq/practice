module.exports = {
  collectCoverageFrom: ["src/**/*.{js,jsx}", "!src/**/*.test.{js,jsx}"],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98
    }
  },
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: [
    // '<rootDir>/internals/testing/test-bundler.js',
    "react-testing-library/cleanup-after-each"
  ],
  setupFiles: ["raf/polyfill"],
  testRegex: "tests/.*\\.test\\.js$",
  snapshotSerializers: []
};

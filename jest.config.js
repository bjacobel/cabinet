module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['polyfills.js'],
  "moduleNameMapper": {
    "^.+\\.css$": "<rootDir>/mocks/stylesheets.js"
  },
  "testPathDirs": [
    "./tests"
  ],
  "testRegex": "tests/.*/.*-test.js$"
  moduleDirectories: [__dirname, 'node_modules', 'src'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['raf/polyfill', './jest.setup.js'],
  testURL: 'http://localhost',
};

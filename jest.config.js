module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['polyfills.js', '*.config.js', '.setup.js'],
  moduleNameMapper: {
    '^.+\\.css$': '<rootDir>/mocks/stylesheets.js',
  },
  testRegex: '**/__tests__/.*-test.js$',
  moduleDirectories: [__dirname, 'node_modules', 'src'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['raf/polyfill', './jest.setup.js'],
  testURL: 'http://localhost',
};

export default {
  testEnvironment: 'node',
  transform: {},
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov'],
  collectCoverageFrom: ['**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/'],
};

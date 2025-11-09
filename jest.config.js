export default {
  testEnvironment: 'node',
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/integration-tests/**/*.test.js'
   ],
  collectCoverageFrom: ['lib/**/*.js', '!lib/__tests__/**'],
}
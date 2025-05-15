export default {
  // Specify the environment the tests will run in
  testEnvironment: 'node',
  
  // Use of ESM as support
  transform: {},
  
  // Applying coverage for the project 
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/*.test.js',
    '!**/node_modules/**',
    '!jest.config.js',
    '!eslint.config.js',
    '!server.js',
    '!index.js'
  ],
  
  // The directory where Jest should output its coverage files after running the tests
  coverageDirectory: 'coverage',
  
  // A threshold that Jest will use to fail tests if at least 50% of the branches, functions, lines, and statements are not covered
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  
  // Formatting coverage for the output
  coverageReporters: ['text', 'html'],
  
  // Display tests with proper formatting
  verbose: true,
  
  // Applying test matching pattern for easier and more specific testing
  testMatch: ['**/__tests__/**/*.js', '**/*.test.js'],
  
  // Timeout for tests 
  testTimeout: 1000
}; 
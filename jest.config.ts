export default {
  preset: 'ts-jest',
  globals: { 'ts-jest': { diagnostics: false } },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '\\.(svg\\?react)$': 'identity-obj-proxy',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@common/(.*)$': '<rootDir>/common/$1',
  },
  collectCoverageFrom: ['<rootDir>/**/*.{ts, tsx}'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  roots: ['<rootDir>'],
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.(ts|tsx)$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
};

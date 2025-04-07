import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  modulePaths: ['<rootDir>/src/', '<rootDir>/.jest'],
  collectCoverageFrom: [
    'src/**/*.ts(x)?',
    '!./src/**/*.test.tsx',
    '!./src/app/**',
    '!./src/theme/**',
    '!./src/components/index.ts',
    '!./src/features/weather/components/index.ts',
    '!./src/features/weather/types/**',
    '!./src/features/weather/constants/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: ['**/__tests__/**/*.(test|spec).[jt]s?(x)'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  moduleNameMapper: {
    '^@actions/(.*)$': '<rootDir>/actions/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};

export default createJestConfig(config);

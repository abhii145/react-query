import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Use jsdom for DOM testing
    setupFiles: "./src/setupTests.js", // Test setup file
    globals: true, // Enable global test functions like "test" and "expect"
    include: [
      "**/*.test.{js,jsx,ts,tsx}", // Match test files
      "**/*.spec.{js,jsx,ts,tsx}",
    ],
    exclude: [
      "node_modules",
      ".next",
      "coverage",
      "src/components/Pagination.jsx",
      "src/pages/LandingPage.jsx",
      "src/pages/ProductListingPage.jsx",
    ],
    coverage: {
      enabled: true, // Enable coverage reporting
      reportsDirectory: "./coverage", // Output directory for coverage
      reporter: ["text", "html"], // Generate text and HTML coverage reports
      include: [
        "src/**/*.{js,jsx,ts,tsx}", // Include source files for coverage
        "lib/**/*.{js,jsx,ts,tsx}",
      ],
      exclude: [
        "**/node_modules/**",
        "**/.next/**",
        "**/coverage/**",
        "**/*.config.{js,ts}",
        "src/components/Pagination.jsx",
        "src/pages/LandingPage.jsx",
        "src/pages/ProductListingPage.jsx",
        "src/App.jsx",
        "src/main.jsx",
        "playwright/playwright.spec.js",
      ],
      threshold: {
        global: {
          statements: 77, // Enforce coverage thresholds
          branches: 70,
          functions: 75,
          lines: 77,
        },
      },
    },
    alias: {
      // Module name mappings (similar to `moduleNameMapper` in Jest)
      "@components": "./src/components",
      "@app": "./src/app",
    },
  },
})

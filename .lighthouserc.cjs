const LOCAL_URL = "http://localhost:3000";

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: "npm run start -- --port 3000",
      startServerReadyPattern: "Ready in",
      startServerReadyTimeout: 120000,
      url: [
        `${LOCAL_URL}/`,
        `${LOCAL_URL}/about`,
        `${LOCAL_URL}/about-portfolio`,
        `${LOCAL_URL}/projects`,
        `${LOCAL_URL}/services`,
        `${LOCAL_URL}/blog`,
        `${LOCAL_URL}/polite-email`,
        `${LOCAL_URL}/rio-calculator`,
        `${LOCAL_URL}/booking-confirmed`,
        `${LOCAL_URL}/impressum`,
        `${LOCAL_URL}/privacy`,
      ],
      settings: {
        budgetPath: "./lighthouse/budgets.json",
        chromeFlags: "--no-sandbox --disable-dev-shm-usage",
        extraHeaders: JSON.stringify({
          "Accept-Language": "en-US,en;q=0.9",
        }),
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      },
    },
    assert: {
      assertions: {
        "categories:performance": [
          "error",
          { minScore: 0.8, aggregationMethod: "median-run" },
        ],
        "categories:accessibility": [
          "error",
          { minScore: 0.95, aggregationMethod: "median-run" },
        ],
        "largest-contentful-paint": [
          "error",
          { maxNumericValue: 2500, aggregationMethod: "median-run" },
        ],
        "cumulative-layout-shift": [
          "error",
          { maxNumericValue: 0.1, aggregationMethod: "median-run" },
        ],
        "total-blocking-time": [
          "error",
          { maxNumericValue: 300, aggregationMethod: "median-run" },
        ],
        "performance-budget": "error",
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./lighthouse/reports",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%.report.%%EXTENSION%%",
    },
  },
};

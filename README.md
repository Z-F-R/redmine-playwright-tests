# Redmine Playwright Automation Tests


## Overview

This project contains automated end-to-end UI tests for `https://www.redmine.org`.

The framework is implemented using Playwright with TypeScript and follows the Page Object Model pattern. It includes custom Playwright fixtures, Allure reporting, and automated test execution through GitHub Actions.

The goal of the project is to verify key functionality of the Redmine website, including page availability, navigation, site search, documentation links, and release information.


## Tech Stack

* Playwright
* TypeScript
* Node.js
* Page Object Model
* Custom Playwright fixtures
* Allure Report
* GitHub Actions
* Chromium


## Project Structure

```text
redmine-playwright-tests/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── fixtures/
│   └── pages.fixture.ts
│
├── pages/
│   ├── BasePage.ts
│   ├── DownloadPage.ts
│   ├── HomePage.ts
│   ├── SearchResultsPage.ts
│   └── UserGuidePage.ts
│
├── test-plan/
│   └── Redmine_Test_Plan_and_Test_Cases.xlsx
│
├── tests/
│   └── redmine.spec.ts
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```


## Test Plan

The manual test plan is stored in:

```text
test-plan/Redmine_Test_Plan_and_Test_Cases.xlsx
```

The test case IDs in the document correspond to the IDs used in the automated tests and Allure Report.


## Automated Test Scenarios

| ID     | Test Scenario                                |
| ------ | -------------------------------------------- |
| TC-001 | Verify that the Home page opens successfully |
| TC-002 | Verify navigation to the Download page       |
| TC-003 | Verify search by a valid keyword             |
| TC-004 | Verify navigation to the User Guide page     |
| TC-005 | Verify the Latest releases section           |


## Framework Design


### Page Object Model

The project follows the Page Object Model pattern.

Page-specific locators, actions, and assertions are stored in separate classes inside the `pages` directory.

```ts
export class DownloadPage extends BasePage {
  async verifyPageOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/\/projects\/redmine\/wiki\/Download$/);
    await expect(this.pageHeading).toBeVisible();
  }
}
```

This approach provides:

* separation between test logic and page implementation;
* reusable page methods;
* improved readability;
* easier locator maintenance;
* reduced duplication.


### Base Page

Common page functionality is stored in `BasePage`.

```ts
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path: string): Promise<void> {
    await this.page.goto(path);
  }
}
```

Page classes inherit shared behavior from `BasePage`.


### Custom Fixtures

Custom Playwright fixtures create Page Object instances and provide them directly to tests.

```ts
test(
  'TC-002 Verify navigation to the Download page',
  async ({ homePage, downloadPage }) => {
    await homePage.clickDownloadLink();
    await downloadPage.verifyPageOpened();
  }
);
```

This removes repeated Page Object initialization from test files and ensures that all Page Objects use the same Playwright `page` instance.


## Installation


### Prerequisites

Install:

* Node.js
* npm
* Git


### Clone the repository

```bash
git clone <repository-url>
cd redmine-playwright-tests
```


### Install project dependencies

```bash
npm ci
```


### Install Chromium

```bash
npx playwright install chromium
```

Only Chromium is required for this project.

On a Linux CI environment, Chromium and its system dependencies can be installed with:

```bash
npx playwright install --with-deps chromium
```


## Running Tests


### Run all tests in headless mode

```bash
npm test
```


### Run tests in headed mode

```bash
npm run test:headed
```


### Run tests in debug mode

```bash
npm run test:debug
```


### Run tests in Playwright UI Mode

```bash
npm run test:ui
```


### Check TypeScript

```bash
npm run typecheck
```

The type check validates the TypeScript project without generating JavaScript files.


## Allure Reporting


### Clean previous Allure results and run tests

```bash
npm run test:allure
```


### Generate the Allure report

```bash
npm run allure:generate
```


### Open the generated report

```bash
npm run allure:open
```


### Generate and open the report

```bash
npm run allure:report
```

The Allure report includes:

* test execution status;
* test steps;
* Epic, Feature, and Story hierarchy;
* severity;
* owner;
* tags;
* failure details;
* screenshots, videos, and traces when available.


## Playwright Configuration

The framework is configured to:

* run tests using Chromium;
* execute tests in parallel locally;
* use one worker in CI;
* retry failed tests twice in CI;
* capture screenshots only on failure;
* retain videos for failed tests;
* record a trace on the first retry;
* generate Allure result files.


## CI/CD Pipeline

GitHub Actions automatically runs the test suite on pushes and pull requests to the `main` branch.

The pipeline:

1. Installs project dependencies.
2. Installs Chromium and required system dependencies.
3. Runs TypeScript type checking.
4. Executes Playwright tests.
5. Restores Allure history from the previous run.
6. Generates a new Allure report.
7. Publishes the report to the `gh-pages` branch.
8. Deploys the report through GitHub Pages.


## Allure Report

The latest Allure test report is available on GitHub Pages:

[View Allure Report](https://z-f-r.github.io/redmine-playwright-tests/)


## Test Artifacts

The following local runtime directories are excluded from Git:

```text
test-results/
playwright-report/
allure-results/
allure-report/
```

These directories are generated automatically during test execution and report generation.
import { test } from '@fixtures/pages.fixture';
import * as allure from 'allure-js-commons';

test.describe('Redmine home page', () => {
    test.beforeEach(async () => {
        await allure.epic('Redmine Web Application');
        await allure.feature('Home Page');
        await allure.owner('Z-F-R');
        await allure.tags('UI', 'Regression');
    });

    test('TC-001 Verify that the Home page opens successfully', async ({ homePage }) => {
        await allure.story('Home page availability');
        await allure.severity('critical');

        await test.step('Verify that the Home page is opened', async () => {
            await homePage.openHomePage();
            await homePage.verifyPageOpened();
        });
    });

    test('TC-002 Verify navigation to the Download page', async ({ homePage, downloadPage }) => {
        await allure.story('Download page navigation');
        await allure.severity('normal');

        await test.step('Click the Download link', async () => {
            await homePage.openHomePage();
            await homePage.clickDownloadLink();
        });

        await test.step('Verify that the Download page is opened', async () => {
            await downloadPage.verifyPageOpened();
        });
    });

    test('TC-003 Verify search by valid keyword', async ({ homePage, searchResultsPage }) => {
        const searchQuery = 'installation';

        await allure.story('Site search');
        await allure.severity('normal');
        await allure.tags('Search');

        await test.step(`Search for the "${searchQuery}" keyword`, async () => {
            await homePage.openHomePage();
            await homePage.searchFor(searchQuery);
        });

        await test.step('Verify that the Search page is opened', async () => {
            await searchResultsPage.verifyPageOpened(searchQuery);
        });

        await test.step('Verify that at least one search result is displayed', async () => {
            await searchResultsPage.verifyAtLeastOneResultIsDisplayed();
        });
    });

    test('TC-004 Verify navigation to the User Guide page', async ({ homePage, userGuidePage }) => {
        await allure.story('User Guide navigation');
        await allure.severity('normal');

        await test.step("Click the User's Guide link", async () => {
            await homePage.openHomePage();
            await homePage.clickUserGuideLink();
        });

        await test.step('Verify that the User Guide page is opened', async () => {
            await userGuidePage.verifyPageOpened();
        });
    });

    test('TC-005 Verify the Latest releases section', async ({ homePage, downloadPage }) => {
        await allure.story('Latest releases');
        await allure.severity('minor');
        await allure.tags('Release');

        await test.step('Verify that the Latest releases section is visible', async () => {
            await homePage.openHomePage();
            await homePage.verifyLatestReleasesHeadingIsVisible();
        });

        await test.step('Verify that at least one release is displayed', async () => {
            await homePage.verifyAtLeastOneReleaseIsDisplayed();
        });

        await test.step('Open the first release link', async () => {
            await homePage.clickFirstReleaseLink();
        });

        await test.step('Verify that the corresponding Download page is opened', async () => {
            await downloadPage.verifyPageOpened();
        });
    });
});
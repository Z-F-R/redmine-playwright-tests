import { test as base } from '@playwright/test';
import { DownloadPage } from '@pages/DownloadPage';
import { HomePage } from '@pages/HomePage';
import { SearchResultsPage } from '@pages/SearchResultsPage';
import { UserGuidePage } from '@pages/UserGuidePage';

type PageFixtures = {
    homePage: HomePage;
    downloadPage: DownloadPage;
    searchResultsPage: SearchResultsPage;
    userGuidePage: UserGuidePage;
};

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);

        await homePage.openHomePage();
        await use(homePage);
    },

    downloadPage: async ({ page }, use) => {
        await use(new DownloadPage(page));
    },

    searchResultsPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page));
    },

    userGuidePage: async ({ page }, use) => {
        await use(new UserGuidePage(page));
    },
});

export { expect } from '@playwright/test';
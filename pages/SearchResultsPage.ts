import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {

    // ==================== Locators ====================

    readonly pageHeading: Locator;
    readonly searchInput: Locator;
    readonly searchResultLinks: Locator;

    constructor(page: Page) {
        super(page);
        this.pageHeading = page.locator('#content').getByRole('heading', { level: 2, name: 'Search', exact: true });
        this.searchInput = page.locator('#search-input');
        this.searchResultLinks = page.locator('#search-results').getByRole('link');
    }

    // ==================== Assertions ====================

    async verifyPageOpened(searchQuery: string): Promise<void> {
        await expect(this.page).toHaveURL(/\/search\?/);
        await expect(this.pageHeading).toBeVisible();
        await expect(this.searchInput).toHaveValue(searchQuery);
    }

    async verifyAtLeastOneResultIsDisplayed(): Promise<void> {
        await expect(this.searchResultLinks.first()).toBeVisible();
    }
}
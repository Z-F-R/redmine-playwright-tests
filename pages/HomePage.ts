import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    // ==================== Locators ====================

    readonly pageHeading: Locator;
    readonly downloadLink: Locator;
    readonly userGuideLink: Locator;
    readonly searchInput: Locator;
    readonly latestReleasesHeading: Locator;
    readonly latestReleaseLinks: Locator;

    constructor(page: Page) {
        super(page);
        this.pageHeading = page.locator('#header h1');
        this.downloadLink = page.getByRole('link', { name: 'Download', exact: true });
        this.userGuideLink = page.locator('#sidebar').getByRole('link', { name: "User's Guide", exact: true });
        this.searchInput = page.locator('#q');
        this.latestReleasesHeading = page.locator('#sidebar').getByRole('heading', { name: 'Latest releases', exact: true });
        this.latestReleaseLinks = page.locator('#sidebar a[href="/projects/redmine/wiki/Download"]');
    }

    // ==================== Actions ====================

    async openHomePage(): Promise<void> {
        await this.open('/');
    }

    async clickDownloadLink(): Promise<void> {
        await this.downloadLink.click();
    }

    async clickUserGuideLink(): Promise<void> {
        await this.userGuideLink.click();
    }

    async searchFor(query: string): Promise<void> {
        await this.searchInput.fill(query);
        await this.searchInput.press('Enter');
    }

    async clickFirstReleaseLink(): Promise<void> {
        await this.latestReleaseLinks.first().click();
    }

    // ==================== Assertions ====================

    async verifyPageOpened(): Promise<void> {
        await expect(this.page).toHaveURL('/');
        await expect(this.pageHeading).toHaveText('Redmine');
    }

    async verifyLatestReleasesHeadingIsVisible(): Promise<void> {
        await expect(this.latestReleasesHeading).toBeVisible();
    }

    async verifyAtLeastOneReleaseIsDisplayed(): Promise<void> {
        const releaseCount = await this.latestReleaseLinks.count();
        expect(releaseCount).toBeGreaterThan(0);
        await expect(this.latestReleaseLinks.first()).toBeVisible();
    }
}
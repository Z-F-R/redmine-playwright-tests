import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DownloadPage extends BasePage {

    // ==================== Locators ====================

    readonly pageHeading: Locator;
    readonly latestReleasesHeading: Locator;

    constructor(page: Page) {
        super(page);
        this.pageHeading = page.locator('#content').getByRole('heading', { name: 'Download', exact: true });
        this.latestReleasesHeading = page.locator('#content').getByRole('heading', { name: 'Latest releases', exact: true });
    }

    // ==================== Actions ====================

    async openDownloadPage(): Promise<void> {
        await this.open('/projects/redmine/wiki/Download');
    }

    // ==================== Assertions ====================

    async verifyPageOpened(): Promise<void> {
        await expect(this.page).toHaveURL(/\/projects\/redmine\/wiki\/Download$/);
        await expect(this.pageHeading).toBeVisible();
        await expect(this.latestReleasesHeading).toBeVisible();
    }
}
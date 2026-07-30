import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class UserGuidePage extends BasePage {

    // ==================== Locators ====================

    readonly pageHeading: Locator;
    readonly userGuideHeading: Locator;
    readonly gettingStartedLink: Locator;

    constructor(page: Page) {
        super(page);
        this.pageHeading = page.locator('#content').getByRole('heading', { level: 1, name: 'Redmine guide', exact: true });
        this.userGuideHeading = page.locator('#content').getByRole('heading', { level: 2, name: 'User guide', exact: true });
        this.gettingStartedLink = page.locator('#content').getByRole('link', { name: 'Getting Started', exact: true });
    }

    // ==================== Actions ====================

    async openUserGuidePage(): Promise<void> {
        await this.open('/projects/redmine/wiki/Guide');
    }

    // ==================== Assertions ====================

    async verifyPageOpened(): Promise<void> {
        await expect(this.page).toHaveURL(/\/projects\/redmine\/wiki\/Guide$/);
        await expect(this.pageHeading).toBeVisible();
        await expect(this.userGuideHeading).toBeVisible();
        await expect(this.gettingStartedLink).toBeVisible();
    }
}
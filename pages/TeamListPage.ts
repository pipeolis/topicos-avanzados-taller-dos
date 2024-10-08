import { Page, Locator } from '@playwright/test';

export class TeamListPage {
    private buttonNewTeam: Locator;

    constructor(page: Page) {
        this.buttonNewTeam = page.locator('button[value="team"][name="newTop"]');
    }

    async createNewTeam() {
        await this.buttonNewTeam.click();
    }
}

export default TeamListPage;
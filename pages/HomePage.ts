import { Page, Locator } from '@playwright/test';

export class HomePage {
    private buttonTeamBuilder: Locator;
    private h2RoomBuilder: Locator;

    constructor(private page: Page) {
        this.h2RoomBuilder = this.page.locator('h2.rooms-officialchatrooms');
        this.buttonTeamBuilder = this.page.locator('button[value="teambuilder"]');
    }

    async navigate() {
        await this.page.goto('https://play.pokemonshowdown.com/');
    }

    async openTeamBuilder() {
        await this.h2RoomBuilder.waitFor({ state: 'visible' });
        await this.buttonTeamBuilder.click();
    }
}

export default HomePage;

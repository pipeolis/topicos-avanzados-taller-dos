import {Page, Locator, expect} from '@playwright/test';

export class PokemonDetailsPage {
    private page: Page;
    private inputItem: Locator;
    private inputAbility: Locator;
    private moves: { [key: string]: Locator };
    private buttonStats: Locator;
    private evStats: { [key: string]: Locator };
    private selectIVSpread: Locator;
    private remaining: Locator;
    private buttonBack: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputItem = page.locator('input[name="item"]');
        this.inputAbility = page.locator('input[name="ability"]');
        this.moves = this.initializeMoves();
        this.evStats = this.initializeEVStats();
        this.buttonStats = page.locator('button[name="stats"]');
        this.selectIVSpread = page.locator('select[name="ivspread"]');
        this.remaining = page.locator('div.totalev em');
        this.buttonBack = page.locator('button[name="back"]');
    }

    private initializeMoves() {
        return ['move1', 'move2', 'move3', 'move4'].reduce((acc, move) => {
            acc[move] = this.page.locator(`input[name="${move}"]`);
            return acc;
        }, {} as { [key: string]: Locator });
    }

    private initializeEVStats() {
        return ['hp', 'atk', 'def', 'spa', 'spd', 'spe'].reduce((acc, stat) => {
            acc[stat] = this.page.locator(`input[name="stat-${stat}"]`);
            return acc;
        }, {} as { [key: string]: Locator });
    }

    async selectItem(item: string) {
        await this.fillAndEnter(this.inputItem, item);
    }

    async selectAbility(ability: string) {
        await this.fillAndEnter(this.inputAbility, ability);
    }

    async selectMoves(moves: { [key: string]: string }) {
        for (const [move, value] of Object.entries(moves)) {
            await this.fillAndEnter(this.moves[move], value);
        }
    }

    async setEVStats(evStats: { [key: string]: string }) {
        await this.buttonStats.click();
        for (const [stat, value] of Object.entries(evStats)) {
            await this.fillAndEnter(this.evStats[stat], value);
        }
    }

    async setIVSpread(ivSpread: string) {
        await this.selectIVSpread.selectOption(ivSpread);
    }

    async verifyTotalEVCount() {
        await expect(this.remaining).toHaveText('0');
    }

    async goBackToTeam() {
        await this.buttonBack.click();
    }

    // Helper function to fill inputs and press Enter
    private async fillAndEnter(input: Locator, value: string) {
        await input.fill(value);
        await input.press('Enter');
    }
}

export default PokemonDetailsPage;

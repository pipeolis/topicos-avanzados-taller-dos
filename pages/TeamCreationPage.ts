import { Page, expect, Locator } from '@playwright/test';

export class TeamCreationPage {
    private page: Page;
    private buttonSelect: Locator;
    private inputSearchGen: Locator;
    private buttonAddPokemon: Locator;
    private inputSearchPokemon: Locator;
    private buttonValidate: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buttonSelect = page.locator('button[value="gen9"]');
        this.inputSearchGen = page.locator('input[name="search"]');
        this.buttonAddPokemon = page.locator('button[name="addPokemon"]');
        this.inputSearchPokemon = page.locator('input[name="pokemon"]');
        this.buttonValidate = page.locator('button[name="validate"]');
    }

    async selectFormat(format: string, gen: string) {
        await this.selectAndEnter(this.buttonSelect, this.inputSearchGen, format);
        const buttonSelector = this.page.locator(`button:has-text("${format}"):has-text("${gen}")`);
        await buttonSelector.click();
    }

    async addPokemon(pokemonName: string) {
        await this.selectAndEnter(this.buttonAddPokemon, this.inputSearchPokemon, pokemonName);
    }

    async validateTeam(format: string, gen: string) {
        await this.buttonValidate.click();
        const popup = this.page.locator('div.ps-popup');
        await expect(popup).toContainText(`Your team is valid for [${gen}] ${format}`);
    }

    // Helper function to reduce repetition
    private async selectAndEnter(button: Locator, input: Locator, value: string) {
        await button.click();
        await input.fill(value);
        await input.press('Enter');
    }
}

export default TeamCreationPage;

// 2 asserts
// EVS = 0, validate team 
// caso de uso
import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import TeamListPage from '../pages/TeamListPage';
import TeamCreationPage from '../pages/TeamCreationPage';
import PokemonDetailsPage from '../pages/PokemonDetailsPage';
import * as testData from '../data/teamData.json';

test('Create Team', async ({ page }) => {
  test.slow();
  
  const homePage = new HomePage(page)
  const teamListPage = new TeamListPage(page)
  const teamCreationPage = new TeamCreationPage(page)
  const pokemonDetailsPage = new PokemonDetailsPage(page)

  await homePage.navigate();
  await homePage.openTeamBuilder();
  await teamListPage.createNewTeam();
  await teamCreationPage.selectFormat(testData.format, testData.gen);
  for (const pokemon of testData.pokemon) {
    await teamCreationPage.addPokemon(pokemon.name);
    await pokemonDetailsPage.selectItem(pokemon.item);
    await pokemonDetailsPage.selectAbility(pokemon.ability);
    await pokemonDetailsPage.selectMoves(pokemon.moves);
    await pokemonDetailsPage.setEVStats(pokemon.evStats);
    await pokemonDetailsPage.setIVSpread(pokemon.ivSpread);
    await pokemonDetailsPage.verifyTotalEVCount();

    await page.screenshot({ path: `screenshots/${pokemon.name}.png` });
    await pokemonDetailsPage.goBackToTeam();
  }

  await page.screenshot({ path: 'screenshots/team.png' });
  await teamCreationPage.validateTeam(testData.format, testData.gen);
});

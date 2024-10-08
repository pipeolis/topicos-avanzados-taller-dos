import { test } from '@playwright/test';
import HomePage from '../pages/HomePage';
import TeamListPage from '../pages/TeamListPage';
import TeamCreationPage from '../pages/TeamCreationPage';
import PokemonDetailsPage from '../pages/PokemonDetailsPage';
// @ts-ignore
import * as testData from '../data/teamData.json';

test('Create Team', async ({ page }) => {
  const homePage = new HomePage(page);
  const teamListPage = new TeamListPage(page);
  const teamCreationPage = new TeamCreationPage(page);
  const pokemonDetailsPage = new PokemonDetailsPage(page);

  // Navegar y abrir el constructor de equipos
  await homePage.navigate();
  await homePage.openTeamBuilder();

  // Crear un nuevo equipo
  await teamListPage.createNewTeam();
  await teamCreationPage.selectFormat(testData.format, testData.gen);

  // Agregar Pokémon y configurar detalles
  for (const pokemon of testData.pokemon) {
    await addPokemonToTeam(pokemon, teamCreationPage, pokemonDetailsPage, page);
  }

  // Validar el equipo creado
  await page.screenshot({ path: 'screenshots/team.png' });
  await teamCreationPage.validateTeam(testData.format, testData.gen);
});

// Función reutilizable para agregar Pokémon y configurar detalles
async function addPokemonToTeam(pokemon, teamCreationPage, pokemonDetailsPage, page) {
  await teamCreationPage.addPokemon(pokemon.name);
  await pokemonDetailsPage.selectItem(pokemon.item);
  await pokemonDetailsPage.selectAbility(pokemon.ability);
  await pokemonDetailsPage.selectMoves(pokemon.moves);
  await pokemonDetailsPage.setEVStats(pokemon.evStats);
  await pokemonDetailsPage.setIVSpread(pokemon.ivSpread);
  await pokemonDetailsPage.verifyTotalEVCount();

  // Tomar una captura de pantalla por cada Pokémon
  await page.screenshot({ path: `screenshots/${pokemon.name}.png` });
  await pokemonDetailsPage.goBackToTeam();
}

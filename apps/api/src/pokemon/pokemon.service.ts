import { Injectable } from '@nestjs/common';
import { AssetsService } from '../assets/assets.service';
import { getPokemonGender, getPokemonNumber, levelFromD20, randomFromArray, rarityFromD20 } from '../shared/utils';
import { enviromentsValue } from './pokemon.constants';
import { EnvironmentEntry, EnvironmentsMap, PokemonDataFile, PokemonEncounterSummary } from './pokemon.types';

@Injectable()
export class PokemonService {
  constructor(private readonly assetsService: AssetsService) {}

  private async readJson<T>(filename: string): Promise<T> {
    return this.assetsService.readJson<T>(filename);
  }

  getEnvironments(): EnvironmentsMap {
    return enviromentsValue;
  }

  async getRandomPokemon(environmentId: number): Promise<{ environment: string; rarity: number; pokemon: string | null; availablePokemon: string[] }> {
    if (environmentId < 1 || environmentId > 18) {
      throw new Error('Invalid environment ID. Must be between 1 and 18.');
    }

    const data = await this.readJson<PokemonDataFile>('data.json');
    const environment = enviromentsValue[environmentId];

    if (!environment) {
      throw new Error('Invalid environment ID. Must be between 1 and 18.');
    }

    const rarity = rarityFromD20();
    const pokemons = data.environments[environment]?.rarities[String(rarity)] ?? [];
    const pokemon = randomFromArray<string>(pokemons);

    return {
      environment,
      rarity,
      pokemon,
      availablePokemon: pokemons,
    };
  }

  async getEnvironmentPokemon(environmentId: number): Promise<{ environment: string; data: EnvironmentEntry | undefined }> {
    if (environmentId < 1 || environmentId > 18) {
      throw new Error('Invalid environment ID. Must be between 1 and 18.');
    }

    const data = await this.readJson<PokemonDataFile>('data.json');
    const environment = enviromentsValue[environmentId];

    if (!environment) {
      throw new Error('Invalid environment ID. Must be between 1 and 18.');
    }

    return {
      environment,
      data: data.environments[environment],
    };
  }

  async getPokemonEncounter(environmentId: number): Promise<PokemonEncounterSummary> {
    if (environmentId < 1 || environmentId > 18) {
      throw new Error('Invalid environment ID. Must be between 1 and 18.');
    }

    const data = await this.readJson<PokemonDataFile>('data.json');
    const environment = enviromentsValue[environmentId];

    if (!environment) {
      throw new Error('Invalid environment ID. Must be between 1 and 18.');
    }

    const rarity = rarityFromD20();
    const pokemons = data.environments[environment]?.rarities[String(rarity)] ?? [];
    const pokemon = randomFromArray<string>(pokemons);

    return {
      environment,
      rarity,
      pokemon,
      number: await getPokemonNumber(pokemon, this.readJson.bind(this)),
      level: levelFromD20(),
      gender: getPokemonGender(),
    };
  }
}

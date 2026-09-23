import { Injectable } from '@nestjs/common';
import { AssetsService } from '../assets/assets.service';
import { PrismaService } from '../prisma/prisma.service';
import { getPokemonGender, getPokemonNumber, getRandomNatureName, levelFromD20, randomFromArray, rarityFromD20 } from '../shared/utils';
import { enviromentsValue } from './pokemon.constants';
import { EnvironmentEntry, EnvironmentsMap, PokemonDataFile, PokemonEncounterSummary } from './pokemon.types';

@Injectable()
export class PokemonService {
  constructor(
    private readonly assetsService: AssetsService,
    private readonly prisma: PrismaService,
  ) {}

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

  async getPokemonEncounter(environmentId: number, userId?: number): Promise<PokemonEncounterSummary> {
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
    const number = await getPokemonNumber(pokemon, this.readJson.bind(this));
    const level = levelFromD20();
    const gender = getPokemonGender();
    const nature = await getRandomNatureName(this.readJson.bind(this));

    const encounter = {
      environment,
      rarity,
      pokemon,
      number,
      level,
      gender,
      nature,
    };

    if (userId) {
      await this.prisma.encounterLog.create({
        data: {
          userId,
          environment,
          rarity,
          pokemon,
          number,
          level: level.level,
          levelRoll: level.roll,
          gender,
          nature,
        },
      });
    }

    return encounter;
  }
}

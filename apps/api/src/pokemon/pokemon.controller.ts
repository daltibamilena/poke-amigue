import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller()
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('environments')
  getEnvironments(): Record<number, string> {
    return this.pokemonService.getEnvironments();
  }

  @Get('pokemon/:environmentId')
  async getRandomPokemon(
    @Param('environmentId', ParseIntPipe) environmentId: number,
  ) {
    return this.pokemonService.getRandomPokemon(environmentId);
  }

  @Get('environment/:environmentId')
  async getEnvironmentPokemon(
    @Param('environmentId', ParseIntPipe) environmentId: number,
  ) {
    return this.pokemonService.getEnvironmentPokemon(environmentId);
  }

  @Get('pokemon/encounter/:environmentId')
  async getPokemonEncounter(
    @Param('environmentId', ParseIntPipe) environmentId: number,
  ) {
    return this.pokemonService.getPokemonEncounter(environmentId);
  }
}

import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Get('pokemon/encounter/:environmentId')
  async getPokemonEncounter(
    @Param('environmentId', ParseIntPipe) environmentId: number,
    @CurrentUser() user: { id: number; username: string },
  ) {
    return this.pokemonService.getPokemonEncounter(environmentId, user.id);
  }
}

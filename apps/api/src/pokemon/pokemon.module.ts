import { Module } from '@nestjs/common';
import { AssetsService } from '../assets/assets.service';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  controllers: [PokemonController],
  providers: [AssetsService, PokemonService],
  exports: [PokemonService],
})
export class PokemonModule {}

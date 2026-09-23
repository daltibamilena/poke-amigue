import { getExperienceForLevel } from '../shared/utils';

export interface PokemonSpecies {
  caught: string;
  current: string;
}

export interface PokemonLevel {
  caught: number;
  current: number;
  evolved: number[];
}

export interface PokemonAttributeSet {
  STR: number;
  DEX: number;
  CON: number;
  INT: number;
  WIS: number;
  CHA: number;
}

export interface PokemonAttributes extends PokemonAttributeSet {
  increased: PokemonAttributeSet;
  custom: PokemonAttributeSet;
}

export interface PokemonMove {
  pp: number;
  index: number;
}

export interface PokemonSeed {
  species: string;
  variant?: string;
  number_of_moves?: number;
}

export class Pokemon {
  species: PokemonSpecies;
  variant?: string;
  level: PokemonLevel;
  attributes: PokemonAttributes;
  nature: string;
  feats: string[];
  abilities: string[];
  exp: number;
  loyalty: number;
  hp: {
    max: number;
    current: number;
    edited: boolean;
    temp?: number;
  };
  moves: Record<string, PokemonMove>;
  version: number;

  static fromData(data: PokemonSeed): Pokemon {
    const p = new Pokemon();

    p.species = {
      caught: data.species,
      current: data.species,
    };

    p.variant = data.variant;
    p.level = {
      caught: 1,
      current: 1,
      evolved: [],
    };

    p.attributes = {
      STR: 0,
      DEX: 0,
      CON: 0,
      INT: 0,
      WIS: 0,
      CHA: 0,
      increased: {
        STR: 0,
        DEX: 0,
        CON: 0,
        INT: 0,
        WIS: 0,
        CHA: 0,
      },
      custom: {
        STR: 0,
        DEX: 0,
        CON: 0,
        INT: 0,
        WIS: 0,
        CHA: 0,
      },
    };

    p.nature = 'No Nature';
    p.feats = [];
    p.abilities = [];
    p.exp = getExperienceForLevel(p.level.caught - 1);
    p.loyalty = 0;
    p.hp = {
      max: 10,
      current: 10,
      edited: false,
    };
    p.moves = {};
    p.version = 9;

    return p;
  }

  getCurrentSpecies(): string {
    return this.species.current;
  }

  setCurrentLevel(level: number): void {
    this.level.current = level;
  }

  getCurrentLevel(): number {
    return this.level.current;
  }
}
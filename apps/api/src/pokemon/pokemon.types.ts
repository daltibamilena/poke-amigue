export type EnvironmentsMap = Record<number, string>;

export interface EnvironmentEntry {
  description: string;
  rarities: Record<string, string[]>;
}

export interface PokemonDataFile {
  rarity_scale?: Record<string, string>;
  environments: Record<string, EnvironmentEntry>;
}

export interface PokemonEncounterSummary {
  environment: string;
  rarity: number;
  pokemon: string | null;
  number: number | null;
  level: { level: string; roll: number };
  gender: string;
  nature: string | null;
}

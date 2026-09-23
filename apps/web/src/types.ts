export type HealthResponse = {
  status: string;
  service: string;
};

export type PokemonRouteResponse = {
  environment?: string;
  rarity?: number;
  pokemon?: string | null;
  availablePokemon?: string[];
  data?: unknown;
  number?: number | null;
  level?: { level: string; roll: number };
  gender?: string;
  nature?: string | null;
};

export type EnvironmentOption = {
  id: number;
  label: string;
};

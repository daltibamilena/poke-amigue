import { EnvironmentOption, HealthResponse, PokemonRouteResponse } from './types';

export const API_BASE = 'http://localhost:3000';

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

export async function fetchEnvironments(): Promise<EnvironmentOption[]> {
  const res = await fetch(`${API_BASE}/environments`);
  const data = await res.json();

  const entries = Object.entries(data ?? {}) as Array<[string, string]>;

  return entries
    .map(([id, label]) => ({ id: Number(id), label }))
    .sort((a, b) => a.id - b.id);
}

export async function fetchPokemonEncounter(
  environmentId: number,
): Promise<PokemonRouteResponse> {
  const res = await fetch(`${API_BASE}/pokemon/encounter/${environmentId}`);
  return res.json();
}

import {
  EnvironmentOption,
  HealthResponse,
  LoginResponse,
  PokemonRouteResponse,
  RegisterResponse,
} from './types';

export const API_BASE = 'http://localhost:3000';
export const AUTH_TOKEN_KEY = 'pokeamigue_token';

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Request failed');
  }

  return res.json() as Promise<T>;
}

export async function fetchHealth(): Promise<HealthResponse> {
  return request<HealthResponse>('/health');
}

export async function fetchEnvironments(): Promise<EnvironmentOption[]> {
  const data = await request<Record<string, string>>('/environments');

  const entries = Object.entries(data ?? {}) as Array<[string, string]>;

  return entries
    .map(([id, label]) => ({ id: Number(id), label }))
    .sort((a, b) => a.id - b.id);
}

export async function loginUser(
  username: string,
  password: string,
): Promise<LoginResponse> {
  return request<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function registerUser(
  username: string,
  password: string,
): Promise<RegisterResponse> {
  return request<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function fetchPokemonEncounter(
  environmentId: number,
  token?: string,
): Promise<PokemonRouteResponse> {
  return request<PokemonRouteResponse>(`/pokemon/encounter/${environmentId}`, {}, token);
}

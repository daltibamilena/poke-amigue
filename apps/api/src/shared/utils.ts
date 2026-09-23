export function randomFromArray<T>(arr: T[] | null | undefined): T | null {
  if (!arr || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getPokemonGender(): string {
  return randomFromArray(['male', 'female']) || 'male';
}

export function rarityFromD20(): number {
  const roll = Math.floor(Math.random() * 20) + 1;
  if (roll <= 12) return 1;
  if (roll <= 16) return 2;
  if (roll <= 19) return 3;
  return 4;
}

export function levelFromD20(): { level: string; roll: number } {
  const roll = Math.floor(Math.random() * 100) + 1;
  if (roll <= 36) return { level: 'inferior', roll };
  if (roll <= 40) return { level: 'inferior + 3 pokemons', roll };
  if (roll <= 76) return { level: 'igual', roll };
  if (roll <= 80) return { level: 'igual + 3 pokemons', roll };
  if (roll <= 96) return { level: 'superior', roll };
  return { level: 'superior + 3 pokemons', roll };
}

export async function getPokemonNumber(
  pokemonName: string | null,
  readJson: <T>(filename: string) => Promise<T>,
): Promise<number | null> {
  if (!pokemonName) {
    return null;
  }

  try {
    const data = await readJson<Record<string, number>>('pokemon-number.json');
    return data[pokemonName] ?? null;
  } catch (error) {
    console.error('Failed to read pokemon number data:', error);
    return null;
  }
}

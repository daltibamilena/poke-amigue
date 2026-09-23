export function randomFromArray<T>(arr: T[] | null | undefined): T | null {
  if (!arr || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

function normalizePokemonName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/['.]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function findPokemonFileData<T = Record<string, unknown>>(
  pokemonName: string | null,
  readJson: <U>(filename: string) => Promise<U>,
  listDirectory: (directory: string) => Promise<string[]>,
  directory = 'src/shared/data/pokemon',
): Promise<T | null> {
  if (!pokemonName) {
    return null;
  }

  const normalizedTarget = normalizePokemonName(pokemonName);

  try {
    const files = await listDirectory(directory);
    const match = files.find((file) => {
      const fileName = file.replace(/\.json$/i, '');
      return normalizePokemonName(fileName) === normalizedTarget;
    });

    if (!match) {
      return null;
    }

    return await readJson<T>(`${directory}/${match}`);
  } catch (error) {
    console.error('Failed to find pokemon data file:', error);
    return null;
  }
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

export async function getRandomNatureName(
  readJson: <T>(filename: string) => Promise<T>,
): Promise<string | null> {
  try {
    const data = await readJson<Record<string, Record<string, number>>>('natures.json');
    const names = Object.keys(data);
    return randomFromArray(names);
  } catch (error) {
    console.error('Failed to read natures data:', error);
    return null;
  }
}

export function getExperienceForLevel(level: number): number {
  // replace with your actual formula or lookup table
  return Math.floor(level * 40);
}

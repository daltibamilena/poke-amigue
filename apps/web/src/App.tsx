import { useEffect, useState } from 'react';

type HealthResponse = {
  status: string;
  service: string;
};

type PokemonRouteResponse = {
  environment?: string;
  rarity?: number;
  pokemon?: string | null;
  availablePokemon?: string[];
  data?: unknown;
  number?: number | null;
  level?: { level: string; roll: number };
  gender?: string;
};

const API_BASE = 'http://localhost:3000';

export default function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [environmentId, setEnvironmentId] = useState(1);
  const [result, setResult] = useState<PokemonRouteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeRoute, setActiveRoute] = useState('environments');

  useEffect(() => {
    fetch(`${API_BASE}/health`)
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch(() => setHealth({ status: 'offline', service: 'api' }));
  }, []);

  const fetchRoute = async (route: string) => {
    setActiveRoute(route);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/${route}${route.includes(':') ? '' : ''}`);
      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ environment: 'error', rarity: 0, pokemon: null, number: null, level: { level: 'error', roll: 0 }, gender: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonRoute = async (path: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}${path}`);
      const data = await res.json();
      setResult(data);
      setActiveRoute(path);
    } catch (error) {
      setResult({ environment: 'error', rarity: 0, pokemon: null, number: null, level: { level: 'error', roll: 0 }, gender: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEnvironmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setEnvironmentId(value);
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <h1>PokeAmigue</h1>
      <p>Frontend for the Pokémon API routes.</p>

      <div style={{ marginBottom: '1rem' }}>
        <strong>API status:</strong>{' '}
        {health ? `${health.status} (${health.service})` : 'Loading...'}
      </div>

      <section style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        <button onClick={() => fetchRoute('environments')} style={buttonStyle}>GET /environments</button>
        <button onClick={() => fetchPokemonRoute(`/pokemon/${environmentId}`)} style={buttonStyle}>GET /pokemon/:environmentId</button>
        <button onClick={() => fetchPokemonRoute(`/environment/${environmentId}`)} style={buttonStyle}>GET /environment/:environmentId</button>
        <button onClick={() => fetchPokemonRoute(`/pokemon/encounter/${environmentId}`)} style={buttonStyle}>GET /pokemon/encounter/:environmentId</button>
      </section>

      <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <label htmlFor="environmentId">Environment ID:</label>
        <input
          id="environmentId"
          type="number"
          min={1}
          max={18}
          value={environmentId}
          onChange={handleEnvironmentChange}
          style={{ width: '120px', padding: '0.5rem' }}
        />
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h2>Active route</h2>
        <p>{activeRoute}</p>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h2>Response</h2>
        {loading ? <p>Loading...</p> : <pre style={{ background: '#f4f4f4', padding: '1rem', overflow: 'auto' }}>{JSON.stringify(result, null, 2)}</pre>}
      </div>
    </main>
  );
}

const buttonStyle = {
  padding: '0.8rem 1rem',
  borderRadius: '8px',
  border: '1px solid #ddd',
  background: '#111827',
  color: '#fff',
  cursor: 'pointer',
} as const;

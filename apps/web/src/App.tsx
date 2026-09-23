import { useEffect, useState } from 'react';
import { fetchEnvironments, fetchHealth, fetchPokemonEncounter } from './api';
import { EncounterCard } from './components/EncounterCard';
import { EnvironmentOption, HealthResponse, PokemonRouteResponse } from './types';

export default function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [environmentOptions, setEnvironmentOptions] = useState<EnvironmentOption[]>([]);
  const [environmentId, setEnvironmentId] = useState<number | ''>('');
  const [result, setResult] = useState<PokemonRouteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeRoute, setActiveRoute] = useState('environments');

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [healthResponse, environments] = await Promise.all([
          fetchHealth(),
          fetchEnvironments(),
        ]);

        setHealth(healthResponse);
        setEnvironmentOptions(environments);
      } catch {
        setHealth({ status: 'offline', service: 'api' });
        setEnvironmentOptions([]);
      }
    };

    void loadInitialData();
  }, []);

  const fetchPokemonRoute = async (value: number) => {
    setLoading(true);
    try {
      const data = await fetchPokemonEncounter(value);
      setResult(data);
      setActiveRoute(`/pokemon/encounter/${value}`);
    } catch {
      setResult({
        environment: 'error',
        rarity: 0,
        pokemon: null,
        number: null,
        level: { level: 'error', roll: 0 },
        gender: 'error',
        nature: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEnvironmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    setEnvironmentId(value);

    if (!value) {
      setResult(null);
      return;
    }

    void fetchPokemonRoute(value);
  };

  return (
    <main
      style={{
        fontFamily: 'sans-serif',
        padding: '2rem',
        maxWidth: '1100px',
        margin: '0 auto',
        background: '#221b31',
        color: '#f9fafb',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{ color: '#f9fafb' }}>PokeAmigue</h1>
      <p style={{ color: '#d1d5db' }}>Frontend for the Pokémon API routes.</p>

      <div style={{ marginBottom: '1rem', color: '#e5e7eb' }}>
        <strong>API status:</strong>{' '}
        {health ? `${health.status} (${health.service})` : 'Loading...'}
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#f3f4f6',
        }}
      >
        <label htmlFor="environmentId" style={{ color: '#e5e7eb' }}>
          Environment:
        </label>
        <select
          id="environmentId"
          value={environmentId}
          onChange={handleEnvironmentChange}
          style={{
            width: '260px',
            padding: '0.5rem',
            background: '#1f2937',
            color: '#f9fafb',
            border: '1px solid #374151',
            borderRadius: '8px',
          }}
        >
          <option value="" style={{ background: '#1f2937', color: '#f9fafb' }}>
            Select an environment
          </option>
          {environmentOptions.map((option) => (
            <option
              key={option.id}
              value={option.id}
              style={{ background: '#1f2937', color: '#f9fafb' }}
            >
              {option.id} - {option.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '1.5rem', color: '#f3f4f6' }}>
        <h2 style={{ color: '#f9fafb' }}>Active route</h2>
        <p style={{ color: '#d1d5db' }}>{activeRoute}</p>
      </div>

      <div style={{ marginTop: '1.5rem', color: '#f3f4f6' }}>
        <h2 style={{ color: '#f9fafb' }}>Resultado</h2>
        <EncounterCard result={result} loading={loading} />
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

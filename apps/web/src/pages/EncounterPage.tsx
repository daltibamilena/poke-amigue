import { EncounterCard } from '../components/EncounterCard';
import { EnvironmentOption, HealthResponse, PokemonRouteResponse } from '../types';

type EncounterPageProps = {
  health: HealthResponse | null;
  environmentOptions: EnvironmentOption[];
  environmentId: number | '';
  result: PokemonRouteResponse | null;
  loading: boolean;
  activeRoute: string;
  username: string;
  onEnvironmentChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onLogout: () => void;
};

export function EncounterPage({
  health,
  environmentOptions,
  environmentId,
  result,
  loading,
  activeRoute,
  username,
  onEnvironmentChange,
  onLogout,
}: EncounterPageProps) {
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
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          background: '#2b1f36',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
        }}
      >
        <div>
          <strong style={{ color: '#f9fafb' }}>Logged in</strong>
          <div style={{ color: '#d1d5db' }}>Player: {username || 'trainer'}</div>
        </div>

        <button type="button" onClick={onLogout} style={buttonStyle}>
          Logout
        </button>
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
          onChange={onEnvironmentChange}
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

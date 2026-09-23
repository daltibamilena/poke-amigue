import type { PokemonRouteResponse } from '../types';

type EncounterCardProps = {
  result: PokemonRouteResponse | null;
  loading: boolean;
};

export function EncounterCard({ result, loading }: EncounterCardProps) {
  if (loading) {
    return <p style={{ color: '#f4eae8' }}>Loading...</p>;
  }

  if (!result) {
    return <p style={{ color: '#f4eae8' }}>No data yet.</p>;
  }

  return (
    <div style={cardStyle}>
      <div style={headerRowStyle}>
        <div>
          <div style={titleStyle}>Um pokémon vagabundo apareceu!</div>
          <div style={subtitleStyle}>
            O safado é um {result.pokemon ?? 'pokemon'} ({result.number ?? '-'})
          </div>
        </div>

        {result.number ? (
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.number}.png`}
            alt={result.pokemon ?? 'Pokemon'}
            style={spriteStyle}
          />
        ) : null}
      </div>

      <div style={fieldBlockStyle}>
        <div style={labelStyle}>Ambiente</div>
        <div style={valueStyle}>{result.environment ?? '-'}</div>
      </div>

      <div style={fieldBlockStyle}>
        <div style={labelStyle}>Raridade</div>
        <div style={valueStyle}>{result.rarity ?? '-'}</div>
      </div>

      <div style={levelRowStyle}>
        <div style={fieldBlockStyle}>
          <div style={labelStyle}>Level</div>
          <div style={valueStyle}>{result.level?.level ?? '-'}</div>
        </div>

        <div style={fieldBlockStyle}>
          <div style={labelStyle}>Level roll</div>
          <div style={valueStyle}>{result.level?.roll ?? '-'}</div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: '#2b1f36',
  color: '#f5e8ef',
  borderRadius: '12px',
  padding: '1rem 1.1rem',
  maxWidth: '360px',
  display: 'grid',
  gap: '0.7rem',
  boxShadow: '0 8px 18px rgba(0, 0, 0, 0.18)',
  fontFamily: 'sans-serif',
} as const;

const headerRowStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '0.75rem',
} as const;

const titleStyle = {
  fontSize: '0.98rem',
  fontWeight: 600,
  lineHeight: 1.4,
  marginBottom: '0.35rem',
} as const;

const subtitleStyle = {
  fontSize: '0.98rem',
  fontWeight: 500,
  color: '#f5d9d0',
  lineHeight: 1.4,
} as const;

const spriteStyle = {
  width: '92px',
  height: '92px',
  objectFit: 'contain',
  background: 'rgba(255,255,255,0.08)',
  borderRadius: '12px',
  padding: '0.2rem',
  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))',
} as const;

const fieldBlockStyle = {
  display: 'grid',
  gap: '0.15rem',
} as const;

const labelStyle = {
  fontSize: '0.9rem',
  color: '#f0d7d0',
  fontWeight: 600,
} as const;

const valueStyle = {
  fontSize: '0.9rem',
  color: '#f7f3f5',
  lineHeight: 1.5,
} as const;

const levelRowStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
} as const;

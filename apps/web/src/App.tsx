import { useEffect, useState } from 'react';

type HealthResponse = {
  status: string;
  service: string;
};

export default function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/health')
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch(() => setHealth({ status: 'offline', service: 'api' }));
  }, []);

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', lineHeight: 1.6 }}>
      <h1>Monorepo App</h1>
      <p>React frontend connected to the NestJS backend.</p>
      <div>
        <strong>API status:</strong>{' '}
        {health ? `${health.status} (${health.service})` : 'Loading...'}
      </div>
    </main>
  );
}

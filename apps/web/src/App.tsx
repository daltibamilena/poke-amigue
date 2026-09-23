import { useEffect, useMemo, useState } from 'react';
import {
  AUTH_TOKEN_KEY,
  fetchEnvironments,
  fetchHealth,
  fetchPokemonEncounter,
  loginUser,
  registerUser,
} from './api';
import { EnvironmentOption, HealthResponse, PokemonRouteResponse } from './types';
import { EncounterPage } from './pages/EncounterPage';
import { LoginPage } from './pages/LoginPage';

export default function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [environmentOptions, setEnvironmentOptions] = useState<EnvironmentOption[]>([]);
  const [environmentId, setEnvironmentId] = useState<number | ''>('');
  const [result, setResult] = useState<PokemonRouteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeRoute, setActiveRoute] = useState('environments');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return Boolean(window.localStorage.getItem(AUTH_TOKEN_KEY));
  });
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.localStorage.getItem(AUTH_TOKEN_KEY);
  });

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

  useEffect(() => {
    if (token) {
      window.localStorage.setItem(AUTH_TOKEN_KEY, token);
      setIsAuthenticated(true);
    } else {
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
      setIsAuthenticated(false);
    }
  }, [token]);

  const fetchPokemonRoute = async (value: number) => {
    setLoading(true);
    try {
      const data = await fetchPokemonEncounter(value, token ?? undefined);
      setResult(data);
      setActiveRoute(`/pokemon/encounter/${value}`);
    } catch (error) {
      setResult({
        environment: 'error',
        rarity: 0,
        pokemon: null,
        number: null,
        level: { level: 'error', roll: 0 },
        gender: 'error',
        nature: null,
      });
      setAuthError(error instanceof Error ? error.message : 'Unable to fetch encounter.');
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

    if (!token) {
      setAuthError('Please log in before accessing encounters.');
      return;
    }

    void fetchPokemonRoute(value);
  };

  const handleAuthSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setAuthError('Username and password are required.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    try {
      if (authMode === 'login') {
        const response = await loginUser(username.trim(), password);
        setToken(response.accessToken);
      } else {
        await registerUser(username.trim(), password);
        const response = await loginUser(username.trim(), password);
        setToken(response.accessToken);
      }

      setPassword('');
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Authentication failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setResult(null);
    setEnvironmentId('');
    setAuthError('');
  };

  if (!isAuthenticated) {
    return (
      <LoginPage
        authMode={authMode}
        username={username}
        password={password}
        authError={authError}
        authLoading={authLoading}
        onChangeMode={setAuthMode}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onSubmit={handleAuthSubmit}
      />
    );
  }

  return (
    <EncounterPage
      health={health}
      environmentOptions={environmentOptions}
      environmentId={environmentId}
      result={result}
      loading={loading}
      activeRoute={activeRoute}
      username={username || 'trainer'}
      onEnvironmentChange={handleEnvironmentChange}
      onLogout={handleLogout}
    />
  );
}

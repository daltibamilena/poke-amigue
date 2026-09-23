type LoginPageProps = {
  authMode: 'login' | 'register';
  username: string;
  password: string;
  authError: string;
  authLoading: boolean;
  onChangeMode: (mode: 'login' | 'register') => void;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
};

export function LoginPage({
  authMode,
  username,
  password,
  authError,
  authLoading,
  onChangeMode,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}: LoginPageProps) {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#221b31',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          background: '#2b1f36',
          borderRadius: '12px',
          padding: '1.5rem',
          width: '100%',
          maxWidth: '420px',
          display: 'grid',
          gap: '1rem',
          boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
        }}
      >
        <h1 style={{ margin: 0, color: '#f9fafb' }}>PokeAmigue</h1>
        <p style={{ margin: 0, color: '#d1d5db' }}>Enter to continue</p>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={() => onChangeMode('login')}
            style={{
              ...buttonStyle,
              background: authMode === 'login' ? '#6d28d9' : '#111827',
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => onChangeMode('register')}
            style={{
              ...buttonStyle,
              background: authMode === 'register' ? '#6d28d9' : '#111827',
            }}
          >
            Register
          </button>
        </div>

        <label style={{ display: 'grid', gap: '0.5rem' }}>
          <span style={{ color: '#e5e7eb' }}>Username</span>
          <input
            value={username}
            onChange={(event) => onUsernameChange(event.target.value)}
            placeholder="Enter username"
            style={inputStyle}
          />
        </label>

        <label style={{ display: 'grid', gap: '0.5rem' }}>
          <span style={{ color: '#e5e7eb' }}>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            placeholder="Enter password"
            style={inputStyle}
          />
        </label>

        {authError ? <p style={{ color: '#fca5a5', margin: 0 }}>{authError}</p> : null}

        <button type="submit" disabled={authLoading} style={{ ...buttonStyle, opacity: authLoading ? 0.7 : 1 }}>
          {authLoading ? 'Processing...' : authMode === 'login' ? 'Login' : 'Create account'}
        </button>
      </form>
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

const inputStyle = {
  padding: '0.75rem 0.85rem',
  borderRadius: '8px',
  border: '1px solid #374151',
  background: '#1f2937',
  color: '#f9fafb',
  fontSize: '1rem',
} as const;

import { useCallback, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useUserContext } from '../hooks/useUserContext';
import { authService } from '../services/authService';
import { createLogger } from '../services/logger';
import { LoginScreen } from '../components/auth/LoginScreen';
import { NavigatorAppShell } from '../components/shell/NavigatorAppShell';
import { NavigatorProvider } from './NavigatorContext';

const log = createLogger('App');

const DEFAULT_PREFS = { theme: 'dark', scale: 100, density: 'compact' } as const;

/**
 * Root component. Owns appearance (shared by login + shell) and the mock auth
 * gate, then mounts the Navigator context + shell once a user is present.
 */
export function App() {
  // Appearance lives here so the login screen and shell share one theme/scale.
  const appearance = useTheme(DEFAULT_PREFS);
  const { user, modules, loading, error, hasPermission } = useUserContext();
  const [signedIn, setSignedIn] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleSignIn = useCallback(async () => {
    setBusy(true);
    try {
      await authService.signIn();
      setSignedIn(true);
    } catch (err) {
      log.error('sign-in failed', { err: String(err) });
    } finally {
      setBusy(false);
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    await authService.signOut();
    setSignedIn(false);
  }, []);

  if (!signedIn) {
    return <LoginScreen appearance={appearance} onSignIn={handleSignIn} busy={busy} />;
  }

  if (loading || !user) {
    return <SplashState message={error ?? 'Loading Navigator…'} />;
  }

  return (
    <NavigatorProvider
      user={user}
      modules={modules}
      appearance={appearance}
      hasPermission={hasPermission}
      onSignOut={handleSignOut}
    >
      <NavigatorAppShell />
    </NavigatorProvider>
  );
}

function SplashState({ message }: { message: string }) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-2)',
        background: 'var(--bg)',
        fontSize: 13,
      }}
    >
      {message}
    </div>
  );
}

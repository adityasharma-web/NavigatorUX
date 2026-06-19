import type { Appearance } from '../../hooks/useTheme';
import { Icon } from '../common/Icon';
import { IconButton } from '../common/IconButton';
import { LogoMark } from '../shell/LogoMark';
import '../../styles/login.css';

export interface LoginScreenProps {
  appearance: Appearance;
  onSignIn: () => void;
  busy?: boolean;
}

/**
 * Login concept. No real auth — both buttons resolve the mock user and enter
 * the Navigator shell, establishing role/security context. Matches the app's
 * light/dark design language.
 */
export function LoginScreen({ appearance, onSignIn, busy }: LoginScreenProps) {
  return (
    <div className="login">
      <div className="login__brand">
        <LogoMark height={22} withWordmark />
      </div>

      <div className="login__theme">
        <IconButton
          title="Toggle theme"
          aria-label="Toggle theme"
          onClick={appearance.toggleTheme}
        >
          <Icon name={appearance.theme === 'dark' ? 'help' : 'security'} size={14} />
        </IconButton>
      </div>

      <div className="login__card">
        <div className="login__logo">
          <LogoMark height={40} />
        </div>
        <h1 className="login__title">Sign in to Sentient</h1>

        <button type="button" className="login__sso" onClick={onSignIn} disabled={busy}>
          <Icon name="lock" size={15} strokeWidth={2} />
          Continue with SSO (SAML)
        </button>
        <p className="login__hint">Standard sign-in for your organization</p>

        <div className="login__divider">
          <span />
          <em>OR</em>
          <span />
        </div>

        <label className="login__label" htmlFor="login-user">
          Username
        </label>
        <input id="login-user" className="login__input" defaultValue="a.almeida" readOnly />
        <label className="login__label" htmlFor="login-pass">
          Password
        </label>
        <input
          id="login-pass"
          className="login__input"
          type="password"
          defaultValue="********"
          readOnly
        />
        <button type="button" className="login__signin" onClick={onSignIn} disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </div>

      <div className="login__footer">
        Login concept — establishes user role &amp; security context before the Navigator shell
        loads. No real authentication is performed in this pre-alpha.
      </div>
    </div>
  );
}

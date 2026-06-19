import { Component, type ErrorInfo, type ReactNode } from 'react';
import { createLogger } from '../../services/logger';

const log = createLogger('ErrorBoundary');

interface Props {
  children: ReactNode;
}
interface State {
  error: Error | null;
}

/** Top-level boundary: logs render errors and shows a graceful fallback. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    log.error('render error', { message: error.message, stack: info.componentStack ?? undefined });
  }

  render(): ReactNode {
    if (this.state.error) {
      return (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 8,
            color: 'var(--text)',
            background: 'var(--bg)',
            fontFamily: 'system-ui, sans-serif',
            padding: 24,
            textAlign: 'center',
          }}
        >
          <strong>Something went wrong.</strong>
          <span style={{ color: 'var(--text-2)', fontSize: 13 }}>
            {this.state.error.message}
          </span>
          <button
            type="button"
            className="btn"
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

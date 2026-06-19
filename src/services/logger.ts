/**
 * Minimal structured logger.
 *
 * Emits a single structured record per call so logs stay greppable and could be
 * shipped to a real sink later. Swap the `sink` for a transport in production.
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogRecord {
  level: LogLevel;
  scope: string;
  message: string;
  ts: string;
  data?: Record<string, unknown>;
}

type Sink = (record: LogRecord) => void;

const consoleSink: Sink = (r) => {
  const line = `[${r.ts}] ${r.level.toUpperCase()} (${r.scope}) ${r.message}`;
  const fn =
    r.level === 'error' ? console.error : r.level === 'warn' ? console.warn : console.log;
  if (r.data) fn(line, r.data);
  else fn(line);
};

let sink: Sink = consoleSink;
export function setLogSink(next: Sink): void {
  sink = next;
}

export function createLogger(scope: string) {
  const emit = (level: LogLevel, message: string, data?: Record<string, unknown>) =>
    sink({ level, scope, message, ts: new Date().toISOString(), data });
  return {
    debug: (m: string, d?: Record<string, unknown>) => emit('debug', m, d),
    info: (m: string, d?: Record<string, unknown>) => emit('info', m, d),
    warn: (m: string, d?: Record<string, unknown>) => emit('warn', m, d),
    error: (m: string, d?: Record<string, unknown>) => emit('error', m, d),
  };
}

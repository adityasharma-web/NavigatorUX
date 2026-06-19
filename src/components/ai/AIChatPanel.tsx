import { useNavigator } from '../../app/NavigatorContext';
import { AiSparkleIcon } from '../common/AiSparkleIcon';
import { Icon } from '../common/Icon';
import { IconButton } from '../common/IconButton';

const SUGGESTED_PROMPTS = [
  'Summarize this object',
  'Show related records',
  'Explain current alerts',
];

/**
 * Placeholder "Navigator AI" panel. Intentionally inert — no LLM calls. The
 * boundary (context-aware intro, suggested prompts, composer) is the extension
 * point for a future LLM / MCP / tools integration. See README › AI extension.
 */
export function AIChatPanel() {
  const { shell, selection } = useNavigator();
  if (!shell.aiOpen) return null;

  const context = selection.details?.title ?? 'the current selection';

  return (
    <aside className="ai-panel" aria-label="Navigator AI">
      <div className="ai-panel__head">
        <div className="ai-panel__title">
          <AiSparkleIcon size={16} />
          Navigator AI
          <span className="ai-panel__beta">BETA</span>
        </div>
        <IconButton small plain title="Close" onClick={shell.toggleAi}>
          <Icon name="chevronRight" size={14} />
        </IconButton>
      </div>
      <div className="ai-panel__intro">Ask about {context}, the tree path, or loaded content.</div>
      <div className="ai-panel__prompts">
        <div className="menu-label" style={{ marginBottom: 1 }}>
          SUGGESTED PROMPTS
        </div>
        {SUGGESTED_PROMPTS.map((p) => (
          <button key={p} type="button" className="ai-prompt" disabled>
            <Icon name="arrowRight" size={12} />
            {p}
          </button>
        ))}
      </div>
      <div className="ai-panel__composer">
        <div className="ai-input">
          <span style={{ flex: 1 }}>Ask about this selection…</span>
          <Icon name="send" size={14} />
        </div>
        <div className="ai-note">Concept — not connected in this pre-alpha</div>
      </div>
    </aside>
  );
}

import { useNavigator } from '../../app/NavigatorContext';
import { AiSparkleIcon } from '../common/AiSparkleIcon';

/** Header trigger for the placeholder Navigator AI panel. */
export function AIChatButton() {
  const { shell } = useNavigator();
  return (
    <button
      type="button"
      className={`ai-btn${shell.aiOpen ? ' ai-btn--active' : ''}`}
      title="Ask Sentient"
      aria-pressed={shell.aiOpen}
      onClick={shell.toggleAi}
    >
      <AiSparkleIcon size={15} />
      <span className="ai-btn__label">Ask Sentient</span>
    </button>
  );
}

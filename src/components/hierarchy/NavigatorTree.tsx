import { useNavigator } from '../../app/NavigatorContext';
import { TreeNode } from './TreeNode';

/**
 * Renders the backend-driven hierarchy. Owns no tree data itself — it maps the
 * API-provided roots into recursive <TreeNode> rows and shows loading / empty
 * / filtered states.
 */
export function NavigatorTree() {
  const { tree, filters } = useNavigator();
  const filtering = filters.count > 0;

  return (
    <div className="tree" role="tree" aria-label="Object hierarchy">
      <div className="tree__status">
        <span className="tree__status-label">
          {filtering ? 'FILTERED RESULTS' : 'OBJECT TREE'}
        </span>
        <span className="tree__status-hint">backend-driven</span>
      </div>

      {tree.loading && <div className="tree__loading">Loading hierarchy…</div>}
      {tree.error && <div className="tree__empty">{tree.error}</div>}

      {!tree.loading && !tree.error && tree.nodes.length === 0 && (
        <div className="tree__empty">
          {filtering ? 'No nodes match the current filter.' : 'No hierarchy for this module.'}
        </div>
      )}

      {!tree.loading &&
        tree.nodes.map((node) => <TreeNode key={node.id} node={node} depth={0} />)}
    </div>
  );
}

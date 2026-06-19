import { useNavigator } from '../../app/NavigatorContext';
import type { TreeNode as TreeNodeModel } from '../../types';
import { Icon } from '../common/Icon';

export interface TreeNodeProps {
  node: TreeNodeModel;
  depth: number;
}

/**
 * Recursive tree row. Renders one node and, when expanded, its children.
 * Structure comes entirely from the (mock) API model — never hardcoded in JSX.
 */
export function TreeNode({ node, depth }: TreeNodeProps) {
  const { tree, selection, pinned, hasPermission } = useNavigator();

  const restricted = !!node.locked || !hasPermission(node.requiredPermission);
  const expandable = node.hasChildren;
  const expanded = tree.isExpanded(node.id);
  const selected = node.id === selection.selectedId;
  const isPinned = pinned.isPinned(node.id);

  const onActivate = () => {
    if (restricted) return;
    if (expandable) tree.toggleExpand(node.id);
    selection.select(node.id);
  };

  const classes = [
    'tree-node',
    selected ? 'tree-node--selected' : '',
    restricted ? 'tree-node--locked' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div
        className={classes}
        role="treeitem"
        aria-level={depth + 1}
        aria-expanded={expandable ? expanded : undefined}
        aria-selected={selected}
        title={node.label}
        style={{ paddingLeft: 8 + depth * 13, paddingRight: 6 }}
        onClick={onActivate}
        onContextMenu={(e) => {
          e.preventDefault();
          void pinned.toggle(node.id);
        }}
      >
        {expandable ? (
          <button
            type="button"
            className={`tree-node__caret${expanded ? ' tree-node__caret--open' : ''}`}
            aria-label={expanded ? 'Collapse' : 'Expand'}
            onClick={(e) => {
              e.stopPropagation();
              tree.toggleExpand(node.id);
            }}
          >
            <Icon name="chevronRight" size={9} strokeWidth={3.2} />
          </button>
        ) : (
          <span className="tree-node__spacer" aria-hidden="true" />
        )}

        <span className="tree-node__icon">
          <Icon name={node.type} size={13} strokeWidth={1.8} />
        </span>
        <span className="tree-node__label">{node.label}</span>

        {node.status === 'violation' && (
          <span className="status-dot status-dot--violation" title="Has violations" />
        )}
        {node.status === 'warning' && (
          <span className="status-dot status-dot--warning" title="Warning" />
        )}
        {isPinned && <Icon name="star" size={10} filled className="tree-node__pin" />}
        {restricted && <Icon name="lock" size={10} strokeWidth={2.2} className="tree-node__lock" />}
      </div>

      {expandable && expanded && node.children?.map((child) => (
        <TreeNode key={child.id} node={child} depth={depth + 1} />
      ))}
    </>
  );
}

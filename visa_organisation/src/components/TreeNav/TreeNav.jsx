import { useState } from 'react';
import './TreeNav.css';

function TreeNode({ enhet, level, selectedId, onSelect }) {
  const [expanded, setExpanded] = useState(level < 2);
  const hasChildren = enhet.enheter && enhet.enheter.length > 0;
  const isSelected = enhet.id === selectedId;

  const getTypeIcon = (typ) => {
    switch (typ) {
      case 'root': return '🏛️';
      case 'kategori': return '📁';
      case 'stab': return '⚙️';
      case 'forvaltning': return '🏢';
      case 'enhet': return '📋';
      case 'skola': return '🎓';
      case 'program': return '📚';
      case 'boende': return '🏠';
      default: return '📄';
    }
  };

  return (
    <div className="tree-node">
      <div
        className={`tree-node-content ${isSelected ? 'selected' : ''}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelect(enhet.id)}
      >
        {hasChildren ? (
          <button
            className="tree-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded ? '▼' : '▶'}
          </button>
        ) : (
          <span className="tree-toggle-placeholder" />
        )}
        <span className="tree-icon">{getTypeIcon(enhet.typ)}</span>
        <span className="tree-label">{enhet.namn}</span>
      </div>
      {hasChildren && expanded && (
        <div className="tree-children">
          {enhet.enheter.map((child) => (
            <TreeNode
              key={child.id}
              enhet={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TreeNav({ organisation, selectedId, onSelect }) {
  return (
    <div className="tree-nav">
      <div className="tree-nav-header">
        <h3>Organisation</h3>
      </div>
      <div className="tree-nav-content">
        <TreeNode
          enhet={organisation}
          level={0}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}

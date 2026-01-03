import './Layout.css';

export default function Layout({ sidebar, children }) {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1>Storstad Kommun</h1>
        <span className="subtitle">Organisationsöversikt</span>
      </header>
      <div className="layout-content">
        <aside className="layout-sidebar">
          {sidebar}
        </aside>
        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>
  );
}

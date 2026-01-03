import { useState } from 'react';
import EkonomiDashboard from './EkonomiDashboard';
import PersonalDashboard from './PersonalDashboard';
import ProduktionDashboard from './ProduktionDashboard';
import './Dashboard.css';

export default function Dashboard({
  enhet,
  ekonomiData,
  personalData,
  produktionData,
  kostnadsstallen,
  kontoplan
}) {
  const [activeTab, setActiveTab] = useState('ekonomi');

  const tabs = [
    { id: 'ekonomi', label: 'Ekonomi', icon: '💰' },
    { id: 'personal', label: 'Personal', icon: '👥' },
    { id: 'produktion', label: 'Produktion', icon: '📊' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="enhet-info">
          <h2>{enhet.namn}</h2>
          {enhet.chef && <p className="chef">Chef: {enhet.chef}</p>}
          <span className="typ-badge">{enhet.typ}</span>
        </div>
        <div className="tab-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-content">
        {activeTab === 'ekonomi' && (
          <EkonomiDashboard
            enhet={enhet}
            ekonomiData={ekonomiData}
            kostnadsstallen={kostnadsstallen}
            kontoplan={kontoplan}
          />
        )}
        {activeTab === 'personal' && (
          <PersonalDashboard
            enhet={enhet}
            personalData={personalData}
          />
        )}
        {activeTab === 'produktion' && (
          <ProduktionDashboard
            enhet={enhet}
            produktionData={produktionData}
          />
        )}
      </div>
    </div>
  );
}

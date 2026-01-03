import { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import TreeNav from './components/TreeNav/TreeNav';
import Dashboard from './components/Dashboard/Dashboard';
import { findEnhetById } from './utils/dataHelpers';
import './App.css';

function App() {
  const [organisation, setOrganisation] = useState(null);
  const [kontoplan, setKontoplan] = useState([]);
  const [kostnadsstallen, setKostnadsstallen] = useState([]);
  const [ekonomiData, setEkonomiData] = useState([]);
  const [personalData, setPersonalData] = useState([]);
  const [produktionData, setProduktionData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [org, konto, ks, ekon, pers, prod] = await Promise.all([
          fetch('/data/organisation.json').then(r => r.json()),
          fetch('/data/kontoplan.json').then(r => r.json()),
          fetch('/data/kostnadsstallen.json').then(r => r.json()),
          fetch('/data/ekonomi.json').then(r => r.json()),
          fetch('/data/personal.json').then(r => r.json()),
          fetch('/data/produktion.json').then(r => r.json())
        ]);

        setOrganisation(org);
        setKontoplan(konto);
        setKostnadsstallen(ks);
        setEkonomiData(ekon);
        setPersonalData(pers);
        setProduktionData(prod);
        setSelectedId(org.id);
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Kunde inte ladda data');
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Laddar data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <p>{error}</p>
      </div>
    );
  }

  const selectedEnhet = findEnhetById(organisation, selectedId);

  return (
    <Layout
      sidebar={
        <TreeNav
          organisation={organisation}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      }
    >
      {selectedEnhet && (
        <Dashboard
          enhet={selectedEnhet}
          ekonomiData={ekonomiData}
          personalData={personalData}
          produktionData={produktionData}
          kostnadsstallen={kostnadsstallen}
          kontoplan={kontoplan}
        />
      )}
    </Layout>
  );
}

export default App;

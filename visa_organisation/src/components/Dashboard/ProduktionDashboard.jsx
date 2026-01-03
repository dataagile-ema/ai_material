import TrendChart from '../Charts/TrendChart';
import '../Charts/Charts.css';
import { getProduktionDataForEnhet } from '../../utils/dataHelpers';

export default function ProduktionDashboard({ enhet, produktionData }) {
  const data = getProduktionDataForEnhet(produktionData, enhet.id);

  if (data.length === 0) {
    return (
      <div className="no-data">
        <div className="no-data-icon">📊</div>
        <p>Ingen produktionsdata tillgänglig för denna enhet</p>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
          Produktionsdata finns för skolor, äldreboenden, bibliotek m.fl.
        </p>
      </div>
    );
  }

  const latest = data[data.length - 1];
  const matt = latest.matt;

  // Bestäm vilken typ av verksamhet baserat på tillgängliga mått
  const isSkola = 'antalElever' in matt;
  const isAldreboende = 'antalPlatser' in matt;
  const isHemtjanst = 'antalBrukare' in matt;
  const isBibliotek = 'antalLan' in matt;
  const isFritid = 'antalBokningar' in matt;
  const isPlanBygg = 'antalArenden' in matt;
  const isGata = 'underhallnaVagar_km' in matt;

  return (
    <>
      <div className="stats-grid">
        {isSkola && (
          <>
            <div className="stat-card">
              <div className="label">Antal elever</div>
              <div className="value">{matt.antalElever}</div>
            </div>
            <div className="stat-card">
              <div className="label">Genomströmning</div>
              <div className="value">{(matt.genomstromning * 100).toFixed(0)}%</div>
            </div>
            <div className="stat-card">
              <div className="label">Nöjdhet</div>
              <div className="value">{matt.nojdhet}/5</div>
            </div>
            <div className="stat-card">
              <div className="label">Behöriga lärare</div>
              <div className="value">{(matt.behoriga_larare * 100).toFixed(0)}%</div>
            </div>
          </>
        )}

        {isAldreboende && (
          <>
            <div className="stat-card">
              <div className="label">Antal platser</div>
              <div className="value">{matt.antalPlatser}</div>
            </div>
            <div className="stat-card">
              <div className="label">Beläggning</div>
              <div className="value">{(matt.belaggning * 100).toFixed(0)}%</div>
            </div>
            <div className="stat-card">
              <div className="label">Nöjdhet</div>
              <div className="value">{matt.nojdhet}/5</div>
            </div>
            <div className="stat-card">
              <div className="label">Antal fall</div>
              <div className="value">{matt.antalFall}</div>
            </div>
          </>
        )}

        {isHemtjanst && (
          <>
            <div className="stat-card">
              <div className="label">Antal brukare</div>
              <div className="value">{matt.antalBrukare}</div>
            </div>
            <div className="stat-card">
              <div className="label">Timmar/vecka</div>
              <div className="value">{matt.timmarPerVecka.toLocaleString('sv-SE')}</div>
            </div>
            <div className="stat-card">
              <div className="label">Nöjdhet</div>
              <div className="value">{matt.nojdhet}/5</div>
            </div>
            <div className="stat-card">
              <div className="label">Kontinuitet</div>
              <div className="value">{(matt.kontinuitet * 100).toFixed(0)}%</div>
            </div>
          </>
        )}

        {isBibliotek && (
          <>
            <div className="stat-card">
              <div className="label">Antal besök</div>
              <div className="value">{matt.antalBesok.toLocaleString('sv-SE')}</div>
            </div>
            <div className="stat-card">
              <div className="label">Antal lån</div>
              <div className="value">{matt.antalLan.toLocaleString('sv-SE')}</div>
            </div>
            <div className="stat-card">
              <div className="label">Nöjdhet</div>
              <div className="value">{matt.nojdhet}/5</div>
            </div>
            <div className="stat-card">
              <div className="label">Digitala tjänster</div>
              <div className="value">{matt.digitalaTjanster.toLocaleString('sv-SE')}</div>
            </div>
          </>
        )}

        {isFritid && (
          <>
            <div className="stat-card">
              <div className="label">Antal besök</div>
              <div className="value">{matt.antalBesok.toLocaleString('sv-SE')}</div>
            </div>
            <div className="stat-card">
              <div className="label">Antal bokningar</div>
              <div className="value">{matt.antalBokningar}</div>
            </div>
            <div className="stat-card">
              <div className="label">Nöjdhet</div>
              <div className="value">{matt.nojdhet}/5</div>
            </div>
            <div className="stat-card">
              <div className="label">Beläggning</div>
              <div className="value">{(matt.belaggning * 100).toFixed(0)}%</div>
            </div>
          </>
        )}

        {isPlanBygg && (
          <>
            <div className="stat-card">
              <div className="label">Antal ärenden</div>
              <div className="value">{matt.antalArenden}</div>
            </div>
            <div className="stat-card">
              <div className="label">Handläggningstid (dagar)</div>
              <div className="value">{matt.handlaggningstid}</div>
            </div>
            <div className="stat-card">
              <div className="label">Överklagade beslut</div>
              <div className="value">{matt.overklagade}</div>
            </div>
          </>
        )}

        {isGata && (
          <>
            <div className="stat-card">
              <div className="label">Underhållna vägar (km)</div>
              <div className="value">{matt.underhallnaVagar_km}</div>
            </div>
            <div className="stat-card">
              <div className="label">Felanmälningar</div>
              <div className="value">{matt.antalFelanmalningar}</div>
            </div>
            <div className="stat-card">
              <div className="label">Åtgärdstid (dagar)</div>
              <div className="value">{matt.atgardadeTid_dagar}</div>
            </div>
          </>
        )}
      </div>

      {isSkola && (
        <div className="charts-grid">
          <TrendChart
            data={data.map(d => ({ ...d, ...d.matt }))}
            lines={[{ dataKey: 'antalElever', name: 'Antal elever' }]}
            title="Elevutveckling"
          />
          <TrendChart
            data={data.map(d => ({
              ...d,
              genomstromning: d.matt.genomstromning * 100,
              behoriga_larare: d.matt.behoriga_larare * 100
            }))}
            lines={[
              { dataKey: 'genomstromning', name: 'Genomströmning (%)' },
              { dataKey: 'behoriga_larare', name: 'Behöriga lärare (%)' }
            ]}
            title="Kvalitetsmått"
          />
        </div>
      )}

      {isBibliotek && (
        <div className="charts-grid">
          <TrendChart
            data={data.map(d => ({ ...d, ...d.matt }))}
            lines={[
              { dataKey: 'antalBesok', name: 'Besök' },
              { dataKey: 'antalLan', name: 'Lån' }
            ]}
            title="Besök och lån"
          />
        </div>
      )}
    </>
  );
}

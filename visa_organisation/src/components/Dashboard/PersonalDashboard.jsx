import TrendChart from '../Charts/TrendChart';
import '../Charts/Charts.css';
import { getPersonalDataForEnhet, formatPercent } from '../../utils/dataHelpers';

export default function PersonalDashboard({ enhet, personalData }) {
  const data = getPersonalDataForEnhet(personalData, enhet.id);

  if (data.length === 0) {
    return (
      <div className="no-data">
        <div className="no-data-icon">👥</div>
        <p>Ingen personaldata tillgänglig för denna enhet</p>
      </div>
    );
  }

  const latest = data[data.length - 1];
  const previous = data.length > 1 ? data[data.length - 2] : null;

  const employeeChange = previous
    ? latest.antalAnstallda - previous.antalAnstallda
    : 0;

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="label">Antal anställda</div>
          <div className="value">{latest.antalAnstallda}</div>
          {employeeChange !== 0 && (
            <div className={`change ${employeeChange > 0 ? 'positive' : 'negative'}`}>
              {employeeChange > 0 ? '+' : ''}{employeeChange} sedan förra perioden
            </div>
          )}
        </div>
        <div className="stat-card">
          <div className="label">Personalomsättning</div>
          <div className="value">{formatPercent(latest.personalomsattning)}</div>
        </div>
        <div className="stat-card">
          <div className="label">Sjukfrånvaro</div>
          <div className="value">{formatPercent(latest.sjukfranvaro)}</div>
        </div>
        <div className="stat-card">
          <div className="label">Medelålder</div>
          <div className="value">{latest.medelalder} år</div>
        </div>
      </div>

      <div className="charts-grid">
        <TrendChart
          data={data}
          lines={[{ dataKey: 'antalAnstallda', name: 'Antal anställda' }]}
          title="Antal anställda över tid"
        />

        <TrendChart
          data={data.map(d => ({
            ...d,
            personalomsattning: d.personalomsattning * 100,
            sjukfranvaro: d.sjukfranvaro * 100
          }))}
          lines={[
            { dataKey: 'sjukfranvaro', name: 'Sjukfrånvaro (%)' },
            { dataKey: 'personalomsattning', name: 'Personalomsättning (%)' }
          ]}
          title="Sjukfrånvaro och personalomsättning"
        />
      </div>
    </>
  );
}

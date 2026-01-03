import BudgetUtfallChart from '../Charts/BudgetUtfallChart';
import '../Charts/Charts.css';
import {
  getKostnadsstallenForEnhet,
  groupByPeriod,
  aggregateEkonomiData,
  formatCurrency
} from '../../utils/dataHelpers';

export default function EkonomiDashboard({ enhet, ekonomiData, kostnadsstallen, kontoplan }) {
  // Hämta kostnadsställen för denna enhet
  const relevantKS = getKostnadsstallenForEnhet(enhet, kostnadsstallen);
  const ksCodes = relevantKS.map(ks => ks.kod);

  // Aggregera data per period
  const periodData = groupByPeriod(ekonomiData, ksCodes);

  // Beräkna totaler
  const totals = aggregateEkonomiData(ekonomiData, ksCodes);

  if (ksCodes.length === 0) {
    return (
      <div className="no-data">
        <div className="no-data-icon">📊</div>
        <p>Ingen ekonomidata tillgänglig för denna enhet</p>
      </div>
    );
  }

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="label">Total Budget (år)</div>
          <div className="value">{formatCurrency(totals.budget)}</div>
        </div>
        <div className="stat-card">
          <div className="label">Totalt Utfall (år)</div>
          <div className="value">{formatCurrency(totals.utfall)}</div>
        </div>
        <div className="stat-card">
          <div className="label">Avvikelse</div>
          <div className="value">{formatCurrency(totals.avvikelse)}</div>
          <div className={`change ${totals.avvikelse <= 0 ? 'positive' : 'negative'}`}>
            {totals.avvikelsePercent >= 0 ? '+' : ''}{totals.avvikelsePercent.toFixed(1)}%
          </div>
        </div>
        <div className="stat-card">
          <div className="label">Kostnadsställen</div>
          <div className="value">{ksCodes.length}</div>
        </div>
      </div>

      <div className="charts-grid">
        <BudgetUtfallChart
          data={periodData}
          title="Budget vs Utfall per månad"
        />
      </div>

      <div className="chart-container">
        <h4 className="chart-title">Kostnadsställen</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Kod</th>
              <th>Namn</th>
            </tr>
          </thead>
          <tbody>
            {relevantKS.map(ks => (
              <tr key={ks.kod}>
                <td>{ks.kod}</td>
                <td>{ks.namn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

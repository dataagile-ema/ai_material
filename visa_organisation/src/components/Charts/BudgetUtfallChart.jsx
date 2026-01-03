import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { periodToMonth } from '../../utils/dataHelpers';

export default function BudgetUtfallChart({ data, title }) {
  const chartData = data.map(d => ({
    ...d,
    month: periodToMonth(d.period),
    budget: d.budget / 1000,
    utfall: d.utfall / 1000
  }));

  const formatValue = (value) => `${value.toLocaleString('sv-SE')} tkr`;

  return (
    <div className="chart-container">
      {title && <h4 className="chart-title">{title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v} tkr`} />
          <Tooltip
            formatter={formatValue}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
          <Legend />
          <Bar dataKey="budget" name="Budget" fill="#4299e1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="utfall" name="Utfall" fill="#48bb78" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

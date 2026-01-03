// Hitta en enhet i organisationsträdet baserat på ID
export function findEnhetById(org, id) {
  if (org.id === id) return org;
  if (org.enheter) {
    for (const enhet of org.enheter) {
      const found = findEnhetById(enhet, id);
      if (found) return found;
    }
  }
  return null;
}

// Hämta alla enhet-ID:n under en given enhet (inklusive sig själv)
export function getAllChildIds(enhet) {
  const ids = [enhet.id];
  if (enhet.enheter) {
    for (const child of enhet.enheter) {
      ids.push(...getAllChildIds(child));
    }
  }
  return ids;
}

// Hämta alla kostnadsställen för en enhet och dess underenheter
export function getKostnadsstallenForEnhet(enhet, kostnadsstallen) {
  const enhetIds = getAllChildIds(enhet);
  return kostnadsstallen.filter(ks => enhetIds.includes(ks.enhetId));
}

// Aggregera ekonomidata för givna kostnadsställen
export function aggregateEkonomiData(ekonomiData, ksCodes, period = null) {
  let filtered = ekonomiData.filter(e => ksCodes.includes(e.kostnadsstalle));
  if (period) {
    filtered = filtered.filter(e => e.period === period);
  }

  const totalBudget = filtered.reduce((sum, e) => sum + e.budget, 0);
  const totalUtfall = filtered.reduce((sum, e) => sum + e.utfall, 0);

  return {
    budget: totalBudget,
    utfall: totalUtfall,
    avvikelse: totalUtfall - totalBudget,
    avvikelsePercent: totalBudget > 0 ? ((totalUtfall - totalBudget) / totalBudget) * 100 : 0
  };
}

// Gruppera ekonomidata per period
export function groupByPeriod(ekonomiData, ksCodes) {
  const filtered = ekonomiData.filter(e => ksCodes.includes(e.kostnadsstalle));
  const grouped = {};

  for (const e of filtered) {
    if (!grouped[e.period]) {
      grouped[e.period] = { budget: 0, utfall: 0 };
    }
    grouped[e.period].budget += e.budget;
    grouped[e.period].utfall += e.utfall;
  }

  return Object.entries(grouped)
    .map(([period, data]) => ({
      period,
      budget: data.budget,
      utfall: data.utfall,
      avvikelse: data.utfall - data.budget
    }))
    .sort((a, b) => a.period.localeCompare(b.period));
}

// Hämta personaldata för en enhet
export function getPersonalDataForEnhet(personalData, enhetId) {
  return personalData
    .filter(p => p.enhetId === enhetId)
    .sort((a, b) => a.period.localeCompare(b.period));
}

// Hämta produktionsdata för en enhet
export function getProduktionDataForEnhet(produktionData, enhetId) {
  return produktionData
    .filter(p => p.enhetId === enhetId)
    .sort((a, b) => a.period.localeCompare(b.period));
}

// Formatera nummer som valuta
export function formatCurrency(value) {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0
  }).format(value);
}

// Formatera procent
export function formatPercent(value) {
  return new Intl.NumberFormat('sv-SE', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value);
}

// Hämta månad från period
export function periodToMonth(period) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
  const monthNum = parseInt(period.split('-')[1], 10);
  return months[monthNum - 1];
}

import React from 'react';

export function RiskBadge({ risk }) {
  let bg, color, label;
  if (risk >= 80) { bg = '#fef2f2'; color = '#dc2626'; label = 'Critical'; }
  else if (risk >= 60) { bg = '#fff7ed'; color = '#c2410c'; label = 'High'; }
  else if (risk >= 40) { bg = '#fffbeb'; color = '#b45309'; label = 'Medium'; }
  else if (risk >= 20) { bg = '#eff6ff'; color = '#1d4ed8'; label = 'Low'; }
  else { bg = '#f0fdf4'; color = '#15803d'; label = 'Safe'; }

  return (
    <span style={{
      background: bg,
      color,
      fontSize: 11,
      fontWeight: 600,
      padding: '2px 8px',
      borderRadius: 20,
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
    }}>{label} {risk}%</span>
  );
}

export function StatusBadge({ status }) {
  const map = {
    infected: { bg: '#fef2f2', color: '#dc2626', label: 'Infected' },
    suspicious: { bg: '#fffbeb', color: '#b45309', label: 'Suspicious' },
    safe: { bg: '#f0fdf4', color: '#15803d', label: 'Safe' },
    quarantined: { bg: '#f5f3ff', color: '#7c3aed', label: 'Quarantined' },
  };
  const s = map[status] || map.safe;
  return (
    <span style={{
      background: s.bg,
      color: s.color,
      fontSize: 11,
      fontWeight: 600,
      padding: '2px 8px',
      borderRadius: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      whiteSpace: 'nowrap',
    }}>
      <span style={{
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: s.color,
        display: 'inline-block',
        ...(status === 'infected' ? { animation: 'blink 1s infinite' } : {}),
      }} />
      {s.label}
    </span>
  );
}

export function SeverityBadge({ severity }) {
  const map = {
    critical: { bg: '#fef2f2', color: '#dc2626' },
    high: { bg: '#fff7ed', color: '#c2410c' },
    medium: { bg: '#fffbeb', color: '#b45309' },
    low: { bg: '#eff6ff', color: '#1d4ed8' },
  };
  const s = map[severity] || map.low;
  return (
    <span style={{
      background: s.bg,
      color: s.color,
      fontSize: 11,
      fontWeight: 600,
      padding: '2px 8px',
      borderRadius: 20,
      textTransform: 'capitalize',
      whiteSpace: 'nowrap',
    }}>{severity}</span>
  );
}

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({ label, value, icon: Icon, color = 'accent', trend, trendLabel, bg, border }) {
  const colorMap = {
    accent: { text: 'var(--accent)', bg: 'var(--accent-light)', border: '#bfdbfe' },
    success: { text: 'var(--success)', bg: 'var(--success-light)', border: '#bbf7d0' },
    danger: { text: 'var(--danger)', bg: 'var(--danger-light)', border: '#fecaca' },
    warning: { text: 'var(--warning)', bg: '#fffbeb', border: '#fde68a' },
    info: { text: 'var(--info)', bg: 'var(--info-light)', border: '#a5f3fc' },
  };
  const c = colorMap[color] || colorMap.accent;

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      boxShadow: 'var(--shadow-sm)',
      transition: 'box-shadow 0.2s ease',
      cursor: 'default',
    }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
    onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.01em' }}>{label}</div>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: c.bg,
          border: `1px solid ${c.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Icon size={16} color={c.text} strokeWidth={2} />
        </div>
      </div>
      <div style={{ fontSize: 28, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</div>
      {trendLabel && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, color: 'var(--text-muted)' }}>
          {trend === 'up' && <TrendingUp size={13} color={color === 'danger' ? 'var(--danger)' : 'var(--success)'} />}
          {trend === 'down' && <TrendingDown size={13} color={color === 'success' ? 'var(--danger)' : 'var(--success)'} />}
          {trend === 'flat' && <Minus size={13} />}
          <span>{trendLabel}</span>
        </div>
      )}
    </div>
  );
}

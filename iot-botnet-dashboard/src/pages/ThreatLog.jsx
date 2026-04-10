import React, { useState } from 'react';
import { Shield, AlertTriangle, Info, CheckCircle, Clock, XCircle } from 'lucide-react';
import { SeverityBadge } from '../components/Badges.jsx';
import { threatEvents } from '../data/mockData.js';

const allThreats = [
  ...threatEvents,
  { id: 8, time: '13:12:44', device: 'Front CCTV', ip: '192.168.1.10', type: 'Mirai Botnet', severity: 'critical', action: 'Quarantined', details: 'Telnet bruteforce on port 23 followed by malware download' },
  { id: 9, time: '12:55:10', device: 'Smart Bulb Hub', ip: '192.168.1.52', type: 'Lateral Movement', severity: 'high', action: 'Blocked', details: 'Internal port sweep detected from compromised device' },
  { id: 10, time: '12:38:22', device: 'Smart Printer', ip: '192.168.1.35', type: 'Data Exfil Attempt', severity: 'high', action: 'Blocked', details: 'Large payload sent to external IP over HTTP' },
  { id: 11, time: '11:50:18', device: 'NAS Server', ip: '192.168.1.200', type: 'Weak Credentials', severity: 'medium', action: 'Flagged', details: 'Default credential "admin/admin" used for access' },
  { id: 12, time: '11:20:05', device: 'Access Control', ip: '192.168.1.77', type: 'Firmware Tamper', severity: 'low', action: 'Logged', details: 'Unexpected firmware update request from unknown source' },
];

const actionColor = {
  Quarantined: { bg: '#f5f3ff', color: '#6d28d9' },
  Blocked: { bg: '#fef2f2', color: '#dc2626' },
  Flagged: { bg: '#fffbeb', color: '#b45309' },
  Monitoring: { bg: '#eff6ff', color: '#1d4ed8' },
  Logged: { bg: '#f0fdf4', color: '#15803d' },
};

export default function ThreatLog() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = allThreats.filter(t => filter === 'all' || t.severity === filter);

  return (
    <div style={{ padding: '24px', animation: 'fadeIn 0.3s ease' }}>
      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Critical', count: allThreats.filter(t => t.severity === 'critical').length, color: '#dc2626', bg: '#fef2f2', icon: XCircle },
          { label: 'High', count: allThreats.filter(t => t.severity === 'high').length, color: '#c2410c', bg: '#fff7ed', icon: AlertTriangle },
          { label: 'Medium', count: allThreats.filter(t => t.severity === 'medium').length, color: '#b45309', bg: '#fffbeb', icon: Info },
          { label: 'Low', count: allThreats.filter(t => t.severity === 'low').length, color: '#1d4ed8', bg: '#eff6ff', icon: CheckCircle },
        ].map(s => (
          <div key={s.label} style={{
            background: s.bg,
            borderRadius: 10,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            border: `1px solid ${s.color}22`,
            cursor: 'pointer',
          }} onClick={() => setFilter(filter === s.label.toLowerCase() ? 'all' : s.label.toLowerCase())}>
            <s.icon size={20} color={s.color} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.count}</div>
              <div style={{ fontSize: 11, color: s.color, fontWeight: 500, opacity: 0.8 }}>{s.label} severity</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {['all', 'critical', 'high', 'medium', 'low'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '5px 14px', borderRadius: 7,
            border: `1px solid ${filter === f ? 'var(--accent)' : 'var(--border)'}`,
            background: filter === f ? 'var(--accent-light)' : 'white',
            color: filter === f ? 'var(--accent)' : 'var(--text-secondary)',
            fontSize: 12, fontWeight: filter === f ? 600 : 400, cursor: 'pointer',
            textTransform: 'capitalize',
          }}>{f}</button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)', alignSelf: 'center' }}>
          {filtered.length} event{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Two column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 14 }}>
        {/* Events list */}
        <div style={{
          background: 'white',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', background: '#f8fafc' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Threat Events
            </div>
          </div>
          {filtered.map((t, i) => (
            <div
              key={t.id}
              onClick={() => setSelected(selected?.id === t.id ? null : t)}
              style={{
                padding: '12px 16px',
                borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                cursor: 'pointer',
                background: selected?.id === t.id ? '#f0f4ff' : 'white',
                borderLeft: `3px solid ${t.severity === 'critical' ? '#dc2626' : t.severity === 'high' ? '#c2410c' : t.severity === 'medium' ? '#d97706' : '#6b7280'}`,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (selected?.id !== t.id) e.currentTarget.style.background = '#f8fafc'; }}
              onMouseLeave={e => { if (selected?.id !== t.id) e.currentTarget.style.background = 'white'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{t.type}</span>
                    <SeverityBadge severity={t.severity} />
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 3 }}>
                    {t.device} <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>({t.ip})</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.details}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                  <span style={{
                    ...actionColor[t.action],
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 10,
                  }}>{t.action}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>{t.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <div style={{
          background: 'white',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', background: '#f8fafc' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Event Detail
            </div>
          </div>
          {selected ? (
            <div style={{ padding: '16px', animation: 'fadeIn 0.2s ease' }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{selected.type}</div>
                <SeverityBadge severity={selected.severity} />
              </div>

              {[
                ['Device', selected.device],
                ['IP Address', selected.ip],
                ['Time', selected.time],
                ['Action Taken', selected.action],
              ].map(([k, v]) => (
                <div key={k} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{k}</div>
                  <div style={{ fontSize: 13, fontFamily: k === 'IP Address' ? 'var(--font-mono)' : 'inherit' }}>{v}</div>
                </div>
              ))}

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Description</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, background: 'var(--bg)', padding: '10px', borderRadius: 8 }}>{selected.details}</div>
              </div>

              <div style={{
                background: selected.severity === 'critical' ? '#fef2f2' : selected.severity === 'high' ? '#fff7ed' : '#f0fdf4',
                borderRadius: 8,
                padding: '12px',
                marginBottom: 16,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>AI Recommendation</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {selected.severity === 'critical' && 'Immediately isolate device from network. Run full malware scan and check for C2 connections. Review all traffic from last 24h.'}
                  {selected.severity === 'high' && 'Flag device for immediate review. Monitor traffic closely. Consider temporary isolation until root cause is identified.'}
                  {selected.severity === 'medium' && 'Monitor device behavior for next 2 hours. Review firewall rules and update device firmware if outdated.'}
                  {selected.severity === 'low' && 'Log the incident and monitor. No immediate action required. Schedule device audit this week.'}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ flex: 1, padding: '8px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                  Take Action
                </button>
                <button style={{ flex: 1, padding: '8px', background: 'white', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, cursor: 'pointer' }}>
                  Dismiss
                </button>
              </div>
            </div>
          ) : (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Shield size={32} strokeWidth={1.2} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
              <div style={{ fontSize: 13 }}>Select an event to view details</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

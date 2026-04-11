import React, { useState } from 'react';
import { Shield, AlertTriangle, Info, CheckCircle, Clock, XCircle } from 'lucide-react';
import { SeverityBadge } from '../components/Badges.jsx';
import { threatEvents } from '../data/mockData.js';
import useRealTimeData from '../hooks/useRealTimeData';

const actionColor = {
  Quarantined: { bg: '#f5f3ff', color: '#6d28d9' },
  Blocked: { bg: '#fef2f2', color: '#dc2626' },
  Flagged: { bg: '#fffbeb', color: '#b45309' },
  Monitoring: { bg: '#eff6ff', color: '#1d4ed8' },
  Logged: { bg: '#f0fdf4', color: '#15803d' },
};

export default function ThreatLog() {

  const realData = useRealTimeData();

  const allThreats = realData.length === 0
    ? [...threatEvents]
    : realData.map((d, i) => ({
        ...threatEvents[i % threatEvents.length],
        id: i,
        time: new Date().toLocaleTimeString(),
        device: d.device_id || "ESP32",
        ip: "192.168.1." + (i + 10),
        type: d.status === "ATTACK" ? "Botnet Attack" : "Normal Traffic",
        severity: d.status === "ATTACK" ? "critical" : "low",
        action: d.status === "ATTACK" ? "Blocked" : "Logged",
        details: d.status === "ATTACK"
          ? "High packet rate detected (botnet activity)"
          : "Normal telemetry data flow",
      }));

  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = allThreats.filter(t => filter === 'all' || t.severity === filter);

  return (
    <div style={{ padding: '24px', animation: 'fadeIn 0.3s ease' }}>

      {/* SUMMARY */}
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
          }}>
            <s.icon size={20} color={s.color} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.count}</div>
              <div style={{ fontSize: 11, color: s.color }}>{s.label} severity</div>
            </div>
          </div>
        ))}
      </div>

      {/* FILTER */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {['all', 'critical', 'high', 'medium', 'low'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '5px 14px',
            borderRadius: 7,
            border: `1px solid ${filter === f ? 'var(--accent)' : 'var(--border)'}`,
            background: filter === f ? 'var(--accent-light)' : 'var(--bg-card)',
            color: filter === f ? 'var(--accent)' : 'var(--text-secondary)',
            fontSize: 12,
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* EVENTS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 14 }}>
        <div style={{
          background: 'var(--bg-card)', // 🔥 FIX
          border: '1px solid var(--border)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          {filtered.map((t, i) => (
            <div key={t.id}
              onClick={() => setSelected(t)}
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--border)',
                cursor: 'pointer',
                borderLeft: `3px solid ${
                  t.severity === 'critical' ? '#dc2626' :
                  t.severity === 'high' ? '#c2410c' :
                  t.severity === 'medium' ? '#d97706' : '#6b7280'
                }`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>
                    {t.type} <SeverityBadge severity={t.severity} />
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {t.device} ({t.ip})
                  </div>
                  <div style={{ fontSize: 11 }}>{t.details}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    ...actionColor[t.action],
                    padding: '2px 8px',
                    borderRadius: 10,
                    fontSize: 11
                  }}>
                    {t.action}
                  </div>
                  <div style={{ fontSize: 10 }}>{t.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DETAIL */}
        <div style={{
          background: 'var(--bg-card)', // 🔥 FIX
          border: '1px solid var(--border)',
          borderRadius: '12px'
        }}>
          {!selected && (
            <div style={{ padding: 40, textAlign: 'center' }}>
              <Shield size={30} />
              <div>Select event to view</div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
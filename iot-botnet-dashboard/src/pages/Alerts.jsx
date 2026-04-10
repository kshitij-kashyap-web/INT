import React, { useState } from 'react';
import { Bell, BellOff, Check, Clock, Zap, Mail, MessageSquare } from 'lucide-react';
import { SeverityBadge } from '../components/Badges.jsx';

const mockAlerts = [
  { id: 1, time: '14:32:11', title: 'Mirai Botnet Detected', message: 'Front CCTV (192.168.1.10) is actively communicating with C2 server. Immediate action required.', severity: 'critical', read: false, category: 'Botnet' },
  { id: 2, time: '14:28:45', title: 'C2 Communication Blocked', message: 'Outbound traffic from Parking CCTV to known botnet IP has been blocked automatically.', severity: 'critical', read: false, category: 'Botnet' },
  { id: 3, time: '14:19:02', title: 'Port Scan Detected', message: 'Smart Router is performing internal port scan. Device has been flagged for review.', severity: 'high', read: false, category: 'Scan' },
  { id: 4, time: '14:11:33', title: 'Traffic Anomaly', message: 'Smart Bulb Hub traffic is 3x above normal baseline. Possible compromise or misconfiguration.', severity: 'medium', read: true, category: 'Anomaly' },
  { id: 5, time: '13:58:17', title: 'DNS Anomaly Detected', message: 'Smart Printer making repeated DNS queries to unregistered domain. Possible DNS tunneling.', severity: 'medium', read: true, category: 'DNS' },
  { id: 6, time: '13:44:09', title: 'Brute Force Attack Blocked', message: 'SSH brute force attempt from 45.33.32.156 on Smart Router has been blocked.', severity: 'high', read: true, category: 'Auth' },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState('all');

  const markRead = (id) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  const markAllRead = () => setAlerts(prev => prev.map(a => ({ ...a, read: true })));

  const filtered = alerts.filter(a => {
    if (filter === 'unread') return !a.read;
    if (filter === 'critical') return a.severity === 'critical';
    return true;
  });

  const unread = alerts.filter(a => !a.read).length;

  return (
    <div style={{ padding: '24px', animation: 'fadeIn 0.3s ease' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Bell size={18} color="var(--accent)" />
          <span style={{ fontWeight: 600 }}>Alert Center</span>
          {unread > 0 && (
            <span style={{ background: '#dc2626', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 10 }}>
              {unread} new
            </span>
          )}
        </div>
        <button
          onClick={markAllRead}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 8,
            border: '1px solid var(--border)',
            background: 'white', color: 'var(--text-secondary)',
            fontSize: 12, cursor: 'pointer',
          }}
        >
          <Check size={13} /> Mark all read
        </button>
      </div>

      {/* Notification channels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { icon: Zap, label: 'Real-time Push', desc: 'In-app notifications', active: true, color: '#1a56db' },
          { icon: Mail, label: 'Email Alerts', desc: 'admin@company.com', active: true, color: '#7c3aed' },
          { icon: MessageSquare, label: 'SMS Alerts', desc: 'Critical only', active: false, color: '#9ca3af' },
        ].map(c => (
          <div key={c.label} style={{
            background: 'white',
            border: `1px solid ${c.active ? c.color + '33' : 'var(--border)'}`,
            borderRadius: 10,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            opacity: c.active ? 1 : 0.6,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9,
              background: c.active ? c.color + '15' : '#f3f4f6',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <c.icon size={16} color={c.active ? c.color : '#9ca3af'} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{c.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.desc}</div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <div style={{
                width: 34, height: 18, borderRadius: 9,
                background: c.active ? c.color : '#e5e7eb',
                position: 'relative', cursor: 'pointer',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 2, left: c.active ? 18 : 2,
                  width: 14, height: 14, borderRadius: '50%',
                  background: 'white',
                  transition: 'left 0.2s',
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {[['all', 'All'], ['unread', `Unread (${unread})`], ['critical', 'Critical Only']].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)} style={{
            padding: '6px 14px', borderRadius: 8,
            border: `1px solid ${filter === val ? 'var(--accent)' : 'var(--border)'}`,
            background: filter === val ? 'var(--accent-light)' : 'white',
            color: filter === val ? 'var(--accent)' : 'var(--text-secondary)',
            fontSize: 12, fontWeight: filter === val ? 600 : 400, cursor: 'pointer',
          }}>{label}</button>
        ))}
      </div>

      {/* Alert list */}
      <div style={{
        background: 'white', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
      }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <BellOff size={28} style={{ margin: '0 auto 10px', opacity: 0.3 }} />
            <div>No alerts to show</div>
          </div>
        ) : filtered.map((a, i) => (
          <div
            key={a.id}
            style={{
              padding: '14px 18px',
              borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
              background: !a.read ? '#fefeff' : 'white',
              borderLeft: `3px solid ${!a.read ? (a.severity === 'critical' ? '#dc2626' : a.severity === 'high' ? '#c2410c' : '#d97706') : 'transparent'}`,
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
            }}
          >
            {!a.read && (
              <div style={{
                width: 8, height: 8, borderRadius: '50%', flexShrink: 0, marginTop: 5,
                background: a.severity === 'critical' ? '#dc2626' : '#d97706',
              }} />
            )}
            {a.read && <div style={{ width: 8, flexShrink: 0 }} />}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13.5, fontWeight: !a.read ? 600 : 500 }}>{a.title}</span>
                  <SeverityBadge severity={a.severity} />
                  <span style={{
                    fontSize: 10, fontWeight: 600, padding: '1px 7px', borderRadius: 8,
                    background: '#f1f5f9', color: 'var(--text-secondary)',
                  }}>{a.category}</span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{a.time}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 8 }}>{a.message}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {!a.read && (
                  <button onClick={() => markRead(a.id)} style={{
                    fontSize: 11, padding: '3px 10px', borderRadius: 6,
                    border: '1px solid var(--border)', background: 'white',
                    color: 'var(--text-secondary)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    <Check size={11} /> Mark read
                  </button>
                )}
                <button style={{
                  fontSize: 11, padding: '3px 10px', borderRadius: 6,
                  border: '1px solid var(--accent)', background: 'var(--accent-light)',
                  color: 'var(--accent)', cursor: 'pointer',
                }}>View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

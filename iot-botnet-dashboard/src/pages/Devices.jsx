import React, { useState } from 'react';
import { Search, Filter, X, Wifi, Camera, Cpu, Printer, Phone, Server, Shield, Router } from 'lucide-react';
import { StatusBadge, RiskBadge } from '../components/Badges.jsx';
import { devices } from '../data/mockData.js';

const typeIcons = {
  Camera: Camera,
  Router: Router,
  Sensor: Cpu,
  Hub: Wifi,
  Security: Shield,
  Storage: Server,
  Printer: Printer,
  VoIP: Phone,
};

function DeviceModal({ device, onClose }) {
  if (!device) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'rgba(0,0,0,0.28)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div
        style={{
          background: 'white',
          borderRadius: 16,
          padding: '24px',
          width: 480,
          boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
          animation: 'fadeIn 0.2s ease',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>{device.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>ID: {device.id} · {device.type}</div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'var(--bg)', borderRadius: 8, padding: 8, cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
          {[
            ['IP Address', device.ip],
            ['MAC Address', device.mac],
            ['Location', device.location],
            ['Last Seen', device.lastSeen],
            ['Traffic', `${device.traffic.toLocaleString()} pkts/s`],
            ['Risk Score', `${device.risk}%`],
          ].map(([k, v]) => (
            <div key={k} style={{
              background: 'var(--bg)',
              borderRadius: 8,
              padding: '10px 12px',
            }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 3 }}>{k}</div>
              <div style={{ fontSize: 13, fontWeight: 500, fontFamily: ['IP Address', 'MAC Address'].includes(k) ? 'var(--font-mono)' : 'inherit' }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Risk bar */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>AI Risk Score</span>
            <span style={{ fontWeight: 700, color: device.risk >= 60 ? '#dc2626' : device.risk >= 40 ? '#d97706' : '#16a34a' }}>{device.risk}%</span>
          </div>
          <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${device.risk}%`,
              background: device.risk >= 60 ? '#dc2626' : device.risk >= 40 ? '#d97706' : '#16a34a',
              borderRadius: 4,
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>

        {device.threat && (
          <div style={{
            background: '#fff5f5',
            border: '1px solid #fecaca',
            borderRadius: 8,
            padding: '12px',
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Active Threat</div>
            <div style={{ fontSize: 13, color: '#991b1b', fontWeight: 500 }}>{device.threat}</div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          {device.status === 'infected' && (
            <button style={{
              flex: 1, padding: '9px', borderRadius: 8,
              background: '#dc2626', color: 'white',
              border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
            }}>Quarantine Device</button>
          )}
          <button style={{
            flex: 1, padding: '9px', borderRadius: 8,
            background: 'var(--accent)', color: 'white',
            border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>Full Report</button>
          <button style={{
            flex: 1, padding: '9px', borderRadius: 8,
            background: 'white', color: 'var(--text-secondary)',
            border: '1px solid var(--border)', fontWeight: 500, fontSize: 13, cursor: 'pointer',
          }} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default function Devices() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = devices.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.ip.includes(search) || d.type.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || d.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ padding: '24px', animation: 'fadeIn 0.3s ease' }}>
      <DeviceModal device={selected} onClose={() => setSelected(null)} />

      {/* Header controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'white', border: '1px solid var(--border)',
          borderRadius: 8, padding: '7px 12px', flex: 1, maxWidth: 320,
        }}>
          <Search size={14} color="var(--text-muted)" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, IP, or type…"
            style={{ border: 'none', outline: 'none', fontSize: 13, fontFamily: 'var(--font)', flex: 1 }}
          />
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            ['all', 'All Devices', null],
            ['infected', 'Infected', '#dc2626'],
            ['suspicious', 'Suspicious', '#d97706'],
            ['safe', 'Safe', '#16a34a'],
          ].map(([val, label, color]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                border: `1px solid ${filter === val ? (color || 'var(--accent)') : 'var(--border)'}`,
                background: filter === val ? (color ? `${color}11` : 'var(--accent-light)') : 'white',
                color: filter === val ? (color || 'var(--accent)') : 'var(--text-secondary)',
                fontSize: 12,
                fontWeight: filter === val ? 600 : 400,
                cursor: 'pointer',
              }}
            >{label}</button>
          ))}
        </div>

        <div style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-muted)' }}>
          {filtered.length} device{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Table */}
      <div style={{
        background: 'white',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
              {['Device', 'Type', 'IP Address', 'Status', 'Threat', 'Risk Score', 'Traffic', 'Last Seen', ''].map(h => (
                <th key={h} style={{
                  padding: '10px 14px',
                  textAlign: 'left',
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => {
              const Icon = typeIcons[d.type] || Cpu;
              return (
                <tr
                  key={d.id}
                  style={{
                    borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                    transition: 'background 0.15s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  onClick={() => setSelected(d)}
                >
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: d.status === 'infected' ? '#fef2f2' : d.status === 'suspicious' ? '#fffbeb' : '#f0f9ff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Icon size={15} color={d.status === 'infected' ? '#dc2626' : d.status === 'suspicious' ? '#d97706' : '#1a56db'} />
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{d.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.location}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--text-secondary)' }}>{d.type}</td>
                  <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>{d.ip}</td>
                  <td style={{ padding: '12px 14px' }}><StatusBadge status={d.status} /></td>
                  <td style={{ padding: '12px 14px', fontSize: 12, color: d.threat ? '#991b1b' : 'var(--text-muted)' }}>
                    {d.threat || '—'}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 50, height: 5, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${d.risk}%`,
                          background: d.risk >= 60 ? '#dc2626' : d.risk >= 40 ? '#d97706' : '#16a34a',
                          borderRadius: 3,
                        }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 500, fontFamily: 'var(--font-mono)', minWidth: 32 }}>{d.risk}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>
                    {d.traffic.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--text-muted)' }}>{d.lastSeen}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <button style={{
                      fontSize: 11, fontWeight: 500, padding: '4px 10px',
                      borderRadius: 6, border: '1px solid var(--border)',
                      background: 'white', color: 'var(--accent)', cursor: 'pointer',
                    }}>View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

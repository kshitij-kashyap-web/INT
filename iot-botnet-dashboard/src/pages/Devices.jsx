import React, { useState } from 'react';
import { Search, Filter, X, Wifi, Camera, Cpu, Printer, Phone, Server, Shield, Router } from 'lucide-react';
import { StatusBadge, RiskBadge } from '../components/Badges.jsx';
import { devices as mockDevices } from '../data/mockData.js';
import useRealTimeData from '../hooks/useRealTimeData';

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
          background: 'var(--bg-card)', // 🔥 FIX
          borderRadius: 16,
          padding: '24px',
          width: 480,
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
          animation: 'fadeIn 0.2s ease',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>{device.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{device.type}</div>
          </div>
          <button onClick={onClose} style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: 4
          }}>
            <X size={16} />
          </button>
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default function Devices() {

  const realData = useRealTimeData();

  const devices = realData.length === 0
    ? mockDevices
    : realData.map((d, i) => ({
        ...mockDevices[i % mockDevices.length],
        id: i,
        name: d.device_id || "ESP32",
        status: d.status === "ATTACK" ? "infected" : "safe",
        threat: d.status === "ATTACK" ? "Botnet Attack" : null,
        risk: d.status === "ATTACK" ? 80 : 10,
        traffic: d.packet_size || 0,
        lastSeen: "Just now"
      }));

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

      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--bg-card)', // 🔥 FIX
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: '7px 12px',
          flex: 1,
          maxWidth: 320,
        }}>
          <Search size={14} color="var(--text-muted)" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, IP, or type…"
            style={{
              border: 'none',
              outline: 'none',
              fontSize: 13,
              background: 'transparent',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        <div style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-muted)' }}>
          {filtered.length} device{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* TABLE */}
      <div style={{
        background: 'var(--bg-card)', // 🔥 FIX
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {filtered.map((d, i) => {
              const Icon = typeIcons[d.type] || Cpu;
              return (
                <tr
                  key={d.id}
                  onClick={() => setSelected(d)}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-light)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Icon size={16} color="var(--text-secondary)" />
                      <div style={{ color: 'var(--text-primary)' }}>{d.name}</div>
                    </div>
                  </td>
                  <td><StatusBadge status={d.status} /></td>
                  <td style={{ color: 'var(--text-secondary)' }}>{d.traffic}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
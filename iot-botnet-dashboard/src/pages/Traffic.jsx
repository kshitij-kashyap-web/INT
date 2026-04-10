import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { networkFlow, trafficHistory } from '../data/mockData.js';

function MetricBox({ label, value, unit, color }) {
  return (
    <div style={{
      background: 'white',
      border: '1px solid var(--border)',
      borderRadius: 10,
      padding: '16px 18px',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontSize: 26, fontWeight: 700, color: color || 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{value}</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{unit}</span>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 12, boxShadow: 'var(--shadow)' }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
        {payload.map(p => (
          <div key={p.name} style={{ color: p.color, display: 'flex', gap: 6 }}>
            <span>{p.name}:</span><span style={{ fontWeight: 600 }}>{p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Traffic() {
  const [liveData, setLiveData] = useState(networkFlow.slice(-8));
  const [bytesIn, setBytesIn] = useState(2840);
  const [bytesOut, setBytesOut] = useState(2450);

  useEffect(() => {
    const t = setInterval(() => {
      setBytesIn(prev => Math.max(500, prev + Math.floor((Math.random() - 0.45) * 200)));
      setBytesOut(prev => Math.max(400, prev + Math.floor((Math.random() - 0.45) * 160)));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ padding: '24px', animation: 'fadeIn 0.3s ease' }}>
      {/* Metrics row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
        <MetricBox label="Inbound Traffic" value={bytesIn.toLocaleString()} unit="KB/s" color="#1a56db" />
        <MetricBox label="Outbound Traffic" value={bytesOut.toLocaleString()} unit="KB/s" color="#0891b2" />
        <MetricBox label="Packets/sec" value="42,180" unit="pps" color="#7c3aed" />
        <MetricBox label="Blocked Packets" value="1,284" unit="today" color="#dc2626" />
        <MetricBox label="Latency" value="12" unit="ms avg" color="#16a34a" />
      </div>

      {/* Live inbound/outbound */}
      <div style={{
        background: 'white', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', padding: '18px', boxShadow: 'var(--shadow-sm)', marginBottom: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Network Flow — 24h Overview</div>
          <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
            {[['#1a56db', 'Inbound'], ['#0891b2', 'Outbound']].map(([c, l]) => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-secondary)' }}>
                <span style={{ width: 12, height: 3, background: c, display: 'inline-block', borderRadius: 1 }} />{l}
              </span>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={networkFlow}>
            <defs>
              <linearGradient id="gin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1a56db" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#1a56db" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gout" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0891b2" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="inbound" stroke="#1a56db" strokeWidth={2} fill="url(#gin)" name="Inbound" />
            <Area type="monotone" dataKey="outbound" stroke="#0891b2" strokeWidth={2} fill="url(#gout)" name="Outbound" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom two charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* Suspicious vs normal */}
        <div style={{
          background: 'white', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '18px', boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 14 }}>Packet Classification — Hourly</div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={trafficHistory.slice(6, 18)} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="normal" fill="#dbeafe" radius={[3, 3, 0, 0]} name="Normal" />
              <Bar dataKey="suspicious" fill="#fde68a" radius={[3, 3, 0, 0]} name="Suspicious" />
              <Bar dataKey="blocked" fill="#fca5a5" radius={[3, 3, 0, 0]} name="Blocked" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 14, fontSize: 11, justifyContent: 'center', marginTop: 8 }}>
            {[['#dbeafe', '#1d4ed8', 'Normal'], ['#fde68a', '#b45309', 'Suspicious'], ['#fca5a5', '#dc2626', 'Blocked']].map(([bg, c, l]) => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)' }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: bg, border: `1px solid ${c}44`, display: 'inline-block' }} />{l}
              </span>
            ))}
          </div>
        </div>

        {/* Top talkers */}
        <div style={{
          background: 'white', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '18px', boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 14 }}>Top Bandwidth Consumers</div>
          {[
            { name: 'Front CCTV', ip: '192.168.1.10', pct: 32, color: '#dc2626', status: 'infected' },
            { name: 'Parking CCTV', ip: '192.168.1.18', pct: 24, color: '#dc2626', status: 'infected' },
            { name: 'NAS Server', ip: '192.168.1.200', pct: 18, color: '#1a56db', status: 'safe' },
            { name: 'Smart Router', ip: '192.168.1.1', pct: 12, color: '#d97706', status: 'suspicious' },
            { name: 'Lobby Camera', ip: '192.168.1.22', pct: 8, color: '#1a56db', status: 'safe' },
            { name: 'Others', ip: '—', pct: 6, color: '#9ca3af', status: 'safe' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 500 }}>{item.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{item.ip}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: item.color }}>{item.pct}%</span>
              </div>
              <div style={{ height: 5, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${item.pct}%`,
                  background: item.color,
                  borderRadius: 3,
                  opacity: 0.7,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

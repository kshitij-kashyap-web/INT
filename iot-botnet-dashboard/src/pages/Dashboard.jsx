import React, { useState, useEffect } from 'react';
import { Shield, Cpu, AlertTriangle, Activity } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import StatCard from '../components/StatCard.jsx';
import { SeverityBadge } from '../components/Badges.jsx';
import useRealTimeData from '../hooks/useRealTimeData';

const COLORS = ['#949bc9', '#749ddb', '#9ec29d', '#7ec7e7'];

export default function Dashboard() {

  const realData = useRealTimeData();

  // 🔥 STATS
  const totalDevices = new Set(realData.map(d => d.device_id)).size;
  const infected = realData.filter(d => d.status === "ATTACK").length;
  const safe = realData.filter(d => d.status === "NORMAL").length;

  const health = totalDevices === 0 
    ? 100 
    : Math.min(100, Math.round((safe / totalDevices) * 100));

  // 🔥 DATA
  const chartData = realData.slice(-10).map((d, i) => ({
    name: `T${i}`,
    attack: d.status === "ATTACK" ? 1 : 0,
    normal: d.status === "NORMAL" ? 1 : 0
  }));

  const pieData = [
    { name: "Attack", value: infected },
    { name: "Normal", value: safe }
  ];

  // 🔥 ALERTS
  const [liveThreats, setLiveThreats] = useState([]);

  useEffect(() => {
    const alerts = realData
      .filter(d => d.status === "ATTACK")
      .slice(-4)
      .map((d, i) => ({
        id: i,
        type: "Botnet Attack",
        device: d.device_id,
        severity: "critical",
        time: new Date().toLocaleTimeString()
      }));

    setLiveThreats(alerts);
  }, [realData]);

  return (
    <div style={{ padding: '24px' }}>

      {/* 🔥 STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        <StatCard label="Total Devices" value={totalDevices} icon={Cpu} />
        <StatCard label="Infected Devices" value={infected} icon={AlertTriangle} color="danger" />
        <StatCard label="Safe Devices" value={safe} icon={Shield} color="success" />
        <StatCard label="Network Health" value={`${health}%`} icon={Activity} color="info" />
      </div>

      {/* 🔥 SECOND ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>

        {/* 📊 BAR GRAPH */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          padding: 16,
          borderRadius: 12
        }}>
          <h4 style={{ color: 'var(--text-primary)' }}>Weekly Detections</h4>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip />
              <Bar dataKey="attack" fill="var(--danger)" radius={[6,6,0,0]} />
              <Bar dataKey="normal" fill="var(--accent)" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🥧 PIE */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          padding: 16,
          borderRadius: 12
        }}>
          <h4 style={{ color: 'var(--text-primary)' }}>Attack Distribution</h4>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={40} outerRadius={70}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 📈 AREA GRAPH */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          padding: 16,
          borderRadius: 12
        }}>
          <h4 style={{ color: 'var(--text-primary)' }}>Network Traffic</h4>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="attack" 
                stroke="var(--danger)" 
                fill="rgba(214, 118, 95, 0.2)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔥 LIVE ALERTS */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        padding: 16,
        borderRadius: 12
      }}>
        <h3 style={{ color: 'var(--text-primary)' }}>🚨 Live Alerts</h3>

        {liveThreats.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No threats detected</p>
        ) : (
          liveThreats.map(t => (
            <div key={t.id} style={{
              padding: '10px',
              marginBottom: '8px',
              borderLeft: '4px solid var(--danger)',
              background: 'rgba(214, 153, 138, 0.1)',
              borderRadius: 6,
              color: 'var(--text-primary)',
              boxShadow: '0 0 8px rgba(231,111,81,0.2)'
            }}>
              <div style={{ fontWeight: 'bold' }}>{t.type}</div>
              <div style={{ color: 'var(--text-secondary)' }}>{t.device}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.time}</div>
              <SeverityBadge severity={t.severity} />
            </div>
          ))
        )}
      </div>

    </div>
  );
}
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Devices from './pages/Devices.jsx';
import ThreatLog from './pages/ThreatLog.jsx';
import Traffic from './pages/Traffic.jsx';
import Alerts from './pages/Alerts.jsx';
import SettingsPage from './pages/Settings.jsx';
import AIAnalysis from './pages/AIAnalysis.jsx';

/* ================= PAGE CONFIG ================= */
const pageConfig = {
  dashboard: {
    title: 'Overview',
    subtitle: 'Real-time botnet detection and monitoring',
  },
  devices: {
    title: 'IoT Devices',
    subtitle: 'All registered devices and their security status',
  },
  threats: {
    title: 'Threat Log',
    subtitle: 'Detected threats and AI analysis',
  },
  traffic: {
    title: 'Network Traffic',
    subtitle: 'Packet analysis and flow monitoring',
  },
  aianalysis: {
    title: 'AI Analysis',
    subtitle: 'ML insights and live packet inspection',
  },
  alerts: {
    title: 'Alerts',
    subtitle: 'Notifications and alert management',
  },
  settings: {
    title: 'Settings',
    subtitle: 'System configuration and preferences',
  },
};

export default function App() {
  const [page, setPage] = useState('dashboard');

  /* ================= THEME ================= */
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  /* ================= PAGE SWITCH ================= */
  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard />;
      case 'devices':
        return <Devices />;
      case 'threats':
        return <ThreatLog />;
      case 'traffic':
        return <Traffic />;
      case 'aianalysis':
        return <AIAnalysis />;
      case 'alerts':
        return <Alerts />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  const current = pageConfig[page] || pageConfig.dashboard;

  /* ================= UI ================= */
  return (
    <div style={styles.app}>
      
      {/* SIDEBAR */}
      <Sidebar activePage={page} setActivePage={setPage} />

      {/* MAIN AREA */}
      <div style={styles.mainWrapper}>
        
        {/* TOPBAR */}
        <Topbar
          title={current.title}
          subtitle={current.subtitle}
          dark={dark}
          setDark={setDark}
        />

        {/* PAGE CONTENT */}
        <main style={styles.content}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  app: {
    display: 'flex',
    height: '100vh',
    background: 'var(--bg)',
  },

  mainWrapper: {
    marginLeft: 'var(--sidebar-w)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'hidden',
  },

  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
  },
};
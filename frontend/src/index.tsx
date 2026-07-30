import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Endpoint_ListKeys from './components/ListKeys/index.js';
import Endpoint_RetrieveKey from './components/RetrieveKey/index.js';
import Endpoint_StoreKey from './components/StoreKey/index.js';
import Endpoint_UpdateKey from './components/UpdateKey/index.js';
import Endpoint_DeleteKey from './components/DeleteKey/index.js';

function AppShell() {
  const [activeTab, setActiveTab] = useState<string>('ListKeys');

  return (
    <div className="krnl-app-shell">
      <header className="krnl-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ fontSize: '1.5rem' }}>🔷</div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Krng</h1>
        </div>
      </header>

      <div className="krnl-nav-tabs">
        <button className={`krnl-tab-btn ${activeTab === 'ListKeys' ? 'active' : ''}`} onClick={() => setActiveTab('ListKeys')}>ListKeys</button>
        <button className={`krnl-tab-btn ${activeTab === 'RetrieveKey' ? 'active' : ''}`} onClick={() => setActiveTab('RetrieveKey')}>RetrieveKey</button>
        <button className={`krnl-tab-btn ${activeTab === 'StoreKey' ? 'active' : ''}`} onClick={() => setActiveTab('StoreKey')}>StoreKey</button>
        <button className={`krnl-tab-btn ${activeTab === 'UpdateKey' ? 'active' : ''}`} onClick={() => setActiveTab('UpdateKey')}>UpdateKey</button>
        <button className={`krnl-tab-btn ${activeTab === 'DeleteKey' ? 'active' : ''}`} onClick={() => setActiveTab('DeleteKey')}>DeleteKey</button>
        
      </div>

      <main className="krnl-main-body">
        {activeTab === 'ListKeys' && <Endpoint_ListKeys />}
        {activeTab === 'RetrieveKey' && <Endpoint_RetrieveKey />}
        {activeTab === 'StoreKey' && <Endpoint_StoreKey />}
        {activeTab === 'UpdateKey' && <Endpoint_UpdateKey />}
        {activeTab === 'DeleteKey' && <Endpoint_DeleteKey />}
        
        
      </main>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<AppShell />);
}

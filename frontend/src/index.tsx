import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { SharedComponentProvider } from './atoms/index.js';
import Endpoint_ListKeys from './components/ListKeys/index';
import Endpoint_RetrieveKey from './components/RetrieveKey/index';
import Endpoint_StoreKey from './components/StoreKey/index';
import Endpoint_UpdateKey from './components/UpdateKey/index';
import Endpoint_DeleteKey from './components/DeleteKey/index';

function AppShell() {
  const [activeTab, setActiveTab] = useState<string>('ListKeys');

  return (
    <SharedComponentProvider>
      <div className="krnl-app-shell">
        <header className="krnl-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>⬡</span>
            <h1>Krng</h1>
          </div>
        </header>

        <div className="krnl-nav-tabs">
          <button className={`krnl-tab-btn ${activeTab === 'ListKeys' ? 'active' : ''}`} onClick={() => setActiveTab('ListKeys')} title="ListKeys"><span>⬡</span><span className="krnl-tab-label">ListKeys</span></button>
          <button className={`krnl-tab-btn ${activeTab === 'RetrieveKey' ? 'active' : ''}`} onClick={() => setActiveTab('RetrieveKey')} title="RetrieveKey"><span>⬡</span><span className="krnl-tab-label">RetrieveKey</span></button>
          <button className={`krnl-tab-btn ${activeTab === 'StoreKey' ? 'active' : ''}`} onClick={() => setActiveTab('StoreKey')} title="StoreKey"><span>⬡</span><span className="krnl-tab-label">StoreKey</span></button>
          <button className={`krnl-tab-btn ${activeTab === 'UpdateKey' ? 'active' : ''}`} onClick={() => setActiveTab('UpdateKey')} title="UpdateKey"><span>⬡</span><span className="krnl-tab-label">UpdateKey</span></button>
          <button className={`krnl-tab-btn ${activeTab === 'DeleteKey' ? 'active' : ''}`} onClick={() => setActiveTab('DeleteKey')} title="DeleteKey"><span>⬡</span><span className="krnl-tab-label">DeleteKey</span></button>
          
        </div>

        <main className="krnl-main-body">
          {activeTab === 'ListKeys' && <Endpoint_ListKeys />}
          {activeTab === 'RetrieveKey' && <Endpoint_RetrieveKey />}
          {activeTab === 'StoreKey' && <Endpoint_StoreKey />}
          {activeTab === 'UpdateKey' && <Endpoint_UpdateKey />}
          {activeTab === 'DeleteKey' && <Endpoint_DeleteKey />}
          
          
        </main>
      </div>
    </SharedComponentProvider>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<AppShell />);
}

import React, { useState, useEffect } from 'react';
import { KrnlButton, KrnlTextInput, KrnlTile } from '../../atoms/index.js';

export default function Endpoint_UpdateKey() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phantomActive, setPhantomActive] = useState(false);

  // Subscribe to live SSE events for phantom mirroring
  useEffect(() => {
    const sse = new EventSource('/sse/UpdateKey');
    sse.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data);
        if (msg.type === 'frontend:interaction' || msg.input !== undefined) {
          if (msg.input) setFormData((prev) => ({ ...prev, ...msg.input }));
          if (msg.output !== undefined) setResponse(msg.output?.payload !== undefined ? msg.output.payload : msg.output);
          setPhantomActive(true);
          setTimeout(() => setPhantomActive(false), 2000);
        }
      } catch (e) {}
    };
    return () => sse.close();
  }, []);

  const handleInputChange = (field: string, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('api/UpdateKey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResponse(data.payload !== undefined ? data.payload : data);
    } catch (err: any) {
      setError(err.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`krnl-endpoint-card ${phantomActive ? 'krnl-phantom-active' : ''}`}
      style={{
        background: 'var(--krnl-bg-surface)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: phantomActive ? '2px solid var(--krnl-accent)' : '1px solid var(--krnl-border-color)',
        transition: 'all 0.3s ease',
        boxShadow: phantomActive ? '0 0 20px rgba(16, 185, 129, 0.4)' : 'none',
        position: 'relative'
      }}
    >
      {phantomActive && (
        <div className="krnl-phantom-badge" style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--krnl-accent)', color: '#000', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
          🤖 Phantom Execution Active
        </div>
      )}
      <h3 style={{ marginBottom: '1rem', color: 'var(--krnl-primary)' }}>Endpoint: UpdateKey</h3>
      <form onSubmit={handleSubmit}>
        <KrnlTextInput label="Secret Key ID" value={formData['id'] || ''} onChange={(v) => handleInputChange('id', v)} placeholder="" />
        <KrnlTextInput label="New Secret Value" value={formData['value'] || ''} onChange={(v) => handleInputChange('value', v)} placeholder="" />
        <KrnlButton type="submit" disabled={loading}>
          {loading ? 'Executing...' : 'Execute UpdateKey'}
        </KrnlButton>
      </form>

      {error && <div style={{ color: 'var(--krnl-danger)', marginTop: '1rem' }}>Error: {error}</div>}

      {response !== null && (
        <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--krnl-border-color)', paddingTop: '1rem' }}>
          <h4 style={{ marginBottom: '0.5rem', color: 'var(--krnl-accent)' }}>Output Response</h4>
          <KrnlTile title="Status" value={String(response['status'] !== undefined ? response['status'] : response)} />
        </div>
      )}
    </div>
  );
}

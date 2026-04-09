'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      setError('Wrong password.');
      setPassword('');
    }
  }

  return (
    <div style={{
      background: '#0a0a0a',
      color: '#fff',
      fontFamily: 'Inter, system-ui, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <form onSubmit={handleSubmit} style={{ width: 320, textAlign: 'center' }}>
        <h1 style={{ fontSize: 18, letterSpacing: 4, fontWeight: 700, marginBottom: 32 }}>
          DEAD HIDDEN
        </h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          style={{
            width: '100%',
            padding: '12px 16px',
            background: '#111',
            border: '1px solid #333',
            color: '#fff',
            fontSize: 14,
            borderRadius: 4,
            marginBottom: 12,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        {error && <p style={{ color: '#f87171', fontSize: 13, margin: '0 0 12px' }}>{error}</p>}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px 16px',
            background: '#8b0000',
            color: '#fff',
            border: 'none',
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 2,
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          ENTER
        </button>
      </form>
    </div>
  );
}

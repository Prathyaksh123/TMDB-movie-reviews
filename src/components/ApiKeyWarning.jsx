import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ApiKeyWarning = () => {
    return (
        <div style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-dark)',
            color: '#fff',
            padding: '20px',
            textAlign: 'center'
        }}>
            <AlertTriangle size={64} color="var(--primary)" style={{ marginBottom: '20px' }} />
            <h1 style={{ marginBottom: '15px' }}>TMDB API Key Missing</h1>
            <p style={{ maxWidth: '600px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                To view this IMDb clone, you need to provide a TMDB API Key.
                1. Go to <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>themoviedb.org</a> to get your free key.
                2. Create or edit the <code>.env</code> file in the project root.
                3. Add your key as: <code>VITE_TMDB_API_KEY=your_key_here</code>
                4. Restart the development server.
            </p>
            <button
                onClick={() => window.location.reload()}
                className="btn-primary"
                style={{ marginTop: '30px' }}
            >
                I've added the key, Reload
            </button>
        </div>
    );
};

export default ApiKeyWarning;

import React, { useState } from 'react';
import { Search, Menu, User, Bell, Play } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search?q=${search}`);
        }
    };

    return (
        <nav className="glass-morphism" style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 1000,
            padding: '15px 50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                <Link to="/" style={{
                    textDecoration: 'none',
                    color: 'var(--primary)',
                    fontSize: '1.8rem',
                    fontWeight: '900',
                    letterSpacing: '-1px'
                }}>
                    IMDb<span style={{ color: '#fff', fontSize: '1rem', fontWeight: '400', marginLeft: '5px' }}>CLONE</span>
                </Link>

                <div style={{ display: 'flex', gap: '25px', alignItems: 'center', color: 'var(--text-muted)', fontWeight: '500' }}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Movies</Link>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>TV Shows</Link>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Celebs</Link>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 0.6 }}>
                <form onSubmit={handleSearch} style={{ position: 'relative', width: '100%' }}>
                    <input
                        type="text"
                        placeholder="Search IMDb"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 45px 10px 15px',
                            borderRadius: '8px',
                            border: '1px solid var(--glass-border)',
                            background: 'rgba(255,255,255,0.1)',
                            color: '#fff',
                            outline: 'none'
                        }}
                    />
                    <Search style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                </form>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                <Bell size={22} cursor="pointer" />
                <User size={22} cursor="pointer" />
                <div className="btn-primary" style={{ padding: '8px 15px', fontSize: '0.9rem' }}>
                    Sign In
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

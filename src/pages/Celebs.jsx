import React, { useEffect, useState } from 'react';
import { getPopularPeople, searchPeople, getImageUrl } from '../services/tmdb';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Celebs = () => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPeople = async () => {
            setLoading(true);
            try {
                const results = await getPopularPeople();
                setPeople(results);
            } catch (error) {
                console.error("Error fetching celebs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPeople();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setLoading(true);
        try {
            const results = await searchPeople(searchQuery);
            setPeople(results);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '120px 50px 50px 50px', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '4px', height: '40px', background: 'var(--primary)', borderRadius: '2px' }}></span>
                    Celebs & Actors
                </h1>

                <form onSubmit={handleSearch} style={{ position: 'relative', width: '300px', maxWidth: '100%' }}>
                    <input
                        type="text"
                        placeholder="Search for actors, directors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 45px 12px 20px',
                            borderRadius: '30px',
                            border: '1px solid var(--glass-border)',
                            background: 'rgba(255,255,255,0.05)',
                            color: '#fff',
                            outline: 'none',
                            fontSize: '1rem'
                        }}
                    />
                    <button type="submit" style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                        <Search size={20} />
                    </button>
                </form>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem', color: 'var(--text-muted)' }}>Loading celebs...</div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '30px'
                }}>
                    {people.map(person => (
                        <div
                            key={person.id}
                            onClick={() => navigate(`/person/${person.id}`)}
                            style={{ cursor: 'pointer', textAlign: 'center', transition: 'transform 0.3s ease' }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <img
                                src={getImageUrl(person.profile_path, 'w500')}
                                alt={person.name}
                                style={{
                                    width: '100%',
                                    aspectRatio: '2/3',
                                    objectFit: 'cover',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
                                    border: '1px solid var(--glass-border)',
                                    marginBottom: '15px'
                                }}
                            />
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{person.name}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                {person.known_for_department}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Celebs;

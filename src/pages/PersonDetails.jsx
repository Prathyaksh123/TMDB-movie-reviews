import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPersonDetails, getImageUrl } from '../services/tmdb';
import { ArrowLeft, User, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const PersonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const data = await getPersonDetails(id);
                setPerson(data);
                window.scrollTo(0, 0);
            } catch (error) {
                console.error("Error fetching person details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)' }}>
            <h2 style={{ color: 'var(--primary)', letterSpacing: '2px' }}>LOADING DETAILS...</h2>
        </div>
    );

    if (!person) return <div style={{ padding: '100px', textAlign: 'center' }}>Person not found.</div>;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
            {/* Top Navigation Bar space logic handles transparent background via Navbar, we just need padding */}
            <div style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), var(--bg-dark))', padding: '120px 50px 50px 50px' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid var(--glass-border)',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '40px',
                        width: 'fit-content',
                        transition: 'background 0.3s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                    <ArrowLeft size={18} /> Back
                </button>

                <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ flexShrink: 0, width: '350px', maxWidth: '100%' }}
                    >
                        <img
                            src={getImageUrl(person.profile_path, 'h632')}
                            alt={person.name}
                            style={{
                                width: '100%',
                                borderRadius: '16px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                                border: '1px solid var(--glass-border)',
                                objectFit: 'cover'
                            }}
                        />

                        <div style={{ marginTop: '30px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'var(--primary)' }}>Personal Info</h3>

                            <div style={{ marginBottom: '15px' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <User size={16} /> Known For
                                </div>
                                <div style={{ color: 'var(--text-muted)' }}>{person.known_for_department}</div>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Gender</div>
                                <div style={{ color: 'var(--text-muted)' }}>{person.gender === 1 ? 'Female' : person.gender === 2 ? 'Male' : 'Other'}</div>
                            </div>

                            {person.birthday && (
                                <div style={{ marginBottom: '15px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Birthday</div>
                                    <div style={{ color: 'var(--text-muted)' }}>
                                        {new Date(person.birthday).toLocaleDateString()}
                                        {person.deathday === null ? ` (${new Date().getFullYear() - new Date(person.birthday).getFullYear()} years old)` : ''}
                                    </div>
                                </div>
                            )}

                            {person.place_of_birth && (
                                <div style={{ marginBottom: '15px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <MapPin size={16} /> Place of Birth
                                    </div>
                                    <div style={{ color: 'var(--text-muted)' }}>{person.place_of_birth}</div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Details Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ flex: 1, minWidth: '300px' }}
                    >
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '30px', fontWeight: '900', letterSpacing: '-1px' }}>{person.name}</h1>

                        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--primary)' }}>Biography</h2>
                        <div style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            color: 'var(--text-muted)',
                            marginBottom: '50px',
                            whiteSpace: 'pre-line'
                        }}>
                            {person.biography || `We don't have a biography for ${person.name}.`}
                        </div>

                        {/* Credits / Known For */}
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ width: '4px', height: '24px', background: 'var(--primary)', borderRadius: '2px' }}></span>
                            Known For
                        </h2>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                            gap: '20px'
                        }}>
                            {person.movie_credits?.cast?.slice(0, 10).map(movie => (
                                <div
                                    key={movie.credit_id}
                                    style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
                                    onClick={() => navigate(`/movie/${movie.id}`)}
                                    // Make sure hover effect works
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <img
                                        src={getImageUrl(movie.poster_path, 'w342')}
                                        alt={movie.title}
                                        style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '10px' }}
                                    />
                                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', textAlign: 'center' }}>{movie.title}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PersonDetails;

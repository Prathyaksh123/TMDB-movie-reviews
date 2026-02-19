import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../services/tmdb';
import { Star, Clock, Calendar, Play, ArrowLeft, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import MovieCard from '../components/MovieCard';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
                window.scrollTo(0, 0);
            } catch (error) {
                console.error("Error fetching details:", error);
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

    if (!movie) return <div style={{ padding: '100px', textAlign: 'center' }}>Movie not found.</div>;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
            {/* Hero Backdrop Section */}
            <div style={{
                height: '70vh',
                width: '100%',
                position: 'relative',
                backgroundImage: `linear-gradient(to bottom, transparent 0%, var(--bg-dark) 100%), url(${getImageUrl(movie.backdrop_path)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        position: 'absolute',
                        top: '100px',
                        left: '50px',
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid var(--glass-border)',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        zIndex: 10
                    }}
                >
                    <ArrowLeft size={18} /> Back
                </button>
            </div>

            {/* Content Section */}
            <div style={{
                marginTop: '-200px',
                padding: '0 50px 100px 50px',
                position: 'relative',
                zIndex: 5,
                display: 'flex',
                gap: '40px'
            }}>
                {/* Poster */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ flexShrink: 0 }}
                >
                    <img
                        src={getImageUrl(movie.poster_path, 'w500')}
                        alt={movie.title}
                        style={{
                            width: '300px',
                            borderRadius: '12px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                            border: '1px solid var(--glass-border)'
                        }}
                    />
                </motion.div>

                {/* Info */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ flex: 1 }}
                >
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>{movie.title}</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--primary)', fontStyle: 'italic', marginBottom: '20px' }}>
                        {movie.tagline}
                    </p>

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Star size={20} fill="var(--primary)" color="var(--primary)" />
                            <span style={{ fontWeight: 'bold' }}>{movie.vote_average.toFixed(1)}</span>
                            <span style={{ color: 'var(--text-muted)' }}>/ 10</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)' }}>
                            <Clock size={18} /> {movie.runtime} min
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)' }}>
                            <Calendar size={18} /> {new Date(movie.release_date).toLocaleDateString()}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                        {movie.genres?.map(genre => (
                            <span key={genre.id} style={{
                                padding: '5px 15px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '20px',
                                fontSize: '0.9rem',
                                border: '1px solid var(--glass-border)'
                            }}>
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <h3 style={{ marginBottom: '15px', color: 'var(--primary)' }}>Description</h3>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '40px' }}>
                        {movie.overview}
                    </p>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <button className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
                            <Play fill="#000" size={20} /> Watch Trailer
                        </button>
                        <button className="glass-morphism" style={{
                            padding: '15px 40px',
                            color: '#fff',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>
                            Add to Watchlist
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Cast Section */}
            <div style={{ padding: '0 50px 100px 50px' }}>
                <h2 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '4px', height: '30px', background: 'var(--primary)', borderRadius: '2px' }}></span>
                    Top Cast
                </h2>
                <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px' }}>
                    {movie.credits?.cast.slice(0, 10).map(person => (
                        <div key={person.id} style={{ flexShrink: 0, width: '150px', textAlign: 'center' }}>
                            <img
                                src={getImageUrl(person.profile_path, 'w185')}
                                alt={person.name}
                                style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', border: '2px solid var(--glass-border)' }}
                            />
                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{person.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{person.character}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recommendations */}
            {movie.recommendations?.results.length > 0 && (
                <div style={{ padding: '0 50px 100px 50px' }}>
                    <h2 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '4px', height: '30px', background: 'var(--primary)', borderRadius: '2px' }}></span>
                        More Like This
                    </h2>
                    <div className="movie-grid">
                        {movie.recommendations.results.slice(0, 6).map(m => (
                            <MovieCard key={m.id} movie={m} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;

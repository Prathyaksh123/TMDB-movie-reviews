import React from 'react';
import { Play, Info, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { getImageUrl } from '../services/tmdb';
import { useNavigate } from 'react-router-dom';

const Hero = ({ movie }) => {
    const navigate = useNavigate();
    if (!movie) return null;

    return (
        <div style={{
            height: '85vh',
            width: '100%',
            position: 'relative',
            backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 70%, var(--bg-dark) 100%), url(${getImageUrl(movie.backdrop_path)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '0 50px 100px 50px'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ maxWidth: '800px' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary)', fontWeight: 'bold' }}>
                        <Star size={20} fill="var(--primary)" />
                        <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>|</span>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>{movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}</span>
                </div>

                <h1 style={{ fontSize: '4rem', marginBottom: '20px', lineHeight: '1.1' }}>{movie.title || movie.name}</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px', maxWidth: '600px' }}>
                    {movie.overview}
                </p>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <button className="btn-primary" style={{ padding: '15px 35px', fontSize: '1.1rem' }}>
                        <Play fill="#000" size={20} /> Watch Trailer
                    </button>
                    <button
                        onClick={() => navigate(`/movie/${movie.id}`)}
                        className="glass-morphism" style={{
                            padding: '15px 35px',
                            fontSize: '1.1rem',
                            color: '#fff',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                        <Info size={20} /> More Info
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;

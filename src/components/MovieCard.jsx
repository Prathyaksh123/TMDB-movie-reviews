import React from 'react';
import { Star, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { getImageUrl } from '../services/tmdb';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.id}`)}
        >
            <div style={{ position: 'relative' }}>
                <img
                    src={getImageUrl(movie.poster_path, 'w500')}
                    alt={movie.title}
                    className="movie-poster"
                />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '15px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                }} className="hover-overlay">
                    <Play fill="#fff" size={40} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                </div>
            </div>

            <div className="movie-info">
                <div className="movie-rating">
                    <Star size={16} fill="var(--primary)" />
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </div>
                <div className="movie-title">{movie.title || movie.name}</div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        // Wishlist logic here
                    }}
                    style={{
                        width: '100%',
                        padding: '8px',
                        marginTop: '10px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--accent)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.8rem'
                    }}>
                    + Wishlist
                </button>
            </div>

            <style>{`
        .movie-card:hover .hover-overlay {
          opacity: 1;
        }
      `}</style>
        </motion.div>
    );
};

export default MovieCard;

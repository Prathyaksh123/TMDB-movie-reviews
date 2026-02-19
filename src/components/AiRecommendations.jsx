import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Zap, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGenres, getMoviesByGenre } from '../services/tmdb';
import MovieCard from './MovieCard';

const AiRecommendations = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [movies, setMovies] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [hasAnalyzed, setHasAnalyzed] = useState(false);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getGenres();
                // Filter to most interesting genres for AI to "pick"
                setGenres(data.slice(0, 12));
            } catch (err) {
                console.error("Genre fetch error", err);
            }
        };
        fetchGenres();
    }, []);

    const toggleGenre = (id) => {
        setSelectedGenres(prev =>
            prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
        );
    };

    const handleAnalyze = async () => {
        if (selectedGenres.length === 0) return;

        setIsAnalyzing(true);
        setHasAnalyzed(false);

        // Simulated AI "thinking" time for effect
        setTimeout(async () => {
            try {
                const results = await getMoviesByGenre(selectedGenres.join(','));
                setMovies(results.slice(0, 6));
                setIsAnalyzing(false);
                setHasAnalyzed(true);
            } catch (err) {
                console.error("AI discovery error", err);
                setIsAnalyzing(false);
            }
        }, 2000);
    };

    return (
        <section style={{
            margin: '60px 0',
            padding: '40px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(123, 31, 162, 0.1) 0%, rgba(13, 71, 161, 0.1) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decorative Glow */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '400px',
                height: '400px',
                background: 'rgba(55, 143, 233, 0.15)',
                filter: 'blur(100px)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                    <div style={{
                        background: 'linear-gradient(to right, #f5c518, #ff8c00)',
                        padding: '8px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Sparkles size={20} color="#000" />
                    </div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>AI Personal Assistant</h2>
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
                    Select your favorite styles and let our AI curate a unique cinematic experience just for you.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '30px' }}>
                    {genres.map(genre => (
                        <motion.button
                            key={genre.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleGenre(genre.id)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '30px',
                                border: '1px solid',
                                borderColor: selectedGenres.includes(genre.id) ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                background: selectedGenres.includes(genre.id) ? 'rgba(245, 197, 24, 0.1)' : 'rgba(255,255,255,0.05)',
                                color: selectedGenres.includes(genre.id) ? 'var(--primary)' : '#fff',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontSize: '0.9rem',
                                fontWeight: '600'
                            }}
                        >
                            {genre.name}
                        </motion.button>
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        onClick={handleAnalyze}
                        disabled={selectedGenres.length === 0 || isAnalyzing}
                        style={{
                            padding: '15px 40px',
                            borderRadius: '12px',
                            background: 'var(--primary)',
                            color: '#000',
                            border: 'none',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: selectedGenres.length === 0 ? 'not-allowed' : 'pointer',
                            opacity: selectedGenres.length === 0 ? 0.5 : 1,
                            boxShadow: '0 10px 20px rgba(245, 197, 24, 0.3)'
                        }}
                    >
                        {isAnalyzing ? (
                            <>
                                <Zap className="animate-spin" size={20} />
                                Analyzing Taste Profile...
                            </>
                        ) : (
                            <>
                                <Brain size={20} />
                                Generate AI Suggestions
                            </>
                        )}
                    </button>
                </div>

                <AnimatePresence>
                    {hasAnalyzed && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ marginTop: '50px' }}
                        >
                            <h3 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Target size={22} color="var(--primary)" />
                                Curated Hits Just For You
                            </h3>
                            <div className="movie-grid">
                                {movies.map(movie => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default AiRecommendations;

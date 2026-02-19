import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearch = async () => {
            if (!query) return;
            setLoading(true);
            try {
                const results = await searchMovies(query);
                setMovies(results);
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSearch();
    }, [query]);

    return (
        <div style={{ padding: '120px 50px 50px 50px', minHeight: '100vh' }}>
            <h1 style={{ marginBottom: '30px' }}>
                Results for: <span style={{ color: 'var(--primary)' }}>"{query}"</span>
            </h1>

            {loading ? (
                <div style={{ padding: '50px', textAlign: 'center' }}>Loading results...</div>
            ) : movies.length > 0 ? (
                <div className="movie-grid">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div style={{ padding: '50px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No movies found for "{query}". Try another search.
                </div>
            )}
        </div>
    );
};

export default SearchResults;

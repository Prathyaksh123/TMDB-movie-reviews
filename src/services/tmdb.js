import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
// The user should provide their API Key here.
// For now, I'll use a placeholder and warn the user.
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'YOUR_API_KEY_HERE';

const tmdb = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

export const getPopularMovies = async () => {
    const response = await tmdb.get('/movie/popular');
    return response.data.results;
};

export const getTrendingMovies = async () => {
    const response = await tmdb.get('/trending/movie/day');
    return response.data.results;
};

export const getHindiMovies = async () => {
    const response = await tmdb.get('/discover/movie', {
        params: {
            with_original_language: 'hi',
            sort_by: 'popularity.desc'
        }
    });
    return response.data.results;
};

export const getTeluguMovies = async () => {
    const response = await tmdb.get('/discover/movie', {
        params: {
            with_original_language: 'te',
            sort_by: 'popularity.desc'
        }
    });
    return response.data.results;
};

export const getTamilMovies = async () => {
    const response = await tmdb.get('/discover/movie', {
        params: {
            with_original_language: 'ta',
            sort_by: 'popularity.desc'
        }
    });
    return response.data.results;
};

export const getKannadaMovies = async () => {
    const response = await tmdb.get('/discover/movie', {
        params: {
            with_original_language: 'kn',
            sort_by: 'popularity.desc'
        }
    });
    return response.data.results;
};

export const getMalayalamMovies = async () => {
    const response = await tmdb.get('/discover/movie', {
        params: {
            with_original_language: 'ml',
            sort_by: 'popularity.desc'
        }
    });
    return response.data.results;
};

export const getIndianMovies = async () => {
    const response = await tmdb.get('/discover/movie', {
        params: {
            with_origin_country: 'IN',
            sort_by: 'popularity.desc'
        }
    });
    return response.data.results;
};

export const getHollywoodMovies = async () => {
    const response = await tmdb.get('/discover/movie', {
        params: {
            with_original_language: 'en',
            region: 'US',
            sort_by: 'popularity.desc'
        }
    });
    return response.data.results;
};

export const getIndianTVShows = async () => {
    const response = await tmdb.get('/discover/tv', {
        params: {
            with_origin_country: 'IN',
            sort_by: 'popularity.desc'
        }
    });
    return response.data.results;
};

export const getHollywoodTVShows = async () => {
    const response = await tmdb.get('/discover/tv', {
        params: {
            with_original_language: 'en',
            sort_by: 'popularity.desc'
        }
    });
    return response.data.results;
};

export const searchMovies = async (query) => {
    const response = await tmdb.get('/search/movie', {
        params: { query },
    });
    return response.data.results;
};

export const getMovieDetails = async (id) => {
    const response = await tmdb.get(`/movie/${id}`, {
        params: { append_to_response: 'videos,credits,recommendations' },
    });
    return response.data;
};

export const getGenres = async () => {
    const response = await tmdb.get('/genre/movie/list');
    return response.data.genres;
};

export const getMoviesByGenre = async (genreIds) => {
    const response = await tmdb.get('/discover/movie', {
        params: {
            with_genres: genreIds,
            sort_by: 'popularity.desc'
        }
    });
    return response.data.results;
};

export const getImageUrl = (path, size = 'original') => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `https://image.tmdb.org/t/p/${size}${path}`;
};

export default tmdb;

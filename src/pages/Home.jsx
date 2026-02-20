import React, { useEffect, useState } from 'react';
import {
    getPopularMovies,
    getTrendingMovies,
    getIndianMovies,
    getHollywoodMovies,
    getIndianTVShows,
    getHollywoodTVShows,
    getHindiMovies,
    getTeluguMovies,
    getTamilMovies,
    getKannadaMovies,
    getMalayalamMovies
} from '../services/tmdb';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import ApiKeyWarning from '../components/ApiKeyWarning';
import AiRecommendations from '../components/AiRecommendations';

const Home = () => {
    const [trending, setTrending] = useState([]);
    const [hindiMovies, setHindiMovies] = useState([]);
    const [teluguMovies, setTeluguMovies] = useState([]);
    const [tamilMovies, setTamilMovies] = useState([]);
    const [kannadaMovies, setKannadaMovies] = useState([]);
    const [malayalamMovies, setMalayalamMovies] = useState([]);
    const [hollywoodMovies, setHollywoodMovies] = useState([]);
    const [indianTV, setIndianTV] = useState([]);
    const [hollywoodTV, setHollywoodTV] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasKey, setHasKey] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = import.meta.env.VITE_TMDB_API_KEY;
            if (!apiKey || apiKey === 'YOUR_TMDB_API_KEY_HERE' || apiKey === '') {
                setHasKey(false);
                setLoading(false);
                return;
            }
            try {
                const [
                    trendingData,
                    hindiData,
                    teluguData,
                    tamilData,
                    kannadaData,
                    malayalamData,
                    hollywoodMoviesData,
                    indianTVData,
                    hollywoodTVData
                ] = await Promise.all([
                    getTrendingMovies(),
                    getHindiMovies(),
                    getTeluguMovies(),
                    getTamilMovies(),
                    getKannadaMovies(),
                    getMalayalamMovies(),
                    getHollywoodMovies(),
                    getIndianTVShows(),
                    getHollywoodTVShows()
                ]);

                setTrending(trendingData);
                setHindiMovies(hindiData);
                setTeluguMovies(teluguData);
                setTamilMovies(tamilData);
                setKannadaMovies(kannadaData);
                setMalayalamMovies(malayalamData);
                setHollywoodMovies(hollywoodMoviesData);
                setIndianTV(indianTVData);
                setHollywoodTV(hollywoodTVData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)' }}>
            <h2 style={{ color: 'var(--primary)', letterSpacing: '2px' }}>LOADING TMDB clone...</h2>
        </div>
    );

    if (!hasKey) return <ApiKeyWarning />;

    const Section = ({ title, data }) => (
        <>
            <h2 style={{ margin: '60px 0 30px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '4px', height: '30px', background: 'var(--primary)', borderRadius: '2px' }}></span>
                {title}
            </h2>
            <div className="movie-grid">
                {data.slice(0, 6).map(item => (
                    <MovieCard key={item.id} movie={item} />
                ))}
            </div>
        </>
    );

    return (
        <div>
            <Hero movie={trending[0]} />

            <div style={{ padding: '40px 50px' }}>
                <Section title="Trending Now" data={trending.slice(1)} />
                <AiRecommendations />
                <Section title="Hindi Blockbusters" data={hindiMovies} />
                <Section title="Telugu Hits" data={teluguMovies} />
                <Section title="Tamil Cinema" data={tamilMovies} />
                <Section title="Kannada Movies" data={kannadaMovies} />
                <Section title="Malayalam Excellence" data={malayalamMovies} />
                <Section title="Hollywood Spotlight" data={hollywoodMovies} />
                <Section title="Indian TV Shows" data={indianTV} />
                <Section title="Hollywood TV Shows" data={hollywoodTV} />
            </div>
        </div>
    );
};

export default Home;

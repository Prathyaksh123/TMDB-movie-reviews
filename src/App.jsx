import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import MovieDetails from './pages/MovieDetails';
import Celebs from './pages/Celebs';
import PersonDetails from './pages/PersonDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/celebs" element={<Celebs />} />
            <Route path="/person/:id" element={<PersonDetails />} />
          </Routes>
        </main>

        <footer style={{
          padding: '60px 50px',
          textAlign: 'center',
          background: 'var(--bg-darker)',
          marginTop: '100px',
          color: 'var(--text-muted)'
        }}>
          <div style={{ marginBottom: '20px', color: 'var(--primary)', fontWeight: 'bold' }}>TMDB clone</div>
          <p>© 2024 Built with React & TMDB API</p>
          <p style={{ marginTop: '10px', fontSize: '0.8rem' }}>A premium cinematic experience.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

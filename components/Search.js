// components/Search.js
import { useState } from 'react';
import styles from '../styles/Search.module.css';

const Search = ({ setTracks }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        const tracks = await fetch(`/api/search?query=${query}`);
        const data = await tracks.json();
        setTracks(data);
    };

    return (
        <form className={styles.formcls} onSubmit={handleSearch}>
            <input
                type="text"
                className={styles.searchInput}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a song..."
                required
            />
            <button type="submit" className={styles.searchButton}>Search</button>
        </form>
    );
};

export default Search;

// components/Search.js
import { useState } from 'react';
import styles from '../styles/Search.module.css';

/**
 * A simple search form that fetches tracks from the Last.fm API and passes
 * the results to the parent component via the setTracks callback.
 *
 * @param {function} setTracks - A callback function that takes an array of
 *  track objects and sets the state of the parent component.
 */
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

// lib/lastfm.js
import { rateLimit } from './rateLimiter'; // Import the rate limiter

const API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_API = process.env.LASTFM_API_URL;

const MAX_REQUESTS = process.env.MAX_REQUESTS; // Maximum number of requests allowed
const TIME_INTERVAL = process.env.TIME_INTERVAL; // Time interval in milliseconds (e.g., 1 second)

export const searchSongs = async (query) => {
    await rateLimit(MAX_REQUESTS, TIME_INTERVAL); // Wait for rate limit
    const response = await fetch(`${LASTFM_API}?method=track.search&track=${query}&api_key=${API_KEY}&format=json`);
    const data = await response.json();
    return data.results.trackmatches.track;
};

export const getTrackDetails = async (track, artist) => {
    await rateLimit(MAX_REQUESTS, TIME_INTERVAL);
    const response = await fetch(`${LASTFM_API}?method=track.getinfo&track=${track}&artist=${artist}&api_key=${API_KEY}&format=json`);
    const data = await response.json();
    return data.track;
};

export const getArtistTopAlbums = async (artist) => {
    await rateLimit(MAX_REQUESTS, TIME_INTERVAL);
    const response = await fetch(`${LASTFM_API}?method=artist.gettopalbums&artist=${artist}&api_key=${API_KEY}&format=json&limit=5`);
    const data = await response.json();
    return data.topalbums.album;
};

export const getArtistTopTracks = async (artist) => {
    await rateLimit(MAX_REQUESTS, TIME_INTERVAL);
    const response = await fetch(`${LASTFM_API}?method=artist.gettoptracks&artist=${artist}&api_key=${API_KEY}&format=json&limit=5`);
    const data = await response.json();
    return data.toptracks.track;
};

export const getRelatedArtists = async (artist) => {
    await rateLimit(MAX_REQUESTS, TIME_INTERVAL);
    const response = await fetch(`${LASTFM_API}?method=artist.getsimilar&artist=${encodeURIComponent(artist)}&api_key=${API_KEY}&format=json&limit=5`);
    const data = await response.json();
    return data.similarartists.artist || [];
};

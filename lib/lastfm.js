// lib/lastfm.js
const API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_API = process.env.LASTFM_API_URL;

/**
 * Searches for tracks on Last.fm, given a query string.
 * @param {string} query - The query string to search for.
 * @return {Promise<object[]>} A promise that resolves to an array of objects, each containing the details of a matching track.
 */
export const searchSongs = async (query) => {
    const response = await fetch(`${LASTFM_API}?method=track.search&track=${query}&api_key=${API_KEY}&format=json`);
    const data = await response.json();
    return data.results.trackmatches.track;
};

/**
 * Fetches details about a track from Last.fm, given the track name and artist.
 * @param {string} track - The track name.
 * @param {string} artist - The artist name.
 * @return {Promise<object>} A promise that resolves to the track's details.
 */

export const getTrackDetails = async (track, artist) => {
    const response = await fetch(`${LASTFM_API}?method=track.getinfo&track=${track}&artist=${artist}&api_key=${API_KEY}&format=json`);
    console.log(response);
    const data = await response.json();
    return data.track;
};

/**
 * Fetches a list of the top 5 albums for a given artist from Last.fm.
 * @param {string} artist - The artist name.
 * @return {Promise<object[]>} A promise that resolves to an array of the artist's top 5 albums.
 */
export const getArtistTopAlbums = async (artist) => {
    const response = await fetch(`${LASTFM_API}?method=artist.gettopalbums&artist=${artist}&api_key=${API_KEY}&format=json&limit=5`);
    const data = await response.json();
    return data.topalbums.album;
};

/**
 * Fetches the top 5 tracks for a given artist from Last.fm.
 * @param {string} artist - The artist name.
 * @return {Promise<object[]>} A promise that resolves to an array of the artist's top 5 tracks.
 */
export const getArtistTopTracks = async (artist) => {
    const response = await fetch(`${LASTFM_API}?method=artist.gettoptracks&artist=${artist}&api_key=${API_KEY}&format=json&limit=5`);
    const data = await response.json();
    return data.toptracks.track;
};

/**
 * Fetches a list of related artists for a given artist from Last.fm.
 * @param {string} artist - The artist name.
 * @return {Promise<object[]>} A promise that resolves to an array of related artists.
 */
export const getRelatedArtists = async (artist) => {
    const response = await fetch(`${LASTFM_API}?method=artist.getsimilar&artist=${encodeURIComponent(artist)}&api_key=${API_KEY}&format=json&limit=5`);
    const data = await response.json();
    return data.similarartists.artist || [];
};
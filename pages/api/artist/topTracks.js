// pages/api/artist/topTracks.js

import { getArtistTopTracks } from '../../../lib/lastfm';

/**
 * Handles GET requests to /api/artist/topTracks.
 * Requires the following query parameters:
 * - artist (string): The name of the artist.
 * Returns a JSON object containing the top 5 tracks of the artist.
 * Returns a 400 error if the artist parameter is missing.
 * Returns a 500 error if there's an error fetching the top tracks.
 */
export default async function handler(req, res) {
    const { artist } = req.query;

    if (!artist) {
        return res.status(400).json({ error: 'Artist name is required' });
    }

    try {
        const topTracks = await getArtistTopTracks(artist);
        res.status(200).json(topTracks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch top tracks from Last.fm' });
    }
}
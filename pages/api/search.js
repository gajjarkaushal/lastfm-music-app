// pages/api/search.js
import { searchSongs } from '../../lib/lastfm';

/**
 * Handles GET requests to /api/search.
 * Requires the following query parameters:
 * - query (string): The search query.
 * Returns a JSON object containing the search results.
 * Returns a 400 error if the query parameter is missing.
 * Returns a 500 error if there's an error fetching the search results.
 */
export default async function handler(req, res) {
    const { query } = req.query;    
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }
    
    try {
        const tracks = await searchSongs(query);
        return res.status(200).json(tracks);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch tracks' });
    }
}

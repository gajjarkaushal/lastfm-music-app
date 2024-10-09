// pages/api/search.js
import { searchSongs } from '../../lib/lastfm';

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

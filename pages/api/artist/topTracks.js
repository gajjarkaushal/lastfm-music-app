// pages/api/artist/topTracks.js

import { getArtistTopTracks } from '../../../lib/lastfm';

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
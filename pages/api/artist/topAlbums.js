// pages/api/artist/topAlbums.js

import { getArtistTopAlbums } from '../../../lib/lastfm';

export default async function handler(req, res) {
    const { artist } = req.query;

    if (!artist) {
        return res.status(400).json({ error: 'Artist name is required' });
    }

    try {
        const topAlbums = await getArtistTopAlbums(artist);
        res.status(200).json(topAlbums);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch top albums from Last.fm' });
    }
}

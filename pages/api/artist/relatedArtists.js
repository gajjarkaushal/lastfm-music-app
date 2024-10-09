// pages/api/artist/relatedArtists.js

import { getRelatedArtists } from '../../../lib/lastfm';

export default async function handler(req, res) {
    const { artist } = req.query;

    if (!artist) {
        return res.status(400).json({ error: 'Artist name is required' });
    }

    try {
        const relatedArtists = await getRelatedArtists(artist);
        res.status(200).json(relatedArtists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch related artists from Last.fm' });
    }
}

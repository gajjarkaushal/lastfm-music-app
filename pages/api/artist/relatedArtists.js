// pages/api/artist/relatedArtists.js

import { getRelatedArtists } from '../../../lib/lastfm';

/**
 * Handles an API request to fetch related artists for a given artist.
 * @param {http.IncomingMessage} req - The request object.
 * @param {http.ServerResponse} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the request is fulfilled.
 */
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

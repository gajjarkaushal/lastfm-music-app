// pages/api/track.js
import { getTrackDetails } from '../../lib/lastfm';

export default async function handler(req, res) {
    const { name, artist } = req.query;
    if (!name || !artist) { // Check if name and artist are provided
        return res.status(400).json({ error: 'Track name and artist is required' });
    }

    try {
        const track = await getTrackDetails(name, artist);
        console.log(track);

        return res.status(200).json(track);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch track details' });
    }
}

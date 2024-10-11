# lastfm-music-app

Create a music search application using ReactJS and Next.js that integrates with the Last.fm API. The application should open a detail page displaying listing about the song, the artist, the album, a list of related artists, and the top songs by the same artist (excluding the current song).

The application should provide the following functionality:
● Have a search box
● Ability to search by song title
● When clicking on a song, it opens a detail page with a section about the song, the artist,
the album, a list of related artists, and top songs (excluding the current song) also by the
same artist

### Create .env.local file and setup environment variables.

NEXT_PUBLIC_API_URL=/api/track
BASE_URL=http://localhost:3000/
LASTFM_API_KEY={Write your API Key Refer. https://www.last.fm/}
LASTFM_API_URL=https://ws.audioscrobbler.com/2.0/
MAX_REQUESTS=5
TIME_INTERVAL=1000

### Run NPM commands

npm install
npm run dev

### Notes

Refere Doc: https://www.last.fm/api

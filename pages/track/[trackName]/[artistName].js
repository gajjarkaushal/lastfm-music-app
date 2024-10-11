// pages/track/[trackName]/[artistName].js
import { useRouter } from 'next/router';
import styles from '../../../styles/TrackDetail.module.css'; // Import CSS module for styling

/**
 * TrackDetail component renders a detailed view of a track, including its name, artist, 
 * duration, listeners, play count, tags, and a brief summary. It also displays the top
 * albums and tracks by the artist, as well as related artists.
 * 
 * @param {object} trackInfo - The track info object containing details about the track.
 * @param {object[]} topAlbums - The top albums by the artist.
 * @param {object[]} topTracks - The top tracks by the artist.
 * @param {object[]} relatedArtists - The related artists to the artist.
 * @returns {JSX.Element} The TrackDetail component.
 */
const TrackDetail = ({ trackInfo, topAlbums, topTracks, relatedArtists }) => {
  const router = useRouter();
  const { trackName, artistName } = router.query;

  // Handle loading state if trackInfo is not available
  if (!trackInfo) {
    return <div>Loading...</div>;
  }

  const {
    name,
    url,
    duration,
    listeners,
    playcount,
    artist,
    album,
    toptags,
    wiki,
  } = trackInfo;

  // Convert duration from milliseconds to minutes and seconds
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={styles.container}>
      <h1>Track: <a href={url} className={styles.link}>{name}</a></h1>
      <div className={styles.artistInfo}>
        <h2>Artist: <a href={artist.url} className={styles.link}>{artist.name}</a></h2>
        <p><strong>Listeners:</strong> {listeners}</p>
        <p><strong>Play Count:</strong> {playcount}</p>
      </div>

      <div className={styles.trackInfo}>
        <p><strong>Duration:</strong> <span className={styles.duration}>{formatDuration(duration)}</span></p>
        <p><strong>More Info:</strong> <a href={url} className={styles.link}>Listen on Last.fm</a></p>
      </div>

      <div className={styles.tags}>
        <h3>Tags:</h3>
        {toptags.tag.map((tag, index) => (
          <a key={index} href={tag.url} className={styles.tagLink}>{tag.name}</a>
        ))}
      </div>

      <div className={styles.wiki}>
        <h3>About the Track:</h3>
        <p><strong>Summary:</strong> {wiki?.summary}</p>
        <p><a href={url} className={styles.link}>Read more on Last.fm</a></p>
      </div>

      {/* Top Albums Section */}
      <div className={styles.topAlbums}>
        <h3>Top Albums by {artist.name}</h3>
        <ul>
          {topAlbums.map((album, index) => (
            <li key={index} className={styles.albumItem}>
              <a href={album.url} className={styles.albumLink}>
                <img src={album.image[2]['#text']} alt={album.name} className={styles.albumImage} />
                <div className={styles.albumDetails}>
                  <span>{album.name}</span>
                  <span>by <a href={album.artist.url} className={styles.link}>{album.artist.name}</a></span>
                  <span>({album.playcount.toLocaleString()} plays)</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Top Tracks Section */}
      <div className={styles.topTracks}>
        <h3>Top Tracks by {artist.name}</h3>
        <ul>
          {topTracks.map((track, index) => (
            <li key={index} className={styles.trackItem}>
              <a href={track.url} className={styles.trackLink}>
                <img src={track.image[2]['#text']} alt={track.name} className={styles.trackImage} />
                <div className={styles.trackDetails}>
                  <span>{track.name}</span>
                  <span>({track.playcount.toLocaleString()} plays)</span>
                  <span>by <a href={track.artist.url} className={styles.link}>{track.artist.name}</a></span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Related Artists Section */}
      <div className={styles.relatedArtists}>
        <h3>Related Artists</h3>
        <ul className={styles.relatedArtistList}>
          {relatedArtists.map((relatedArtist, index) => (
            <li key={index} className={styles.relatedArtistItem}>
              <a href={relatedArtist.url} className={styles.link}>
                <img src={relatedArtist.image[2]['#text']} alt={relatedArtist.name} className={styles.relatedArtistImage} />
                <div className={styles.relatedArtistDetails}>
                  <span>{relatedArtist.name}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Back Button */}
      <button className={styles.backButton} onClick={() => router.back()}>
        Back
      </button>
    </div>
  );
};

// Fetch data based on track and artist
export async function getServerSideProps(context) {
  const { trackName, artistName } = context.params;
  const BASE_URL = process.env.BASE_URL;

  // Fetch data from the API
  const res = await fetch(`${BASE_URL}/api/track?name=${trackName}&artist=${artistName}`);
  const trackInfo = await res.json();

  // Fetch top albums for the artist
  const resAlbums = await fetch(`${BASE_URL}/api/artist/topAlbums?artist=${artistName}`);
  const topAlbums = await resAlbums.json();

  // Fetch top tracks for the artist
  const resTracks = await fetch(`${BASE_URL}/api/artist/topTracks?artist=${artistName}`);
  const topTracks = await resTracks.json();

  // Fetch related artists for the artist
  const resRelated = await fetch(`${BASE_URL}/api/artist/relatedArtists?artist=${artistName}`);
  const relatedArtists = await resRelated.json();

  // Handle errors in data fetching
  if (!res.ok) {
    return {
      notFound: true, // Return a 404 page if data fetching fails
    };
  }

  return {
    props: {
      trackInfo,
      topAlbums,
      topTracks,
      relatedArtists, // Pass the track information to the page component
    },
  };
}

export default TrackDetail;

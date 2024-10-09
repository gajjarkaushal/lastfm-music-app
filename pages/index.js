import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Search from '../components/Search';
import Link from 'next/link';

/**
 * The homepage of the Music App, containing a search form and a list of
 * tracks that have been searched for.
 *
 * The search form is a component that fetches tracks from the Last.fm API
 * and passes the results to the parent component via the setTracks callback.
 *
 * The track list is rendered when there are tracks to display, and it shows
 * each track as a link to the track detail page. The track name and artist
 * are displayed, along with the cover art.
 *
 * The track detail page is linked to via a Next.js Link component, which
 * provides client-side routing.
 *
 * The page also includes a footer with a link to the Vercel website and a
 * message indicating that the app was built with Next.js.
 *
 * @returns {ReactElement} The rendered homepage.
 */
export default function Home() {
  const [tracks, setTracks] = useState([]);
  const cleanTrackName = (name) => {
    return name
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9]/g, ''); // Remove special characters and spaces
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Music Library</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Music App
        </h1>
        <div className={styles.contentContainer}> {/* Use styled container */}
          <section className={styles.searchContainer}>
            <Search setTracks={setTracks} />
          </section>
          <section className={styles.trackListContainer}>
            {tracks.length > 0 && (
              <ul className={styles.trackList}>
                {tracks.map((track) => {
                  const cleanedTrackName = cleanTrackName(track.name);
                  return (
                    <li key={cleanedTrackName} className={styles.trackItem}>
                      <Link href={`/track/${track.name}/${track.artist}`}>
                        <img 
                          src={track.image[2]['#text']} 
                          alt={`${track.name} cover`} 
                          className={styles.trackImage} 
                        />
                        <div className={styles.trackInfo}>
                          <h2>{track.name}</h2>
                          <p>by {track.artist}</p>
                        </div>
                      </Link>
                    </li>
                  );
              })}
              </ul>
            )}
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
         Kaushal Gajjar
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f9f9f9; /* Match footer background with track item */
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          background-color: #f0f0f0; /* Subtle background color for the entire page */
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

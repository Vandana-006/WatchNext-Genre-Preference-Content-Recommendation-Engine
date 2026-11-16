
import { useEffect, useState } from "react";
import {
  Home, Compass, Bookmark, Heart, Settings, Search, Bell,
  Play, Plus, Sparkles, Clapperboard, Flame, Film,
  ChevronRight, Menu, X
} from "lucide-react";
import "./Dashboard.css";

const fallbackMovies = [
  { id: 1, title: "Interstellar", genre: "Sci-Fi \u00B7 Adventure", rating: "8.7", art: "interstellar", poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { id: 2, title: "Inception", genre: "Sci-Fi \u00B7 Thriller", rating: "8.8", art: "inception", poster: "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg" },
  { id: 3, title: "The Dark Knight", genre: "Action \u00B7 Crime", rating: "9.0", art: "dark-knight", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { id: 4, title: "Dune: Part Two", genre: "Sci-Fi \u00B7 Drama", rating: "8.5", art: "dune", poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg" },
  { id: 5, title: "Oppenheimer", genre: "Drama \u00B7 History", rating: "8.3", art: "oppenheimer", poster: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg" },
  { id: 6, title: "The Batman", genre: "Action \u00B7 Crime", rating: "7.8", art: "batman", poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg" },
  { id: 7, title: "Avatar: The Way of Water", genre: "Sci-Fi \u00B7 Adventure", rating: "7.6", art: "avatar", poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg" },
  { id: 8, title: "Top Gun: Maverick", genre: "Action \u00B7 Drama", rating: "8.2", art: "topgun", poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg" },
  { id: 9, title: "Everything Everywhere", genre: "Sci-Fi \u00B7 Comedy", rating: "7.8", art: "everything", poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg" },
  { id: 10, title: "Parasite", genre: "Thriller \u00B7 Drama", rating: "8.5", art: "parasite", poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
  { id: 11, title: "Whiplash", genre: "Drama \u00B7 Music", rating: "8.5", art: "whiplash", poster: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg" },
  { id: 12, title: "The Matrix", genre: "Sci-Fi \u00B7 Action", rating: "8.7", art: "matrix", poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" }
];

const genres = ["All", "Sci-Fi", "Thriller", "Drama", "Action", "Adventure", "Crime", "Comedy"];

function Dashboard({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState("Home");
  const [activeGenre, setActiveGenre] = useState("All");
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [preferredGenres, setPreferredGenres] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [expandedWhyId, setExpandedWhyId] = useState(null);
  const [preferencesStatus, setPreferencesStatus] = useState("Loading preferences...");
  const [movies, setMovies] = useState(fallbackMovies);

  const moods = [
  { name: "Happy", emoji: "😊", genres: ["Comedy", "Adventure"] },
  { name: "Sad", emoji: "😢", genres: ["Drama"] },
  { name: "Mind-blown", emoji: "🤯", genres: ["Sci-Fi", "Thriller"] },
  { name: "Adventurous", emoji: "🔥", genres: ["Action", "Adventure"] },
  { name: "Relaxed", emoji: "😌", genres: ["Drama", "Comedy"] },
  { name: "Mysterious", emoji: "🕵️", genres: ["Crime", "Thriller"] }
];
// Load live trending movies from TMDB through our Spring Boot backend
useEffect(() => {
  const genreNames = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
  };

  let cancelled = false;

  const loadTrendingMovies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/movies/trending");

      if (!response.ok) {
        throw new Error("Could not load trending movies");
      }

      const data = await response.json();

      const liveMovies = (data.results || []).map((movie) => ({
        id: movie.id,
        title: movie.title || movie.original_title || "Untitled",
        genre: (movie.genre_ids || [])
          .map((id) => genreNames[id])
          .filter(Boolean)
          .join(" · ") || "Other",
        rating: Number(movie.vote_average || 0) > 0 ? Number(movie.vote_average).toFixed(1) : "NR",
        art: "tmdb",
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://placehold.co/500x750/100b2e/ffffff?text=No+Poster",
        overview: movie.overview || "",
        releaseDate: movie.release_date || ""
      }));

      const combinedMovies = [
        ...liveMovies,
        ...fallbackMovies.filter((fallback) =>
          !liveMovies.some(
            (live) => live.title.toLowerCase() === fallback.title.toLowerCase()
          )
        )
      ];

      if (!cancelled) {
        setMovies(combinedMovies);
        console.log("TMDB trending movies loaded:", liveMovies.length);
      }
    } catch (error) {
      console.error("TMDB loading error:", error);
      if (!cancelled) {
        setMovies(fallbackMovies);
      }
    }
  };

  loadTrendingMovies();

  return () => {
    cancelled = true;
  };
}, []);
// Load saved movies from the backend
useEffect(() => {
  if (!user?.id) return;

  let cancelled = false;

  const loadSavedMovies = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/saved-movies/${user.id}`
      );

      if (!response.ok) {
        throw new Error("Could not load saved movies");
      }

      const data = await response.json();

      if (!cancelled) {
        setWatchlist(Array.isArray(data.watchlist) ? data.watchlist : []);
        setFavourites(Array.isArray(data.favourites) ? data.favourites : []);
      }
    } catch (error) {
      console.error("Saved movies loading failed:", error);
    }
  };

  loadSavedMovies();

  return () => {
    cancelled = true;
  };
}, [user?.id]);
// Load saved preferences when the dashboard opens
useEffect(() => {
  if (!user?.id) return;

  fetch(`http://localhost:8080/api/preferences/${user.id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to load preferences");
      }
      return response.json();
    })
    .then((data) => {
      setPreferredGenres(data.genres || []);
      setPreferencesStatus("Preferences loaded");
    })
    .catch((error) => {
      console.error("Preference loading error:", error);
      setPreferencesStatus("Could not load preferences");
    });
}, [user?.id]);

const togglePreferredGenre = (genre) => {
  setPreferredGenres((current) =>
    current.includes(genre)
      ? current.filter((item) => item !== genre)
      : [...current, genre]
  );

  setPreferencesStatus("Unsaved changes");
};

const savePreferences = async () => {
  if (!user?.id) {
    setPreferencesStatus("Please log in again");
    return;
  }

  setPreferencesStatus("Saving...");

  try {
    const response = await fetch(
      `http://localhost:8080/api/preferences/${user.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          genres: preferredGenres
        })
      }
    );

    if (!response.ok) {
      throw new Error("Could not save preferences");
    }

    setPreferencesStatus("Preferences saved successfully!");
  } catch (error) {
    console.error("Preference saving error:", error);
    setPreferencesStatus("Save failed. Please try again.");
  }
};
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre =
      activeGenre === "All" ||
      movie.genre.toLowerCase().includes(activeGenre.toLowerCase());

    return matchesSearch && matchesGenre;
  });

  const recommendedMovies = filteredMovies.filter((movie) =>
    preferredGenres.some((genre) =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    )
  );
  const moodMovies = filteredMovies.filter((movie) => {
  const mood = moods.find((item) => item.name === selectedMood);

  return mood && mood.genres.some((genre) =>
    movie.genre.toLowerCase().includes(genre.toLowerCase())
  );
});

  const displayedMovies =
  activeNav === "My Watchlist"
    ? filteredMovies.filter((movie) => watchlist.includes(movie.id))
    : activeNav === "Favourites"
      ? filteredMovies.filter((movie) => favourites.includes(movie.id))
      : activeNav === "MoodSync"
        ? moodMovies
        : activeNav === "Home" && preferredGenres.length > 0
          ? recommendedMovies
          : filteredMovies;
        const tasteGenres = genres.filter((genre) => genre !== "All");

const tasteScores = tasteGenres.map((genre) => {
  const matchingMovies = movies.filter((movie) =>
    movie.genre.toLowerCase().includes(genre.toLowerCase())
  ).length;

  const selected = preferredGenres.includes(genre);

  return {
    name: genre,
    score: selected ? 100 : 0,
    movieCount: matchingMovies,
    selected
  };
});

const selectedTasteGenres = tasteScores.filter((item) => item.selected);

const tastePersonality =
  selectedTasteGenres.length === 0
    ? "The Open-Minded Explorer"
    : selectedTasteGenres.some((item) => item.name === "Sci-Fi")
      ? "The Cosmic Visionary"
      : selectedTasteGenres.some((item) => item.name === "Thriller")
        ? "The Mystery Seeker"
        : selectedTasteGenres.some((item) => item.name === "Drama")
          ? "The Story Seeker"
          : selectedTasteGenres.some((item) => item.name === "Adventure")
            ? "The Fearless Explorer"
            : "The Cinematic Explorer";
        const getRecommendationReasons = (movie) => {
  const reasons = [];

  const matchingGenres = preferredGenres.filter((genre) =>
    movie.genre.toLowerCase().includes(genre.toLowerCase())
  );

  if (matchingGenres.length > 0) {
    reasons.push(`Matches your preferred genre: ${matchingGenres.join(", ")}`);
  }

  const currentMood = moods.find((mood) => mood.name === selectedMood);

  if (
    currentMood &&
    currentMood.genres.some((genre) =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    )
  ) {
    reasons.push(`Fits your ${selectedMood.toLowerCase()} mood`);
  }

  if (Number(movie.rating) >= 8.5) {
    reasons.push("Highly rated by audiences");
  }

  if (reasons.length === 0) {
    reasons.push("Selected from your movie discovery collection");
  }

  return reasons;
};

  const toggleSavedMovie = async (movieId, listType) => {
    if (!user?.id) return;

    const isWatchlist = listType === "WATCHLIST";
    const currentList = isWatchlist ? watchlist : favourites;
    const isAlreadySaved = currentList.includes(movieId);

    const url = `http://localhost:8080/api/saved-movies/${user.id}/${listType}/${movieId}`;

    try {
      const response = await fetch(url, {
        method: isAlreadySaved ? "DELETE" : "POST"
      });

      if (!response.ok) throw new Error("Unable to update saved movies");

      const setter = isWatchlist ? setWatchlist : setFavourites;
      setter((current) =>
        isAlreadySaved
          ? current.filter((id) => id !== movieId)
          : [...current, movieId]
      );
    } catch (error) {
      console.error("Saved movie update error:", error);
    }
  };

  const navItems = [
  { label: "Home", icon: Home },
  { label: "MoodSync", icon: Sparkles },
  { label: "TasteDNA", icon: Film },
  { label: "Discover", icon: Compass },
  { label: "My Watchlist", icon: Bookmark },
  { label: "Favourites", icon: Heart }
];

  return (
    <div className="dashboard-page">
      <aside className={`dashboard-sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="dashboard-logo">
          <div className="logo-symbol"><Clapperboard size={23} /></div>
          <span>Watch<span className="logo-highlight">Next</span></span>
          <button className="mobile-close" onClick={() => setMobileMenu(false)}>
            <X size={20} />
          </button>
        </div>

        <p className="sidebar-label">MENU</p>
        <nav className="sidebar-navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`sidebar-link ${activeNav === label ? "active" : ""}`}
              onClick={() => {
                setActiveNav(label);
                setMobileMenu(false);
              }}
            >
              <Icon size={19} />
              <span>{label}</span>
              {label === "My Watchlist" && watchlist.length > 0 &&
                <span className="watchlist-count">{watchlist.length}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-profile">
            <div className="profile-avatar">
              {(user?.name || "W").charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <strong>{user?.name || "Movie Lover"}</strong>
              <span>Movie Explorer</span>
            </div>
          </div>
          <button className="sidebar-link" onClick={onLogout}>
            <Settings size={19} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {mobileMenu && (
        <button className="sidebar-overlay" onClick={() => setMobileMenu(false)} aria-label="Close menu" />
      )}

      <main className="dashboard-main">
        <header className="dashboard-header">
          <button className="mobile-menu-button" onClick={() => setMobileMenu(true)}>
            <Menu size={22} />
          </button>

          <div className="header-greeting">
            <span className="header-date">YOUR PERSONAL CINEMA</span>
            <h2>Discover your next <span>favourite.</span></h2>
          </div>

          <div className="header-actions">
            <div className="dashboard-search">
              <Search size={18} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search movies..."
              />
            </div>
            <button className="notification-button" aria-label="Notifications">
              <Bell size={19} /><span />
            </button>
          </div>
                        </header>

        {activeNav === "TasteDNA" && (
          <section className="tastedna-section">
            <div className="tastedna-hero">
              <div className="tastedna-icon">
                <Film size={30} />
              </div>

              <span className="section-eyebrow">
                <Sparkles size={13} /> YOUR CINEMATIC IDENTITY
              </span>

              <h1>{tastePersonality}</h1>

              <p>
                Your movie preferences reveal a unique cinematic personality.
                Here's what your TasteDNA looks like.
              </p>

              <div className="tastedna-count">
                {preferredGenres.length} preferred genres selected
              </div>
            </div>

            <div className="tastedna-content">
              <div className="tastedna-panel">
                <div className="section-heading">
                  <div>
                    <span className="section-eyebrow">YOUR GENRE PROFILE</span>
                    <h3>Genre preferences</h3>
                  </div>
                </div>

                {tasteScores.map((item) => (
                  <div className="taste-row" key={item.name}>
                    <div className="taste-label">
                      <span>{item.name}</span>
                      <span>{item.selected ? "Selected" : "Not selected"}</span>
                    </div>

                    <div className="taste-track">
                      <div
                        className="taste-fill"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>

                    <p>{item.movieCount} matching movies in our collection</p>
                  </div>
                ))}
              </div>

              <div className="tastedna-panel">
                <span className="section-eyebrow">YOUR TOP GENRES</span>
                <h3>Your cinematic interests</h3>

                {selectedTasteGenres.length > 0 ? (
                  <div className="taste-tags">
                    {selectedTasteGenres.map((item) => (
                      <span className="taste-tag" key={item.name}>
                        <Sparkles size={13} />
                        {item.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="taste-empty">
                    Select your favourite genres in the Home dashboard to
                    discover your TasteDNA.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {activeNav === "MoodSync" && (
          <section className="moodsync-section">
            <div className="section-heading">
              <div>
                <span className="section-eyebrow">
                  <Sparkles size={13} /> MOOD-BASED DISCOVERY
                </span>
                <h2>What's your mood today?</h2>
                <p>Choose a feeling. We'll find movies that match your vibe.</p>
              </div>
            </div>

            <div className="mood-grid">
              {moods.map((mood) => (
                <button
                  key={mood.name}
                  className={`mood-card ${
                    selectedMood === mood.name ? "selected" : ""
                  }`}
                  onClick={() => setSelectedMood(mood.name)}
                >
                  <span className="mood-emoji">{mood.emoji}</span>
                  <span className="mood-name">{mood.name}</span>
                  <span className="mood-genres">
                    {mood.genres.join(" · ")}
                  </span>
                </button>
              ))}
            </div>

            <p className="mood-hint">
              {selectedMood
                ? `Your ${selectedMood.toLowerCase()} mood is selected. Matching movies are shown below.`
                : "Select a mood to discover your next movie."}
            </p>
          </section>
        )}

        {activeNav === "Home" && (
<section className="preference-section">
  <div className="section-heading">
    <div>
      <span className="section-eyebrow">
        <Sparkles size={13} /> PERSONALIZE YOUR EXPERIENCE
      </span>
      <h3>Choose your favourite genres</h3>
    </div>
    <span className="section-note">
      Select all that you enjoy
    </span>
  </div>

  <div className="preference-grid">
    {genres.filter((genre) => genre !== "All").map((genre) => (
      <button
        key={genre}
        className={`preference-chip ${
          preferredGenres.includes(genre) ? "selected" : ""
        }`}
        onClick={() => togglePreferredGenre(genre)}
      >
        {preferredGenres.includes(genre) ? "\u2713 " : "+ "}
        {genre}
      </button>
    ))}
  </div>

  <p className="preference-hint">
    {preferredGenres.length === 0
      ? "Choose at least one genre to personalize your recommendations."
      : `${preferredGenres.length} genre(s) selected for your recommendations.`}
  </p>
  <div className="preference-save-row">
  <span className="preference-status">{preferencesStatus}</span>

  <button
    className="preference-save-button"
    onClick={savePreferences}
    disabled={preferencesStatus === "Saving..."}
  >
    Save Preferences
  </button>
</div>
</section>
)}

        {activeNav === "Home" && (
<section className="featured-section">
          <div className="featured-content">
            <div className="featured-tag"><Sparkles size={14} /> EDITOR'S PICK</div>
            <p className="featured-kicker">THE UNIVERSE IS CALLING</p>
            <h1>Interstellar</h1>
            <div className="featured-meta">
              <span>2014</span><span>{"\u2605"} 8.7</span><span>2h 49m</span><span>Sci-Fi</span>
            </div>
            <p className="featured-description">
              Mankind's future lies beyond the stars. A journey through space,
              time, and the extraordinary power of love.
            </p>
            <div className="featured-buttons">
              <button className="watch-button">
                <Play size={17} fill="currentColor" /> Explore Movie
              </button>
              <button className="save-featured-button" onClick={() => toggleSavedMovie(1, "WATCHLIST")}>
                {watchlist.includes(1) ? <Heart size={17} fill="currentColor" /> : <Plus size={17} />}
                {watchlist.includes(1) ? "Saved" : "Watchlist"}
              </button>
            </div>
          </div>
          <div className="featured-art">
            <div className="planet planet-one" />
            <div className="planet planet-two" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="featured-glow" />
            <div className="featured-art-caption">BEYOND THE IMPOSSIBLE</div>
          </div>
          <div className="featured-pagination"><span /><i /><i /></div>
        </section>
)}

        {activeNav === "Home" && (
<section className="genre-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">FIND YOUR VIBE</span>
              <h3>Explore by genre</h3>
            </div>
            <span className="section-note">What are you in the mood for?</span>
          </div>

          <div className="genre-list">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`genre-chip ${activeGenre === genre ? "selected" : ""}`}
              >
                {genre}
              </button>
            ))}
          </div>
        </section>
)}

        {activeNav !== "TasteDNA" && (
<section className="movies-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow"><Flame size={13} /> CURATED FOR YOU</span>
              <h3>
                {activeNav === "My Watchlist" ? "Your watchlist" :
                  activeNav === "Favourites" ? "Your favourites" :
                    activeNav === "Discover" ? "Discover movies" : preferredGenres.length > 0 ? "Recommended for You" : "Trending this week"}
              </h3>
            </div>
            <span className="section-note">{displayedMovies.length} movies to explore</span>
          </div>

          <div className="movie-grid">
            {displayedMovies.map((movie, index) => (
              <article className="movie-card" key={movie.id}>
                <div className={`movie-poster poster-${movie.art}`}>
                  <img
                    className="movie-poster-image"
                    src={movie.poster}
                    alt={`${movie.title} movie poster`}
                    loading="lazy"
                  />
                  <span className="poster-number">{String(index + 1).padStart(2, "0")}</span>
                  <button
                    className={`poster-save ${favourites.includes(movie.id) ? "is-saved" : ""}`}
                    onClick={() => toggleSavedMovie(movie.id, "FAVOURITE")}
                    aria-label="Toggle watchlist"
                  >
                    <Heart size={17} fill={favourites.includes(movie.id) ? "currentColor" : "none"} />
                  </button>
                  <div className="poster-bottom">
                    <span className="poster-rating">{"\u2605"} {movie.rating}</span>
                    <span className="poster-type">MOVIE</span>
                  </div>
                </div>
                <div className="movie-card-info">
  <h4>{movie.title}</h4>
  <p>{movie.genre}</p>

  <button
    className="why-button"
    onClick={() =>
      setExpandedWhyId(
        expandedWhyId === movie.id ? null : movie.id
      )
    }
  >
    <Sparkles size={14} />
    {expandedWhyId === movie.id ? "Hide explanation" : "Why this movie?"}
  </button>

  {expandedWhyId === movie.id && (
    <div className="why-explanation">
      <strong>Why we picked this</strong>
      <ul>
        {getRecommendationReasons(movie).map((reason, index) => (
          <li key={index}>{reason}</li>
        ))}
      </ul>
    </div>
  )}
</div>
              </article>
            ))}

            {displayedMovies.length === 0 && (
              <p className="empty-watchlist">
                {activeNav === "My Watchlist" || activeNav === "Favourites"
                  ? "Your list is empty. Save a movie to see it here."
                  : "No movies found. Try another search or genre."}
              </p>
            )}
          </div>
        </section>
)}

        <footer className="dashboard-footer">
          <span><Film size={14} /> Made for movie lovers</span>
          <span>WATCHNEXT <b>{"\u2726"}</b> YOUR NEXT STORY STARTS HERE</span>
        
          <div className="tmdb-credits" style={{
            width: "100%",
            textAlign: "center",
            marginTop: "24px",
            padding: "20px 12px",
            borderTop: "1px solid rgba(255,255,255,0.1)"
          }}>
            <h4>Credits</h4>
            <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
                alt="The Movie Database (TMDB)"
                style={{ width: "120px", maxWidth: "100%", margin: "12px auto" }}
              />
            </a>
            <p style={{ fontSize: "12px", opacity: 0.7, lineHeight: 1.6 }}>
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </div></footer>
      </main>
    </div>
  );
}

export default Dashboard;






import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import YouTube from "react-youtube";

function App() {
  // Global information
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "fc1f80b194f3f02aff9e1973e07870eb";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  // State vars
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading movie..." });
  const [playing, setPlaying] = useState(false);

  // Movie List fetch function
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setMovies(results);
    setMovie(results[0]);

    if (results.lenght) {
      await fetchMovie(results[0].id);
    }
  };

  // Individual movie fetch function
  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });
    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    setMovie(data);
  };

  // Select Movie function
  const selectMovie = async (movie) => {
    fetchMovie(movie.id);
    setMovie(movie);
    window.scrollTo(0, 0);
  };

  //Search Movies function
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  /* useEffect(() => {
    fetchMovies();
    if (movies.length > 0) {
      fetchMovie(movies[0].id);
    }
  }, []); */

  useEffect(() => {
    fetchMovies();
    if (movies.length > 0) {
      const firstMovie = movies[0];
      fetchMovie(firstMovie);
    }
  }, []);

  return (
    <div className="app">
      <h2>Movie App</h2>
      {/* Search */}
      <form className="search">
        <input
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </form>

      {/* Banner and Video Container */}
      <div>
        <main>
          {movie ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
              }}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="player"
                    opts={{
                      height: "100%",
                      width: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="btn">
                    Close
                  </button>
                </>
              ) : (
                <div className="container">
                  <div className="">
                    {trailer ? (
                      <button
                        className="btn"
                        onClick={() => setPlaying(true)}
                        type="btn"
                      >
                        Play Trailer
                      </button>
                    ) : (
                      "Sotty, no trailer available."
                    )}
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </main>
      </div>

      {/* Container */}
      <div className="container">
        <div className="display">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movieCard"
              onClick={() => selectMovie(movie)}
            >
              <img src={`${URL_IMAGE + movie.poster_path}`} alt="" />
              <h4>{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

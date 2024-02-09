import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // Global information
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "fc1f80b194f3f02aff9e1973e07870eb";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

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
    if (data.videos & data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    setMovie(data);
  };

  //Search Movies function
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
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
      {/* Container */}
      <div className="container">
        <div className="display">
          {movies.map((movie) => (
            <div key={movie.id} className="movieCard">
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

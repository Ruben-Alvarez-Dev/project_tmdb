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
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="app">
      <h2>Movie App</h2>
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

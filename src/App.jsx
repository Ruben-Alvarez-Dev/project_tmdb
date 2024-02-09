import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // Global information
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "fc1f80b194f3f02aff9e1973e07870eb";
  const IMAGE_PATH = "http://image.tmdb.org/t/p/original";
  const URL_IMAGE = "http://image.tmdb.org/t/p/original";
  /* const params = {
    params: {
      api_key: API_KEY,
      query: searchKey
  } */

  // State vars
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading movies..." });
  const [playing, setPlaying] = useState(false);

  // Movie List fetch function
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/movie/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });
  };

  return (
    <>
      <h1>Hello, world!</h1>
      <p>Welcome to the React 18 Alpha!</p>
    </>
  );
}

export default App;

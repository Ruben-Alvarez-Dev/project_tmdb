import React, { useState } from "react";
import "./App.css";

function App() {
  // Global information
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "fc1f80b194f3f02aff9e1973e07870eb";
  const IMAGE_PATH = "http://image.tmdb.org/t/p/original";
  const URL_IMAGE = "http://image.tmdb.org/t/p/original";

  return (
    <>
      <h1>Hello, world!</h1>
      <p>Welcome to the React 18 Alpha!</p>
    </>
  );
}

export default App;

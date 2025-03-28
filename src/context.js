// src/context.js
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Use env variable if available, else fallback to public demo key
const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY || "demo";
const OMDB_API_URL = process.env.REACT_APP_API_URL || "https://www.omdbapi.com/";
export const API_ENDPOINT = `${OMDB_API_URL}?apikey=${OMDB_API_KEY}`;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchMovie, setSearchMovie] = useState("avengers");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_ENDPOINT}&s=${searchMovie}`);
        if (res.data.Response === "True") {
          setMovies(res.data.Search);
        } else {
          setMovies([]); // Handle "Movie not found"
        }
      } catch (err) {
        console.error("API fetch failed:", err);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchMovie]);

  return (
    <AppContext.Provider value={{ movies, setSearchMovie, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

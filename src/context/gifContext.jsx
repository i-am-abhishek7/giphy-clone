import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const API_KEY = "kbweTja8XCd90B5W9vkCzPaCYZNYLrQc";
const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (id) => {
    if (favorites.includes(id)) {
      const updatedFavorites = favorites.filter((itemsId) => itemsId !== id);
      localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.push(id);
      localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteGIFs")) || [];
    setFavorites(favorites);
  }, []);

  const giphy = new GiphyFetch(API_KEY);

  return (
    <GifContext.Provider
      value={{
        giphy,
        gifs,
        setGifs,
        filter,
        setFilter,
        favorites,
        addToFavorites,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifProvider;

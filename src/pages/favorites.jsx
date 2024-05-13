import { useEffect, useState } from "react";
import { GifState } from "../context/gifContext";
import Gif from "../components/gif";

export default function Favorites() {
  const [favoriteGIFs, setFavoriteGIFs] = useState([]);
  const { giphy, favorites } = GifState();

  const fetchFavoritesGIFs = async () => {
    const { data: gifs } = await giphy.gifs(favorites);
    setFavoriteGIFs(gifs);
  };

  useEffect(() => {
    fetchFavoritesGIFs();
  }, []);

  return (
    <div className="mt-2">
      <span className="faded-text">My Favorites</span>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
        {favoriteGIFs.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { GifState } from "../context/gifContext";
import Gif from "../components/gif";
import FilterGif from "../components/filterGif";

export default function Home() {
  const { giphy, gifs, setGifs, filter, setFilter, favorites } = GifState();

  const fetchTrandingGIFs = async () => {
    const { data } = await giphy.trending({
      limit: 20,
      type: filter,
      rating: "g",
    });
    setGifs(data);
  };

  useEffect(() => {
    fetchTrandingGIFs();
  }, [filter]);

  return (
    <div>
      <img
        src="/public/banner.gif"
        alt="earth banner"
        className="mt-2 rounded w-full"
      />

      <FilterGif showTrending={true} />

      <div className="columns-2 md:columns-3 lg:colums-4 xl:columns-5 gap-2">
        {gifs.map((gif) => {
          return <Gif gif={gif} key={gif.title} />;
        })}
      </div>
    </div>
  );
}

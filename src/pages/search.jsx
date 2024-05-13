import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gifContext";
import FilterGif from "../components/filterGif";
import Gif from "../components/gif";

export default function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const { query } = useParams();
  const { giphy, filter } = GifState();

  const fetchSearchResult = async () => {
    const { data } = await giphy.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 20,
    });
    setSearchResult(data);
  };

  useEffect(() => {
    fetchSearchResult();
  }, [filter]);

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>

      <FilterGif alignLeft={true} />
      {searchResult.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {searchResult.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>
          No GIFs found for {query}. Try searching for Stickers instead?
        </span>
      )}
    </div>
  );
}

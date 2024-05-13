import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gifContext";
import Gif from "../components/gif";
import FollowOn from "../components/followOn";

export default function Categories() {
  const { category } = useParams();
  const { giphy } = GifState();
  const [result, setResult] = useState([]);

  const fetchSearchResult = async () => {
    const { data } = await giphy.gifs(category, category);
    setResult(data);
  };

  useEffect(() => {
    fetchSearchResult();
  }, [category]);

  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-full sm:w-72">
        {result.length > 0 && <Gif gif={result[0]} hover={false} />}
        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell it to me, GIFs it to me!
        </span>

        <FollowOn />

        <div className="divider" />
      </div>

      <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {category.split("-").join(" & ")} GIFs
        </h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>
      </div>

      {result.length > 0 && (
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
          {result.slice(1).map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gifContext";
import Gif from "../components/gif";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import FollowOn from "../components/followOn";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gifs, stickers, texts"];

export default function GifPage() {
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const { type, slug } = useParams();
  const { giphy, addToFavorites, favorites } = GifState();

  function shareGif() {}

  function embedGif() {}

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await giphy.gif(gifId[gifId.length - 1]);
    const { data: related } = await giphy.related(gifId[gifId.length - 1], {
      limit: 10,
    });
    setGif(data);
    setRelatedGifs(related);
  };

  useEffect(() => {
    // if (!contentType.includes(type)) {
    //   throw new Error("Invalid Content Type");
    // }

    fetchGif();
  }, []);

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="font-bold">{gif?.user?.username}</div>
              </div>
            </div>

            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {!readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}

        <FollowOn />
        <div className="divider"></div>

        {gif?.source && (
          <div>
            <span className="faded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target="_blank" className="truncate">
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />

            {/* Mobile Ui */}

            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="font-bold">{gif?.user?.username}</div>
              </div>

              <button className="ml-auto" onClick={shareGif}>
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addToFavorites(gif.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={`${
                  favorites.includes(gif.id) ? "text-red-500" : ""
                }`}
              />
              Favorite
            </button>
            <button
              onClick={shareGif}
              className="flex gap-6 items-center font-bold text-lg"
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              onClick={embedGif}
              className="flex gap-6 items-center font-bold text-lg"
            >
              <IoCodeSharp size={25} />
              Embed
            </button>
          </div>
        </div>

        <div className="my-4">
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGifs.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

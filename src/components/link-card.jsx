import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Download, Trash } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const LinkCard = ({ url, fetchUrls }) => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);


  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        src={url?.qr}
        className="h-32 object-contain ring ring-blue-500 self-start "
        alt="qr code"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer ">
          {url?.title}
        </span>
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
          https://nepxlinkr.com/
          {url?.custome_url ? url?.custome_url : url?.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {url?.original_url}
        </span>
        <span className="flex-1 flex item-end font-extralight text-sm">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button
          variant={"ghost"}
          onClick={() =>
            navigator.clipboard.writeText(
              `https://nepxlinkr.com/${url?.short_url}`
            )
          }
        >
          <Copy />
        </Button>
        <Button variant={"ghost"} onClick={downloadImage}>
          <Download />
        </Button>
        <Button variant={"ghost"} onClick={()=>fnDelete().then(()=>fetchUrls())}>
         {loadingDelete?<BeatLoader color="#36d7b7" size={8} />: <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { Copy, Download, Trash, LinkIcon } from "lucide-react";

import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { getUrl, deleteUrl } from "@/db/apiUrls";
import { getClicksForUrl } from "@/db/apiClicks";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationsStats from "@/components/locations-stats";
import DeviceStats from "@/components/device-stats";
import { Button } from "@/components/ui/button";

const LinkPage = () => {
  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  // Fetch URL details
  const {
    loading,
    data: url,
    fn: fetchUrl,
    error,
  } = useFetch(() => getUrl(id, user?.id));

  // Fetch Click Stats
  const {
    loading: loadingStats,
    data: stats,
    fn: fetchStats,
  } = useFetch(() => getClicksForUrl(id));

  // Delete URL
  const { loading: loadingDelete, fn: deleteThisUrl } = useFetch(() => deleteUrl(id));

  // Load URL data on mount
  useEffect(() => {
    fetchUrl();
  }, []);

  // Once URL data is fetched, load stats
  useEffect(() => {
    if (!error && loading === false) {
      fetchStats();
    }
  }, [loading, error]);

  // Redirect if error (e.g. url not found or unauthorized)
  useEffect(() => {
    if (error) {
      navigate("/dashboard");
    }
  }, [error]);

  // Handle QR Download
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title || "qr-code";
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleDelete = async () => {
    await deleteThisUrl();
    navigate("/dashboard");
  };

  // Link logic
  let link = url?.custome_url || url?.short_url;

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        {/* LEFT - URL Details */}
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>

          <a
            href={`https://nepxlinkr.com/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            https://nepxlinkr.com/{link}
          </a>

          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>

          <span className="text-sm font-extralight flex items-end">
            {url?.created_at ? new Date(url.created_at).toLocaleString() : ""}
          </span>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant={"ghost"}
              onClick={() =>
                navigator.clipboard.writeText(`https://nepxlinkr.com/${link}`)
              }
            >
              <Copy />
            </Button>

            <Button variant={"ghost"} onClick={downloadImage}>
              <Download />
            </Button>

            <Button variant={"ghost"} onClick={handleDelete}>
              {loadingDelete ? <BeatLoader color="#36d7b7" size={5} /> : <Trash />}
            </Button>
          </div>

          {/* QR Image */}
          {url?.qr && (
            <img
              src={url.qr}
              alt="qr code"
              className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
            />
          )}
        </div>

        {/* RIGHT - Stats */}
        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>

          {stats && stats.length > 0 ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <LocationsStats stats={stats} />

              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false ? "No statistics yet" : "Loading statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default LinkPage;


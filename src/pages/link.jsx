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

      <div className="flex flex-col gap-8 lg:flex-row justify-between">
        {/* LEFT - URL Details */}
        <div className="flex flex-col gap-6 p-4 rounded-lg bg-white dark:bg-gray-900 shadow-lg sm:w-full lg:w-2/5">
          <span className="text-3xl sm:text-5xl font-extrabold hover:underline break-words cursor-pointer">
            {url?.title}
          </span>

          <a
            href={`https://nepxurlshort.netlify.app/${link}`}
            target="_blank"
            className="text-lg sm:text-2xl text-blue-500 font-semibold break-all hover:underline"
          >
            https://nepxurlshort.netlify.app/{link}
          </a>

          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-blue-500 hover:underline break-all"
          >
            <LinkIcon className="w-5 h-5" />
            {url?.original_url}
          </a>

          <span className="text-xs sm:text-sm text-gray-400">
            {url?.created_at ? new Date(url.created_at).toLocaleString() : ""}
          </span>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-1 shadow-sm hover:shadow-md"
              onClick={() =>
                navigator.clipboard.writeText(`https://nepxurlshort.netlify.app/${link}`)
              }
            >
              <Copy className="w-4 h-4" /> Copy
            </Button>

            <Button
              variant="outline"
              className="flex items-center gap-1 shadow-sm hover:shadow-md"
              onClick={downloadImage}
            >
              <Download className="w-4 h-4" /> Download QR
            </Button>

            <Button
              variant="destructive"
              className="flex items-center gap-1 shadow-sm hover:shadow-md"
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <BeatLoader color="#fff" size={5} />
              ) : (
                <Trash className="w-4 h-4" />
              )}{" "}
              Delete
            </Button>
          </div>

          {/* QR Image */}
          {url?.qr && (
            <div className="flex justify-center sm:justify-start">
              <img
                src={url.qr}
                alt="qr code"
                className="w-40 sm:w-56 rounded-lg ring ring-blue-500 p-2 object-contain"
              />
            </div>
          )}
        </div>

        {/* RIGHT - Stats */}
        <Card className="sm:w-full lg:w-3/5 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-4xl font-bold">Stats</CardTitle>
          </CardHeader>

          {stats && stats.length > 0 ? (
            <CardContent className="grid gap-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stats.length}</p>
                </CardContent>
              </Card>

              <div>
                <CardTitle className="text-lg font-semibold">Location Data</CardTitle>
                <LocationsStats stats={stats} />
              </div>

              <div>
                <CardTitle className="text-lg font-semibold">Device Info</CardTitle>
                <DeviceStats stats={stats} />
              </div>
            </CardContent>
          ) : (
            <CardContent className="text-gray-500">
              {loadingStats === false
                ? "No statistics yet"
                : "Loading statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default LinkPage;



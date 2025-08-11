import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { storeClicks } from "../db/apiClicks";
import { getLongUrl } from "../db/apiUrls";
import { BarLoader } from "react-spinners";

const Redirect = () => {
  const { id } = useParams();

  const { data, loading, fn } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks);

  // First: get the original URL
  useEffect(() => {
    fn();
  }, []);

  // Second: when original URL is fetched, store clicks & redirect
  useEffect(() => {
    if (!loading && data?.original_url) {
      fnStats({ id: data.id, originalUrl: data.original_url });

      // Give a small delay to ensure click is stored before redirect
      setTimeout(() => {
        window.location.href = data.original_url;
      }, 300);
    }
  }, [loading, data]);

  return (
    <>
      <BarLoader width={"100%"} color="#36d7b7" />
      <br />
      Redirecting ...
    </>
  );
};

export default Redirect;


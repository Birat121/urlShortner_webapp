import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { storeClicks } from "../db/apiClicks";
import { getLongUrl} from "../db/apiUrls";
import { BarLoader } from "react-spinners";

const Redirect = () => {
  const { id } = useParams();

  const { data, loading, fn } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    original_url: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) fnStats();
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting ...
      </>
    );
  }

  return null;
};

export default Redirect;

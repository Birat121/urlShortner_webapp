import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Error from "@/components/error";
import useFetch from "@/hooks/use-fetch";
import { getUrls } from "@/db/apiUrls";
import { getClicks } from "@/db/apiClicks";
import LinkCard from "@/components/link-card";
import { UrlState } from "@/context";
const Dashboard = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { user } = UrlState();
  const {
    data: urls,
    loading,
    error,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);
  const {
    data: clicks,
    loading: loadingClicks,
    fn: fnClicks,
  } = useFetch(
    getClicks,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) => url.title.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <div className="flex flex-col gap-8 ">
      {loading || loadingClicks && <BarLoader width={"100%"} color="#36d7b7" />}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Click</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">My Links</h1>
        <Button>Create Links</Button>
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute right-3 top-3" />
      </div>
      {error && <Error message="No links found" />}
      {(filteredUrls || []).map((url,i) =>{
        return <LinkCard key={i} url={url} fetchUrls = {fnUrls} />
      })}
    </div>
  );
};

export default Dashboard;

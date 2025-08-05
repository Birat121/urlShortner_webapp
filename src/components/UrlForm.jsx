import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const UrlForm = () => {

  const[longUrl, setLongUrl] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 w-full max-w-3xl mx-auto"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <Input
        type="url"
        placeholder="URL Here..."
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        className="w-full max-w-4xl px-4 py-6 text-lg rounded-md border border-gray-600 shadow-sm
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        required
        aria-label="Enter URL"
      />

      <Button
        variant="secondary"
        type="submit"
        className="px-8 py-6 text-lg rounded-md bg-blue-600 text-white hover:text-black hover:bg-blue-300"
      >
        Shorten!
      </Button>
    </form>
  );
};

export default UrlForm;

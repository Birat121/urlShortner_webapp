import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const UrlForm = () => {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 w-full max-w-3xl mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        type="url"
        placeholder="URL Here..."
        className="flex-1 px-48 py-6 text-lg rounded-md border border-gray-600 shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        required
        aria-label="Enter URL"
      />
      <Button variant="secondary" type="submit" className="px-8 py-6 text-lg rounded-md bg-blue-600 text-white hover:text-black hover:bg-blue-300">
        Shorten!
      </Button>
    </form>
  );
};

export default UrlForm;


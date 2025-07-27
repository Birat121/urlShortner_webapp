import useFetch from "./hooks/use-fetch";

import { createContext, useContext, useEffect } from "react";
import { getCurrentUser } from "./db/apiAuth";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchuser } = useFetch(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchuser();
  }, []);
  return (
    <UrlContext.Provider value={{ user, loading, isAuthenticated, fetchuser }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;

import { useState, useContext, createContext } from "react";
import { hashData } from "../utils/encryption";
import { RateLimiter } from "../utils/ratelimiter";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  const validateInput = (input) => {
    if (typeof input !== "string") {
      throw new Error("Input must be a string");
    }

    const sanitizedInput = input.trim();
    return sanitizedInput;
  };

  const handleSearch = (input) => {
    const sanitizedInput = validateInput(input); // sanitize input
    const hashedInput = hashData(sanitizedInput); // hash sensitive data

    return hashedInput;
  };

  // Apply rate limiting to the search function
  const rateLimitedSearch = useMemo(() => RateLimiter(handleSearch, 10, 60000), []);

  return (
    <SearchContext.Provider
      value={{ auth, setAuth, handleSearch: rateLimitedSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };

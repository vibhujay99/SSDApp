import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  const validateAndSanitizeCSRFToken = (token) => {
    // Perform input validation
    if (typeof token !== "string" || token.trim() === "") {
      throw new Error("Invalid CSRF token");
    }

    // Perform sanitization
    const sanitizedToken = token.trim();

    // Return the validated and sanitized input
    return sanitizedToken;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csrfToken = await fetchCSRFToken();
        const sanitizedToken = validateAndSanitizeCSRFToken(csrfToken);
        axios.defaults.headers.common["X-CSRF-Token"] = sanitizedToken;
        axios.defaults.headers.common["Authorization"] = auth?.token;
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    fetchData();
  }, [auth?.token]);

  const fetchCSRFToken = async () => {
    try {
      const response = await axios.get("/csrf-token");
      return response.data.csrfToken;
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
      throw new Error("Failed to fetch CSRF token");
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

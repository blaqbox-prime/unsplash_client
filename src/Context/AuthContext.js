import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to check authentication status
  const checkAuthStatus = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/authenticate", {
        credentials: "include", // Include cookies for session-based auth
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.email);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Function to handle login
 const login = async (credentials) => {

    const response = await fetch("http://localhost:8080/api/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      const { token, user } = data;

      // Store the JWT in local storage or session storage
      localStorage.setItem("jwt", token);

      // Update the context state
      setUser(user);
      setIsAuthenticated(true);
    } else {
      throw new Error("User does not exist");
    }

};

  // Function to handle logout
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
        setIsAuthenticated(false);
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Check authentication status on component mount
  useEffect(() => {
    // checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
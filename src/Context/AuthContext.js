import React, { createContext, useState, useEffect, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from '../Utils/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('jwt_token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const queryClient = useQueryClient();


    // Login mutation
    const loginMutation = useMutation({
        mutationFn: async ({ email, password }) => {
            const response = await fetch(`${API_BASE_URL}/auth/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Login failed!' }));
                throw new Error(errorData.message || 'Login failed due to server error.');
            }

            return response.json();
        },
        onSuccess: (data) => {
            const newToken = data.token;
            const userData = data.profile;

            localStorage.setItem('jwt_token', newToken);
            setToken(newToken);
            setIsAuthenticated(true);

            // Update the user query cache
            queryClient.setQueryData(['user', newToken], userData);
        },
        onError: (error) => {
            console.error('Login failed:', error);
            // Clear any stale token/user data in case of login failure
            localStorage.removeItem('jwt_token');
            setToken(null);
            setIsAuthenticated(false);
            
            // Invalidate user query
            queryClient.invalidateQueries(['user']);
        }
    });

    // Logout mutation (if you have a logout endpoint)
    const logoutMutation = useMutation({
        mutationFn: async () => {
            if (!token) return;
            
            // Optional: Call logout endpoint to invalidate token on server
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        },
        onSettled: () => {
            // Always clear local state regardless of server response
            localStorage.removeItem('jwt_token');
            setToken(null);
            setIsAuthenticated(false);
            
            // Clear all queries
            queryClient.clear();
            console.log('User logged out.');
        }
    });

    // Utility function to make authenticated fetch requests
    const authFetch = async (url, options = {}) => {
        const headers = {
            ...options.headers,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            ...options,
            headers,
        });

        // Handle token expiration
        if (response.status === 401) {
            localStorage.removeItem('jwt_token');
            setToken(null);
            setIsAuthenticated(false);
            queryClient.invalidateQueries(['user']);
            throw new Error('Authentication expired. Please login again.');
        }

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({ message: 'Something went wrong!' }));
            const errorMessage = errorBody.message || `HTTP error! status: ${response.status}`;
            throw new Error(errorMessage);
        }

        return response;
    };

    // Wrapper functions for easier use
    const login = async (username, password) => {
        try {
            await loginMutation.mutateAsync({ username, password });
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message || 'An unexpected error occurred during login.' };
        }
    };

    const logout = () => {
        logoutMutation.mutate();
    };

    // Update authentication state when token changes
    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);

    // Context value
    const authContextValue = {
        user,
        token,
        isAuthenticated,
        loading: isLoading || loginMutation.isLoading || logoutMutation.isLoading,
        login,
        logout,
        authFetch,
        // Expose mutation states for more granular control
        loginMutation: {
            isLoading: loginMutation.isLoading,
            error: loginMutation.error,
            isError: loginMutation.isError,
        },
        logoutMutation: {
            isLoading: logoutMutation.isLoading,
        },
        // User query states
        userQuery: {
            isLoading,
            error,
            isError,
            refetch: () => queryClient.invalidateQueries(['user']),
        }
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for easy consumption
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
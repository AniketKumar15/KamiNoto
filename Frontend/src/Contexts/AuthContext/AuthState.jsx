import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const hostUrl = "https://kami-noto.vercel.app";

    // Load user if token exists
    const loadUser = async (customToken = token) => {
        if (!customToken) return setLoading(false);
        try {
            const res = await fetch(`${hostUrl}/api/auth/getuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": customToken
                }
            });
            const data = await res.json();
            if (res.ok) {
                setUser(data.user);
                setIsAuthenticated(true);
            } else {
                setError(data.message);
                setToken(null);
                localStorage.removeItem("token");
            }
        } catch (err) {
            setError("Unable to load user");
        }
        setLoading(false);
    };

    // Register
    const signup = async ({ fullName, email, password }) => {
        try {
            const res = await fetch(`${hostUrl}/api/auth/sign-up`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, password })
            });
            const data = await res.json();
            if (res.ok) {
                // console.log(data, isAuthenticated)
                if (data.authToken) {
                    setToken(data.authToken);
                    localStorage.setItem("token", data.authToken);
                    await loadUser(data.authToken);
                } else {
                    setError("Login failed: Token not received");
                }
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (err) {
            setError("Server error");
        }
    };

    // Login
    const login = async ({ email, password }) => {
        try {
            const res = await fetch(`${hostUrl}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                // console.log(data, isAuthenticated)
                if (data.authToken) {
                    setToken(data.authToken);
                    localStorage.setItem("token", data.authToken);
                    await loadUser(data.authToken);
                } else {
                    setError("Login failed: Token not received");
                }
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Server error");
        }
    };

    const updateProfile = async ({ fullName, email, password }) => {
        try {
            const response = await fetch(`${hostUrl}/api/auth/updateuser`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                },
                body: JSON.stringify({ fullName, email, password })
            });

            const updatedUser = await response.json();

            if (response.ok) {
                // Update local user state
                setUser(updatedUser.user);  // assuming you return updated user under `user`
                setError(null);
                console.log("Profile updated successfully");
            } else {
                console.error("Failed to update user:", updatedUser.message || "Unknown error");
                setError(updatedUser.message || "Update failed");
            }
        } catch (error) {
            console.error("Error updating user:", error.message);
            setError("Server error");
        }
    };


    // Logout
    const logout = () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
    };

    // Clear errors after showing
    const clearError = () => setError(null);

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated,
                loading,
                error,
                signup,
                login,
                logout,
                updateProfile,
                clearError,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;

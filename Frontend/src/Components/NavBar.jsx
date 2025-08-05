import React, { useContext, useEffect } from "react";
import navIcon from "../assets/favIcon.png";
import avatar from "/avatar.jpg";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext/AuthContext";

const NavBar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    return (
        <nav className="bg-gray-900 text-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 shadow-sm">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3">
                    <img src={navIcon} className="h-10 rounded-full" alt="KamiNoto Logo" />
                    <span className="self-center text-2xl font-bold whitespace-nowrap">KamiNoto</span>
                </Link>

                {/* Right Side Buttons */}
                <div className="flex items-center gap-4">

                    {/* Search Bar */}
                    <div className="relative hidden md:block">
                        <input
                            type="text"
                            placeholder="Search notes..."
                            className="px-4 py-2 w-64 rounded-md border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <svg className="absolute right-3 top-2.5 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                    </div>

                    {/* Profile / User Info */}
                    {isAuthenticated ? (
                        <button
                            className="flex items-center gap-2 hover:text-blue-500 transition"
                            onClick={logout}
                            title="Click to logout"
                        >
                            <img src={avatar} alt="User" className="h-8 w-8 rounded-full border border-gray-300" />
                            {user ? (
                                <span className="hidden md:block">{user.fullName}</span>
                            ) : (
                                <span className="hidden md:block">Loading...</span> // or nothing at all
                            )}
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-400">Login</Link>
                            <Link
                                to="/signup"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

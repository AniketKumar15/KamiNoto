import React, { useState, useEffect } from "react";
import { Menu, X, House, Info, Bolt, NotebookPen } from "lucide-react";
import { Link } from "react-router-dom";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    // Optional: Lock scroll when sidebar is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    return (
        <>
            {/* Toggle Button */}
            <button
                className="fixed top-20 left-4 z-50 bg-gray-900 text-white p-2 rounded-lg shadow-md shadow-black hover:bg-gray-800 transition"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
                aria-expanded={isOpen}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`h-[calc(100vh-100px)] rounded-lg shadow-inner shadow-black bg-gray-900 w-64 sm:w-56 xs:w-60 fixed top-20 left-4 z-40 transition-all transform duration-300 ease-in-out origin-top-left ${isOpen ? "scale-100" : "scale-0"
                    }`}
            >
                <nav className="flex flex-col items-start p-4 space-y-2 mt-10">
                    <Link
                        to="/"
                        className="text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-white hover:text-black w-full flex items-center gap-2 active:bg-amber-500"
                    >
                        <House />
                        Home
                    </Link>
                    <Link
                        to="/notes"
                        className="text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-white hover:text-black w-full flex items-center gap-2 active:bg-amber-500"
                    >
                        <NotebookPen />
                        Notes
                    </Link>
                    <Link
                        to="/profile"
                        className="text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-white hover:text-black w-full flex items-center gap-2 active:bg-amber-500"
                    >
                        <Bolt />
                        Profile
                    </Link>
                    <Link
                        to="/about"
                        className="text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-white hover:text-black w-full flex items-center gap-2 active:bg-amber-500"
                    >
                        <Info />
                        About
                    </Link>
                </nav>


            </aside>
        </>
    );
};

export default SideBar;

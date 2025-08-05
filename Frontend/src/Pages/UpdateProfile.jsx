import React, { useState, useContext, useEffect } from "react";
import avatar from "/avatar.jpg";
import AuthContext from "../Contexts/AuthContext/AuthContext";

const UpdateProfile = () => {
    const { updateProfile, user } = useContext(AuthContext);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || "");
            setEmail(user.email || "");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password && password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError(null);
        await updateProfile({ fullName, email, password });
        setSuccess("Profile updated successfully!");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Update Profile</h2>

                {/* Avatar */}
                <div className="flex justify-center mb-4">
                    <label className="cursor-pointer">
                        <img
                            src={avatar}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border"
                        />
                    </label>
                </div>

                {/* Alerts */}
                {error && <p className="text-red-600 text-sm mb-2 text-center">{error}</p>}
                {success && <p className="text-green-600 text-sm mb-2 text-center">{success}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border border-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New Password (optional)"
                        className="w-full px-4 py-2 border border-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="w-full px-4 py-2 border border-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;

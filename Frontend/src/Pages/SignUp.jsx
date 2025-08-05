import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../Contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUP = () => {
    const navigate = useNavigate();
    const { signup, error, clearError, isAuthenticated } = useContext(AuthContext);

    const [form, setForm] = useState({ fullName: "", email: "", password: "" });

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/"); // Redirect to home after signup
        }
        if (error) {
            alert(error);  // You can replace this with your Alert component
            clearError();
        }
        // eslint-disable-next-line
    }, [isAuthenticated, error]);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(form)
        signup(form);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">✍️ Create a New Account</h2>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            value={form.fullName}
                            onChange={onChange}
                            placeholder="Your Full Name"
                            required
                            className="w-full border border-gray-300 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={form.email}
                            onChange={onChange}
                            placeholder="you@example.com"
                            required
                            className="w-full border border-gray-300 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={form.password}
                            onChange={onChange}
                            placeholder="••••••••"
                            required
                            className="w-full border border-gray-300 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition duration-200"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUP;

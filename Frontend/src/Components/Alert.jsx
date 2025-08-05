import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const Alert = ({ type = "success", message = "", duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    const baseStyles = "fixed top-20 right-5 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-500 ease-out";
    const typeStyles = {
        success: "bg-green-100 text-green-800",
        error: "bg-red-100 text-red-800",
        info: "bg-blue-100 text-blue-800",
        warning: "bg-yellow-100 text-yellow-800",
    };

    return (
        <div className={`${baseStyles} ${typeStyles[type] || typeStyles.success}`}>
            <span className="font-medium">{message}</span>
            <button
                onClick={() => {
                    setVisible(false);
                    if (onClose) onClose();
                }}
                className="ml-auto text-lg text-gray-500 hover:text-black"
            >
                <X size={20} />
            </button>
        </div>
    );
};

export default Alert;

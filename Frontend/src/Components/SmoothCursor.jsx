import React, { useEffect, useRef, useState } from "react";

const SmoothCursor = () => {
    const cursorRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const followerPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        const follow = () => {
            const speed = 0.5; // lower is slower/smoother
            const dx = mousePos.x - followerPos.current.x;
            const dy = mousePos.y - followerPos.current.y;

            followerPos.current.x += dx * speed;
            followerPos.current.y += dy * speed;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
            }

            requestAnimationFrame(follow);
        };

        follow(); // Start animation loop

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mousePos]);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-6 h-6 bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75"
        />
    );
};

export default SmoothCursor;

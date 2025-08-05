import React from "react";
import { CircleUserRound, Code2, Sparkles, Github } from "lucide-react";

const About = () => {
    return (
        <div className="pt-21 px-6 pb-6 bg-gray-200 text-gray-900 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 ml-10 flex items-center gap-2"><CircleUserRound size={32} /> About KamiNoto</h2>

            <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl mx-auto">
                <p className="text-lg mb-4">
                    <span className="font-semibold">KamiNoto</span> is a modern, beautifully designed note-taking app built using the <span className="font-medium text-amber-600">MERN stack</span>. It offers a clean dashboard, organized folders, pinned notes, tags, and a smooth user experience for both desktop and mobile users.
                </p>

                <div className="my-6 border-t pt-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Code2 size={20} /> Technologies Used
                    </h3>
                    <ul className="list-disc ml-6 text-gray-800 space-y-1">
                        <li><span className="font-medium">Frontend:</span> React.js, Tailwind CSS</li>
                        <li><span className="font-medium">Backend:</span> Node.js, Express.js</li>
                        <li><span className="font-medium">Database:</span> MongoDB</li>
                    </ul>
                </div>

                <div className="my-6 border-t pt-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Sparkles size={20} /> Features
                    </h3>
                    <ul className="list-disc ml-6 text-gray-800 space-y-1">
                        <li>Pinned notes & folders</li>
                        <li>Tagging system</li>
                        <li>Dark mode ready (with class-based toggle)</li>
                        <li>Clean dashboard with user info</li>
                    </ul>
                </div>

                <div className="mt-6 border-t pt-6 text-sm text-gray-600 flex items-center gap-2">
                    <Github size={16} />
                    Built with 💻 and ☕ by <span className="font-semibold text-black">Aniket</span>
                </div>
            </div>
        </div>
    );
};

export default About;


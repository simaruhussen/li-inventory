"use client"

import React from 'react';

const About: React.FC = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gray-50">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover filter brightness-50"
                autoPlay
                loop
                muted
                src="700_F_706644525_wAaYzbK2Io6VHBigzkWXZzNueehEpppH_ST.mp4" // Replace with your video path
            />
            <div className="relative text-center text-white p-10 max-w-2xl mx-auto bg-black bg-opacity-70 rounded-lg shadow-lg mt-40">
                <h1 className="text-5xl font-bold uppercase mb-6">About Us</h1>
                <img 
                    className="my-4 w-full max-w-xs rounded-lg transition-transform duration-300 hover:scale-110"
                    src="240_F_783000046_dkIfbX1h7jUeGLFEPVFozAstL56l204L.jpg"// Replace with your image path
                    alt="About Image"
                    
                />
                <p className="text-lg leading-relaxed mb-24">
                    We are a company dedicated to providing the best services.
                </p>
            </div>

            <div className="fixed bottom-5 right-5">
                <button 
                    onClick={handleScrollToTop} 
                    className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-opacity duration-300"
                >
                    ↑
                </button>
            </div>
        </div>
    );
};

export default About;

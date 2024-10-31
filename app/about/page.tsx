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
            <div className="relative min-h-screen bg-gray-900 text-white p-10">
            {/* Main About Content */}
            <div className="text-center max-w-4xl mx-auto bg-black bg-opacity-70 rounded-lg shadow-lg p-8 mt-20">
                <h1 className="text-5xl font-bold uppercase mb-6">About Us</h1>
                
                {/* About Image */}
                <div className="flex justify-center my-4">
                    <img 
                        src="240_F_783000046_dkIfbX1h7jUeGLFEPVFozAstL56l204L.jpg" 
                        alt="About" 
                        className="w-full max-w-sm rounded-lg transition-transform duration-300 hover:scale-105"
                    />
                </div>

                {/* About Description */}
                <div className="text-lg leading-relaxed">
                    <p>Welcome to our company. We are dedicated to providing the best services to our customers. Our team is passionate about making a difference and achieving excellence in all that we do.</p>
                    <p className="mt-4">This section can include more information about your company's mission, values, and history. Additional content can be added here. This text will continue to scroll if it exceeds the viewport height.</p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="bg-white bg-opacity-95 rounded-lg shadow-xl p-6 mt-12 max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold text-blue-700 uppercase mb-5 text-center">Our Mission</h2>
                <div className="flex items-center space-x-5">
                    <img 
                        src="download (6).jpg" 
                        alt="Mission" 
                        className="w-40 h-40 rounded-lg transition-transform duration-300 hover:scale-105"
                    />
                    <p className="text-gray-800 leading-relaxed">
                        Our mission is to empower businesses with innovative inventory management solutions that drive efficiency and growth.
                    </p>
                </div>
            </div>

            {/* Vision Section */}
            <div className="bg-white bg-opacity-95 rounded-lg shadow-xl p-6 mt-12 max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold text-blue-700 uppercase mb-5 text-center">Our Vision</h2>
                <div className="flex items-center space-x-5">
                    <img 
                        src="download (7).jpg" 
                        alt="Vision" 
                        className="w-40 h-40 rounded-lg transition-transform duration-300 hover:scale-105"
                    />
                    <p className="text-gray-800 leading-relaxed">
                        Our vision is to be the leading provider of inventory management solutions, recognized for our commitment to quality and customer satisfaction.
                    </p>
                </div>
            </div>
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

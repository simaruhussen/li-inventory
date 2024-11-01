"use client"


import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  
  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col">
      {/* Carousel Background */}
      <div id="backgroundCarousel" className="absolute top-0 left-0 w-full h-screen -z-10">
        <div className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
          <div className="carousel-inner">
            
            <div className="carousel-item">
              <img src="/download.jpg" className="object-cover w-full h-full brightness-75" alt="Third Slide" />
            </div>
            <div className="carousel-item">
              <img src="/download-3.jpg" className="object-cover w-full h-full brightness-75" alt="Fourth Slide" />
            </div>
            <div className="carousel-item">
              <img src="/download-4.jpg" className="object-cover w-full h-full brightness-75" alt="Fifth Slide" />
            </div>
          </div>
        </div>
      </div>

      {/* Front Section */}
      <div className="relative z-10 h-[80vh] flex items-center justify-center p-5">
        <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg max-w-4xl flex flex-col md:flex-row items-center text-center md:text-left">
          {/* Text Content */}
          <div className="md:w-1/2 mb-4 md:mb-0">
            <h2 className="text-4xl font-bold mb-4">Inventory Management</h2>
            <p className="text-lg mb-4">
              Manage your inventory effortlessly with our intuitive platform designed for businesses of all sizes.
            </p>
          
            
              <Link href="/products" className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-600 transition duration-300">
                Get Started
              
            </Link>
          </div>

          {/* Image Content */}
          <div className="md:w-1/2 flex justify-center">
            <img src="/istockphoto-1465188429-612x612.jpg" className="h-80 w-auto rounded-lg shadow-md object-cover mt-[-14px]" alt="Inventory Illustration" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-5 bg-gray-800 text-white mt-auto">
        <p>&copy; 2024 @sima. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

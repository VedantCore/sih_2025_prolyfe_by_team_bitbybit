import React from 'react';
import ProLyfeIcon from './ProLyfeIcon'; // Adjusted import path

const Header = () => {
    return (
        <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200">
            <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <a href="/" className="flex items-center space-x-2">
                        <ProLyfeIcon className="h-8 w-auto" />
                        <span className="text-xl font-bold text-gray-800">ProLyfe</span>
                    </a>
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="/#features" className="text-gray-600 hover:text-blue-500 transition-colors">Features</a>
                        <a href="/#about" className="text-gray-600 hover:text-blue-500 transition-colors">About</a>
                        <a href="/team" className="text-gray-600 hover:text-blue-500 transition-colors">Our Team</a>
                        <a 
                            href="/chat" 
                            className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-600 transition-colors"
                        >
                            Chat Now
                        </a>
                    </nav>
                    <div className="md:hidden">
                        {/* Mobile menu button can go here if needed */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
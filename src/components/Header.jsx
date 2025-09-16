import React from 'react';

const Header = () => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="/" className="flex items-center space-x-2">
                    <svg className="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-2xl font-bold text-gray-800">ProLyfe</span>
                </a>
                <nav className="hidden md:flex space-x-8">
                    <a href="/#features" className="text-gray-600 hover:text-blue-600 transition">Features</a>
                    <a href="/#about" className="text-gray-600 hover:text-blue-600 transition">About</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
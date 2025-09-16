import React from 'react';
import ChatInterface from '../components/ChatInterface.jsx';

const ChatPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm sticky top-0 z-20">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="/" className="text-2xl font-bold text-blue-600">
                        ProLyfe
                    </a>
                    <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                        &larr; Back to Home
                    </a>
                </div>
            </header>
            <main className="flex-grow flex items-center justify-center p-4">
               <ChatInterface />
            </main>
        </div>
    );
};

export default ChatPage;
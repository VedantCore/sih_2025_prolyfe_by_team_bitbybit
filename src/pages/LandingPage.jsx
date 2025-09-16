import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Updated Feature Card Component
const FeatureCard = ({ icon, title, children }) => (
    <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 inline-flex items-center justify-center mb-5">
            {icon}
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600 leading-relaxed">{children}</p>
    </div>
);

// Main Landing Page Component
const LandingPage = () => {
    const navigateToChat = () => {
        window.location.href = '/chat';
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative text-center py-20 md:py-32 bg-gradient-to-r from-blue-50 to-teal-50">
                     <div className="container mx-auto px-6 z-10">
                        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">Your Proactive Life Assistant</h2>
                        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
                            Welcome to ProLyfe. Get instant, AI-driven answers to your health questions, based on trusted, verified sources for India.
                        </p>
                        <button 
                            onClick={navigateToChat}
                            className="bg-blue-600 text-white font-bold py-4 px-10 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg">
                            Ask ProLyfe Now
                        </button>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h3 className="text-4xl font-bold text-gray-900">Health Intelligence at Your Fingertips</h3>
                            <p className="text-gray-600 mt-3 text-lg">ProLyfe is more than a chatbot. It's your partner in well-being.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard title="Instant AI Chat" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}>
                                Get 24/7 access to clear, concise answers for your health queries, reducing misinformation and panic.
                            </FeatureCard>
                            <FeatureCard title="Symptom Guidance" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
                                A preliminary guide to understanding your symptoms. (This is for informational purposes and not a medical diagnosis).
                            </FeatureCard>
                             <FeatureCard title="Preventive Care" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}>
                                Receive tips on staying healthy, vaccination information, and best practices for hygiene and sanitation.
                            </FeatureCard>
                        </div>
                    </div>
                </section>
                
                {/* About Section */}
                <section id="about" className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <img src="https://placehold.co/600x400/dbeafe/1e40af?text=ProLyfe+Mission" alt="Health awareness concept art" className="rounded-xl shadow-lg w-full"/>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">Empowering a Healthier India</h3>
                                <p className="text-gray-600 mb-4 text-lg">
                                    ProLyfe is a project aimed at leveraging AI to make public health information universally accessible. Our mission is to empower every citizen to make proactive and informed decisions for a healthier life.
                                </p>
                                <p className="text-gray-600 text-lg">
                                    We use data from trusted sources like MoHFW and WHO, ensuring you receive only the most reliable and up-to-date information.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
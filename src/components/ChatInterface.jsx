import React, { useState, useRef, useEffect } from 'react';
import EmergencyModal from './EmergencyModal.jsx'; // Import the new modal

// This is a new component to ask for location permission
const LocationPermissionPrompt = ({ onAllow, onDeny }) => (
    <div className="absolute inset-0 bg-white bg-opacity-95 z-10 flex flex-col items-center justify-center text-center p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Enable Emergency Services</h3>
        <p className="text-gray-600 max-w-sm mb-6">To help you find nearby hospitals in a critical emergency, ProLyfe needs access to your location. Your location is only used when a potential emergency is detected.</p>
        <div className="flex space-x-4">
            <button onClick={onAllow} className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors">Allow Location</button>
            <button onClick={onDeny} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition-colors">Maybe Later</button>
        </div>
    </div>
);


const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I am ProLyfe. To provide better assistance in emergencies, I can use your location to find help. You can enable this feature when you're ready.", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // New state variables for emergency feature
    const [location, setLocation] = useState(null);
    const [locationPermission, setLocationPermission] = useState('prompt'); // 'prompt', 'granted', or 'denied'
    const [showEmergencyModal, setShowEmergencyModal] = useState(false);
    const [nearbyHospitals, setNearbyHospitals] = useState([]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleLocationPermission = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLocationPermission('granted');
            },
            () => {
                setLocationPermission('denied');
            }
        );
    };

    // New function to find nearby hospitals
    const findNearbyHospitals = (lat, lng) => {
        if (!window.google) {
            console.error("Google Maps script not loaded");
            return;
        }
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        const request = {
            location: new window.google.maps.LatLng(lat, lng),
            radius: '5000', // 5km radius
            type: ['hospital'],
        };
        
        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setNearbyHospitals(results);
                setShowEmergencyModal(true);
            } else {
                 setNearbyHospitals([]); // Even if it fails, show the modal with a message
                 setShowEmergencyModal(true);
            }
        });
    };


    const handleSend = async () => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        const userMessage = { id: Date.now(), text: trimmedInput, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            const aiErrorMessage = { id: Date.now() + 1, text: "API Key is not configured.", sender: 'ai', isError: true };
            setMessages(prev => [...prev, aiErrorMessage]);
            setIsLoading(false);
            return;
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        
        // Enhance the prompt with location context if available
        let systemPrompt = "You are an AI health assistant. Your primary goal is to provide safe, helpful health information. A secondary, critical goal is to identify if the user's symptoms suggest a medical emergency. If you detect a potential emergency (e.g., symptoms of heart attack, stroke, severe bleeding, difficulty breathing, etc.), you MUST start your response with the EXACT phrase 'CRITICAL_EMERGENCY'. Do not use this phrase for non-emergencies. For all other queries, respond normally. Always remind the user you are not a doctor.";
        if(location) {
            systemPrompt += ` The user's approximate location is latitude ${location.lat}, longitude ${location.lng}.`;
        }
        
        const payload = {
            contents: [{ parts: [{ text: trimmedInput }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

            const result = await response.json();
            const aiText = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (aiText) {
                // Check for the emergency flag
                if (aiText.startsWith('CRITICAL_EMERGENCY')) {
                    const displayableText = aiText.replace('CRITICAL_EMERGENCY', '').trim();
                    const aiMessage = { id: Date.now() + 1, text: displayableText, sender: 'ai' };
                    setMessages(prev => [...prev, aiMessage]);
                    
                    // Trigger the emergency flow
                    if (location) {
                        findNearbyHospitals(location.lat, location.lng);
                    } else {
                        // If we don't have location, still show the modal without hospitals
                        setShowEmergencyModal(true);
                    }

                } else {
                    const aiMessage = { id: Date.now() + 1, text: aiText, sender: 'ai' };
                    setMessages(prev => [...prev, aiMessage]);
                }
            } else {
                throw new Error("Received an empty response.");
            }

        } catch (error) {
            console.error("API call failed:", error);
            const aiErrorMessage = { id: Date.now() + 1, text: `Sorry, something went wrong. ${error.message}`, sender: 'ai', isError: true };
            setMessages(prev => [...prev, aiErrorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-100 relative">
            {locationPermission === 'prompt' && <LocationPermissionPrompt onAllow={handleLocationPermission} onDeny={() => setLocationPermission('denied')} />}
            
            {showEmergencyModal && 
                <EmergencyModal 
                    nearbyHospitals={nearbyHospitals}
                    onCallAmbulance={() => window.location.href = 'tel:102'}
                    onCallHelpline={() => window.location.href = 'tel:104'}
                    onClose={() => setShowEmergencyModal(false)}
                />
            }

            <div className="flex-grow p-6 overflow-y-auto">
                 {/* Message rendering logic remains the same */}
                 <div className="space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">P</div>
                            )}
                            <div className={`max-w-md p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : (msg.isError ? 'bg-red-100 text-red-700 rounded-bl-none' : 'bg-white text-gray-800 rounded-bl-none shadow-sm')}`}>
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-end gap-3 justify-start">
                             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">P</div>
                             <div className="max-w-md p-4 rounded-2xl bg-white text-gray-800 rounded-bl-none shadow-sm">
                                 <div className="flex items-center space-x-2">
                                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                 </div>
                             </div>
                         </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="bg-white border-t p-4">
                 {/* Input form logic remains the same */}
                 <div className="flex items-center bg-gray-100 rounded-full p-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your health question..."
                        className="flex-grow bg-transparent outline-none px-4 text-gray-800"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 disabled:bg-gray-300 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" transform="rotate(90 12 12)"/></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
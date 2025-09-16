import React, { useState, useRef, useEffect } from 'react';

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { 
            text: "Hello! I'm ProLyfe, your AI health assistant. How can I help you today? You can ask me about symptoms, diseases, or preventive care.", 
            isUser: false,
            sources: [] 
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    // Helper function for API calls with exponential backoff
    const fetchWithRetry = async (url, options, retries = 3, backoff = 500) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    // Don't retry on client-side errors (4xx), only server-side (5xx) or network errors
                    if (response.status >= 400 && response.status < 500) {
                        console.error(`Client Error: ${response.status}. Aborting retries.`);
                        throw new Error(`API call failed with status: ${response.status}`);
                    }
                    // For server errors, throw to trigger a retry
                    throw new Error(`Server Error: ${response.status}`);
                }
                return response.json();
            } catch (error) {
                console.warn(`API call attempt ${i + 1} failed. Retrying in ${backoff}ms...`, error.message);
                if (i === retries - 1) throw error; // Rethrow the last error if all retries fail
                await new Promise(resolve => setTimeout(resolve, backoff));
                backoff *= 2; // Double the backoff for the next attempt
            }
        }
    };

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage = { text: input, isUser: true, sources: [] };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        // --- Gemini API Call ---
        try {
            const systemPrompt = "Act as a helpful and empathetic AI health assistant named ProLyfe. Your primary goal is to provide clear, accurate, and easily understandable health information to the general public in India. You must not provide medical advice, diagnoses, or prescriptions. Always advise users to consult a qualified healthcare professional for any medical concerns. Base your answers on verified information from reputable sources.";
            const userQuery = currentInput;
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const payload = {
                contents: [{ parts: [{ text: userQuery }] }],
                tools: [{ "google_search": {} }],
                systemInstruction: {
                    parts: [{ text: systemPrompt }]
                },
            };

            const result = await fetchWithRetry(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const candidate = result?.candidates?.[0];

            if (candidate && candidate.content?.parts?.[0]?.text) {
                const text = candidate.content.parts[0].text;
                let sources = [];
                const groundingMetadata = candidate.groundingMetadata;
                if (groundingMetadata && groundingMetadata.groundingAttributions) {
                    sources = groundingMetadata.groundingAttributions
                        .map(attr => ({ uri: attr.web?.uri, title: attr.web?.title }))
                        .filter(source => source.uri && source.title);
                }
                setMessages(prev => [...prev, { text, isUser: false, sources }]);
            } else {
                 throw new Error("Invalid response structure from API.");
            }

        } catch (error) {
            console.error("Error fetching from Gemini API after multiple retries:", error);
            setMessages(prev => [...prev, { text: "I'm sorry, I'm having trouble connecting right now. Please try again later.", isUser: false, sources: [] }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };
    
    const handleExamplePrompt = (prompt) => {
        setInput(prompt);
    };

    return (
        <div className="w-full max-w-3xl h-[85vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200">
            <div className="p-5 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 text-center">ProLyfe AI Assistant</h2>
            </div>

            <div className="flex-grow p-6 overflow-y-auto space-y-6">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-3 ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                        {!msg.isUser && (
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">P</div>
                        )}
                        <div className={`max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${msg.isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                            {msg.sources && msg.sources.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-gray-300">
                                    <h4 className="text-xs font-semibold mb-2">Sources:</h4>
                                    <ul className="list-disc list-inside text-xs space-y-1">
                                        {msg.sources.map((source, i) => (
                                            <li key={i}>
                                                <a href={source.uri} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                    {source.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-end gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">P</div>
                         <div className="max-w-md lg:max-w-lg px-4 py-3 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                            </div>
                         </div>
                     </div>
                )}
                <div ref={chatEndRef} />
            </div>
            
            {messages.length <= 1 && (
                <div className="px-6 pb-4 border-t border-gray-200 pt-4">
                     <p className="text-sm text-gray-500 mb-3 text-center">Try an example:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                         <button onClick={() => handleExamplePrompt("What are the symptoms of dengue fever?")} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">Symptoms of dengue</button>
                         <button onClick={() => handleExamplePrompt("How can I prevent monsoon-related illnesses?")} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">Monsoon illness prevention</button>
                         <button onClick={() => handleExamplePrompt("Tell me about the importance of handwashing.")} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">Importance of handwashing</button>
                    </div>
                </div>
            )}


            <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask anything about health..."
                        className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || input.trim() === ''}
                        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    </button>
                </div>
                 <p className="text-xs text-gray-400 text-center mt-3">Disclaimer: ProLyfe is an AI assistant and not a medical professional. Always consult a doctor for medical advice.</p>
            </div>
        </div>
    );
};

export default ChatInterface;
import React from 'react';

const EmergencyModal = ({ nearbyHospitals, onCallAmbulance, onCallHelpline, onClose }) => {
    if (!nearbyHospitals) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-95 animate-scale-in">
                <div className="p-6 text-center bg-red-600 text-white rounded-t-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h2 className="text-3xl font-bold">Emergency Detected</h2>
                    <p className="mt-2 text-red-100">Based on the symptoms described, immediate medical attention is highly recommended.</p>
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Nearby Hospitals</h3>
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                        {nearbyHospitals.length > 0 ? (
                            nearbyHospitals.map((hospital, index) => (
                                <div key={index} className="bg-gray-100 p-3 rounded-lg text-left">
                                    <p className="font-semibold text-gray-900">{hospital.name}</p>
                                    <p className="text-sm text-gray-600">{hospital.vicinity}</p>
                                    <a 
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name)}&query_place_id=${hospital.place_id}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-sm text-blue-500 hover:underline"
                                    >
                                        Get Directions
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">Could not find hospitals nearby. Please call emergency services immediately.</p>
                        )}
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button onClick={onCallAmbulance} className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            <span>Call Ambulance (102/108)</span>
                        </button>
                         <button onClick={onCallHelpline} className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            <span>Health Helpline (104)</span>
                        </button>
                    </div>

                    <button onClick={onClose} className="mt-6 text-sm text-gray-500 hover:text-gray-700">Close and continue chat</button>
                </div>
            </div>
        </div>
    );
};

export default EmergencyModal;
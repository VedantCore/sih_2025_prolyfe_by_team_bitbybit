import React from 'react';

const ProLyfeIcon = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 200 200" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="proLyfeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} /> 
        <stop offset="100%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path 
      fill="url(#proLyfeGradient)" 
      d="M172.8,41.2c-20.4-20.4-53.6-20.4-74,0L96,44.1l-2.8-2.8c-20.4-20.4-53.6-20.4-74,0s-20.4,53.6,0,74 l2.8,2.8L25,121.1C12,138.6,12.4,163.3,25.9,179.1c13.5,15.8,38,16.1,52,1.2l18.1-19.3l2.8,2.8c10.2,10.2,23.6,15.3,37,15.3 s26.8-5.1,37-15.3c20.4-20.4,20.4-53.6,0-74L172.8,41.2z M125,110h-20v20c0,4.4-3.6,8-8,8s-8-3.6-8-8v-20H69c-4.4,0-8-3.6-8-8 s3.6-8,8-8h20V74c0-4.4,3.6-8,8-8s8,3.6,8,8v20h20c4.4,0,8,3.6,8,8S129.4,110,125,110z"
    />
  </svg>
);

export default ProLyfeIcon;
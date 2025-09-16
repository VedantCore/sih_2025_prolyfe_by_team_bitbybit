import React from 'react';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';

function App() {
  const [route, setRoute] = React.useState(window.location.pathname);

  // This effect listens for browser back/forward navigation
  React.useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple router logic
  let ComponentToRender;
  switch (route) {
    case '/chat':
      ComponentToRender = ChatPage;
      break;
    case '/':
    default:
      ComponentToRender = LandingPage;
      break;
  }

  return (
    <div>
      <ComponentToRender />
    </div>
  );
}

export default App; 
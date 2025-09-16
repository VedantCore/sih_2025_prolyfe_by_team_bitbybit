import React from 'react';
import LandingPage from './pages/LandingPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import TeamPage from './pages/TeamPage.jsx';

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

  // Simple router logic to render the correct page
  let ComponentToRender;
  switch (route) {
    case '/chat':
      ComponentToRender = ChatPage;
      break;
    case '/team':
      ComponentToRender = TeamPage;
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
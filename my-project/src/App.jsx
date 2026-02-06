import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatApp from './components/ChatApp';
import './chatbot.css';

function App() {
  return (
    <div className="App">
      <ChatApp />
    </div>
  );
}

// If using Vite/CRA
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
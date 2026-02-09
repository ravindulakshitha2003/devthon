import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageOne from './Chatapp';
import PageTwo from './TripItinerary';

function App() {
  return (
   
   


    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageOne />} />
        <Route path="/second" element={<PageTwo />} />
      </Routes>
    </BrowserRouter>
      
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
import React from 'react';
import KalenderApp from './KalenderApp.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>NA Nail Spa</h1>

      <KalenderApp/>
    
      <h2>Öppettider</h2>

     <p>Måndag - Fredag: 09:00 - 19:00</p>
      <p>Lördag: 10:00 - 16:00</p>
      <p>Söndag: 11:00 - 16:00 </p>
      <h2>Adress</h2>
      <p>
      Västra Storgatan 14, 611 31 Nyköping
      </p>

    </div>
    
  );
}

export default App
import React from 'react';
import AppointmentForm from './AppointmentForm';



function KalenderApp() {


  return (
    <div>
      <div style={{ padding: '10px', backgroundColor: 'pink', width: '100vw', boxShadow: '0 5px 7px rgba(0, 0, 0, 0.5)' }}>
        <h2>Boka tid</h2>
      </div>

      <AppointmentForm />


    </div>
  );
}

export default KalenderApp;
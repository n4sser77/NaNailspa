import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { sv } from 'date-fns/locale';
import 'react-calendar/dist/Calendar.css';
import './AppointmentForm.css';
import { Form } from 'react-router-dom';

function AppointmentForm() {
    //Access treatment from session storage
    const selectedTreatment = sessionStorage.getItem('selectedTreatment');

  const [time, setTime] = useState('');
  const [date, setDate] = React.useState(new Date());
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString({ year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }));

  const onChange = (date) => {
    setDate(date);
  };
  ;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const userData = {
    name,
    email,
    phone
  };

  const formData = {time, date, name, email, phone, selectedTreatment}


  const [tillgängligaTider, setTillgängligaTider] = useState(["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Date submitted ${currentDateTime}`);

    alert(`Appointment set for ${selectedTreatment} on ${date.toLocaleDateString('en-CA')} at ${time} submitted: ${currentDateTime}, by ${JSON.stringify(userData)}`);

    try {
      const response = await fetch('/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Form submitted successfully!');
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form className='appointment-form' onSubmit={handleSubmit}>

      <Calendar
        onChange={onChange}
        value={date}
        locale={sv}
      />

      <label className='appointment-options'>
        Tid:
        <select className='timeOptions' value={time} onChange={e => setTime(e.target.value)} required>
          <option value="">Välj en tid</option>
          {tillgängligaTider.map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
      </label>

      <label className='labelField'>
        Namn:<input className='userInput' onChange={e => setName(e.target.value)} type='text' placeholder='Namn' name='name' />
      </label>

      <label className='labelField'>
        Email:<input className='userInput' onChange={e => setEmail(e.target.value)} type='text' placeholder='Email' name='Email' />
      </label>

      <label className='labelField'>
        Telefon:<input className='userInput' onChange={e => setPhone(e.target.value)} type='text' placeholder='Telefon' name='phone' />
      </label>

      <input className='appointment-btn' type="submit" value="Bekräfta tid" />
    </form>

  );
}

export default AppointmentForm;
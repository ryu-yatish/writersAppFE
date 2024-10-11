// components/Agenda.js
import React from 'react';
import agendaImg from './Agenda.png'; // Import the uploaded image

const Agenda = () => {
  return (
    <section>
      <div>
        <img src={agendaImg} alt="Agenda" style={{ width: '100%' }} />
      </div>
    </section>
  );
};

export default Agenda;

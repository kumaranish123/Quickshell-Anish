import React, { useState, useEffect } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import { fetchTickets } from '../services/api';
import './LandingPage.css';

function LandingPage() {
  const [tickets, setTickets] = useState([]);
  
  useEffect(() => {
    async function loadTickets() {
      const fetchedTickets = await fetchTickets();
      setTickets(fetchedTickets);
    }
    loadTickets();
  }, []);

  return (
    <div className="landing-page">
      <h1>Kanban Board</h1>
      <KanbanBoard tickets={tickets} />
    </div>
  );
}

export default LandingPage;
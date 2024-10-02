import React, { useState, useEffect } from 'react';
import TicketCard from './TicketCard';
import GroupingSelector from './GroupingSelector';
import SortingSelector from './SortingSelector';
import { fetchTickets } from '../services/api'; // Assuming this is in api.js
import './KanbanBoard.css';

function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sortOrder, setSortOrder] = useState('priority');

  // Fetching tickets on component mount
  useEffect(() => {
    async function loadTickets() {
      const data = await fetchTickets();
      setTickets(data.tickets);
    }

    loadTickets();
  }, []);

  const handleGroupingChange = (group) => {
    setGrouping(group);
  };

  const handleSortingChange = (sort) => {
    setSortOrder(sort);
  };

  // Group tickets dynamically based on the selected grouping (status, user, priority)
  const groupTickets = (tickets) => {
    const groupedTickets = {};

    tickets.forEach((ticket) => {
      let groupKey = '';
      if (grouping === 'status') {
        groupKey = ticket.status;
      } else if (grouping === 'user') {
        groupKey = ticket.userId;
      } else if (grouping === 'priority') {
        groupKey = ticket.priority;
      }

      if (!groupedTickets[groupKey]) {
        groupedTickets[groupKey] = {
          name: groupKey, 
          tickets: [],
        };
      }
      groupedTickets[groupKey].tickets.push(ticket);
    });

    return Object.values(groupedTickets);
  };

  // Sorting logic
  const sortTickets = (groupedTickets) => {
    return groupedTickets.map(group => ({
      ...group,
      tickets: [...group.tickets].sort((a, b) => {
        if (sortOrder === 'priority') {
          return a.priority - b.priority; // Sort by priority (ascending)
        }
        return 0; // No other sorting implemented in this example
      }),
    }));
  };

  // Apply grouping and sorting logic
  const sortedGroupedTickets = sortTickets(groupTickets(tickets));

  return (
    <div className="kanban-board">
      <div className="controls">
        <GroupingSelector onChange={handleGroupingChange} />
        <SortingSelector onChange={handleSortingChange} />
      </div>
      <div className="board-columns">
        {/* Render grouped tickets here */}
        {sortedGroupedTickets.map((group, index) => (
          <div key={index} className="column">
            <h2>{group.name}</h2>
            {group.tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Ticket from '../components/Ticket';
import TicketModal from '../components/TicketModal';

const apiUrl = process.env.REACT_APP_API_URL;

const AdminPage = () => {
  const [tickets, setTickets] = useState([]);
  const [openTicketId, setOpenTicketId] = useState(null);
  const [message, setMessage] = useState('');

  const fetchTickets = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/ticket`, {
        method: 'GET',
      });
      const data = await response.json();
      setTickets(data);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCloseModal = () => {
    setOpenTicketId(null);
  };

  const handleOpenModal = (ticketId) => {
    setOpenTicketId(ticketId);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    const currTicket = tickets.find((ticket) => ticket._id === openTicketId);
    if (!message) {
      alert(`Please enter your message.`);
    } else {
      alert(
        `Would normally send to ${currTicket.email} with body: \n${message}`
      );
      handleCloseModal();
    }

    resetMessage();
  };

  const resetMessage = () => {
    setMessage('');
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${apiUrl}/api/ticket/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === id ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='admin-container'>
      <nav>
        <Link to='/' className='main-link'>
          Main
        </Link>
      </nav>
      <h1>Admin Panel</h1>
      <div className='ticket-table'>
        <table>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Description</th>
              <th scope='col'>Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 &&
              tickets.map((ticket, i) => (
                <Ticket
                  ticket={ticket}
                  key={i}
                  isOpen={ticket.id === openTicketId}
                  handleOpen={() => handleOpenModal(ticket._id)}
                  stopPropagation={stopPropagation}
                  onStatusChange={handleStatusChange}
                />
              ))}
          </tbody>
        </table>
      </div>
      <TicketModal
        isOpen={openTicketId !== null}
        handleClose={handleCloseModal}
        ticket={tickets.find((ticket) => ticket._id === openTicketId)}
        capitalizeFirstLetter={capitalizeFirstLetter}
        handleMessageChange={handleMessageChange}
        handleSendMessage={handleSendMessage}
        stopPropagation={stopPropagation}
      />
    </div>
  );
};

export default AdminPage;

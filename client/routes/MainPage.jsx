import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    description: '',
  });

  const handleFormChange = (e) => {
    setTicketForm({
      ...ticketForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticket = {
      name: ticketForm.name,
      email: ticketForm.email,
      description: ticketForm.description,
    };

    try {
      const response = await fetch('/api/ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
      alert('Help Desk Submission Failed!');
      return;
    }

    resetForm();

    alert('Help Desk Submitted Successfully!');
  };

  const resetForm = () => {
    setTicketForm({
      name: '',
      email: '',
      description: '',
    });
  };

  return (
    <div className='main-container'>
      <nav>
        <Link to='/admin' className='admin-link'>
          Admin
        </Link>
      </nav>
      <h1>Submit Your Help Desk Here!</h1>
      <form className='ticket-form' onSubmit={handleSubmit}>
        <div>
          <label>
            Name <em>&#x2a;</em>
          </label>
          <input
            type='text'
            name='name'
            id='name'
            required=''
            placeholder='ex: John Doe'
            value={ticketForm.name}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label>
            Email <em>&#x2a;</em>
          </label>
          <input
            type='email'
            name='email'
            id='email'
            required=''
            placeholder='ex: myname@gmail.com'
            value={ticketForm.email}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label>
            Description <em>&#x2a;</em>
          </label>
          <textarea
            id='description'
            name='description'
            rows='4'
            required=''
            placeholder='ex: I had trouble redeeming gift cards.'
            value={ticketForm.description}
            onChange={handleFormChange}
          ></textarea>
        </div>
        <button id='ticket-submit' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default MainPage;

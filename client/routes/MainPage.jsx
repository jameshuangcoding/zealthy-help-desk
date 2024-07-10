import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

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
      const response = await fetch(`${apiUrl}/api/ticket`, {
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
    <div className='page-container'>
      <nav>
        <Link to='/admin'>
          <button className='admin-button'>Admin</button>
        </Link>
      </nav>
      <section className='section-main'>
        <div className='contact-text-container'>
          <div className='contact-help-desk-banner'>
            <p className='main-p'>Contact Help Desk</p>
          </div>
          <h1>Get in touch with the support team</h1>
          <p className='main-p'>Experiencing technical challanges? Feel free to reach out!</p>
        </div>
        <div className='contact-form-container'>
          <form className='ticket-form' onSubmit={handleSubmit}>
            <div className='form-property'>
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
            <div className='form-property'>
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
            <div className='form-property'>
              <label>
                Description <em>&#x2a;</em>
              </label>
              <textarea
                id='description'
                name='description'
                rows='10'
                required=''
                placeholder='ex: I had trouble redeeming gift cards.'
                value={ticketForm.description}
                onChange={handleFormChange}
              ></textarea>
            </div>
            <button class='ticket-submit' type='submit'>
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default MainPage;

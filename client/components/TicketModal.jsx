import React from 'react';

const TicketModal = ({
  isOpen,
  handleClose,
  ticket,
  capitalizeFirstLetter,
  handleMessageChange,
  handleSendMessage,
  stopPropagation,
}) => {
  if (!isOpen) return null;

  return (
    <div className='ticket-modal' onClick={handleClose}>
      <div className='modal-content' onClick={stopPropagation}>
        <span className='close-modal' onClick={handleClose}>
          &times;
        </span>
        <p>
          <strong>Name:</strong> {ticket.name}
        </p>
        <p>
          <strong>Email:</strong> {ticket.email}
        </p>
        <p>
          <strong>Description:</strong> {ticket.description}
        </p>
        <p>
          <strong>Status:</strong> {capitalizeFirstLetter(ticket.status)}
        </p>
        <p>
          <strong>Your Message:</strong>
        </p>
        <textarea
          id='message'
          name='message'
          rows='4'
          placeholder='ex: Your solution is...'
          onChange={handleMessageChange}
        ></textarea>
        <button id='send-message' onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default TicketModal;

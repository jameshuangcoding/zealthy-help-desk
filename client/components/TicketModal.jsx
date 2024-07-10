import React from 'react';
import { IoMdChatboxes } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { GrStatusInfo } from 'react-icons/gr';

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
        <div className='modal-header'>
          <div className='title-group'>
            <IoMdChatboxes />
            <h4>{ticket.name}</h4>
          </div>
          <span className='close-modal' onClick={handleClose}>
            &times;
          </span>
        </div>
        <hr />
        <div className='info-group'>
          <MdEmail />
          <p className='info-p'>{ticket.email}</p>
        </div>
        <div className='info-group'>
          <GrStatusInfo />
          <p className='info-p'>{capitalizeFirstLetter(ticket.status)}</p>
        </div>
        <div className='info-group'>
          <p>
            <strong>Description:</strong> {ticket.description}
          </p>
        </div>
        <div className='info-group'>
          <p>
            <strong>Your Message:</strong>
          </p>
        </div>

        <textarea
          className='message-box'
          name='message'
          rows='6'
          placeholder='ex: Your solution is...'
          onChange={handleMessageChange}
        ></textarea>
        <button className='send-message' onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default TicketModal;

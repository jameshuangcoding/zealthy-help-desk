import React from 'react';

const Ticket = ({
  ticket,
  handleOpen,
  capitalizeFirstLetter,
  stopPropagation,
  onStatusChange,
}) => {
  const { name, email, description, status, _id } = ticket;

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    await onStatusChange(_id, newStatus);
  };

  return (
    <tr className='row' scope='row' onClick={handleOpen}>
      <td className='row-name'>{name}</td>
      <td className='row-email'>{email}</td>
      <td className='row-description'>{description}</td>
      <td className='row-status'>
        <select
          onClick={stopPropagation}
          onChange={handleStatusChange}
          value={status}
        >
          <option value='new'>New</option>
          <option value='in-progress'>In-Progress</option>
          <option value='resolved'>Resolved</option>
        </select>
      </td>
    </tr>
  );
};

export default Ticket;

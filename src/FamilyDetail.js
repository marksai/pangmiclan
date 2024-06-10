import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Bind modal to the app root

const DetailModal = ({ isOpen, onRequestClose, name, details }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Node Details"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <h2>{name}</h2>
      <p>{details}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default DetailModal;

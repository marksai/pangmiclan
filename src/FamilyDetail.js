import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Bind modal to the app root

const DetailModal = ({ isOpen, onRequestClose, selectedMember }) => {
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
          maxWidth: '90%',
          width: '80%',
          height: '50%',
          padding: '20px',
        },
      }}
    >
       <div className="member-details">
          <h4>Details for {selectedMember.name}</h4>
          <p>
            <strong>Born:</strong>{selectedMember.dob? selectedMember.dob : 'N/A'}<br />
            <strong>Spouse:</strong> {selectedMember.spouse ? selectedMember.spouse : 'N/A'}
            </p>
            {selectedMember.children.length > 0 && (
            <div>
              <h3>Children:</h3>
              <ul>
                {selectedMember.children.map(child => (
                  <li key={child.id}>{child.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default DetailModal;

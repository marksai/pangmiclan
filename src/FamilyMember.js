// src/FamilyMember.js
import React, { useState } from 'react';
import DetailModal from './FamilyDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const FamilyMember = ({ member, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const[modalIsOpen, setModalIsOpen]=useState(false);
  //const [currentNode, setCurrentNode] = useState(member);
  
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const onEditClick = (member) =>{
    console.log("modal open");
    //setCurrentNode({ member });
    setModalIsOpen(true);
  };
  return (
    <div className="family-member">
      <div className="member-info" onClick={() => onSelect(member)}>
        <span style={{display: 'flex', justifyContent: 'right'}}>
        <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={() => onEditClick(member)}  />
        </span>
     
        <h4 onClick={handleToggleVisibility}>
          {member.name} {isVisible ? '▼' : '▶'}
          
        </h4>
        {member.spouse && <span>Spouse: {member.spouse}</span>}
        
      
      </div>
      {isVisible && member.children.length > 0 && (
        <div className="children">
          {member.children.map((child) => (
            <FamilyMember key={child.id} member={child} onSelect={onSelect} />
          ))}
        </div>
      )}
       <DetailModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedMember={member}
     
      />
    </div>
  );
};

export default FamilyMember;

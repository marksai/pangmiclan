// src/FamilyMember.js
import React, { useState } from 'react';
import DetailModal from './FamilyDetail';

const FamilyMember = ({ member, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);


  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };


  return (
    <div className="family-member">
      <div className="member-info" onClick={() => onSelect(member)}>
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
      
    </div>
  );
};

export default FamilyMember;

// src/FamilyTree.js
import React from 'react';
import FamilyMember from './FamilyMember';

const FamilyTree = ({ members, onSelect }) => {
  return (
    <div>
      {members.map((member) => (
        <FamilyMember key={member.id} member={member} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default FamilyTree;


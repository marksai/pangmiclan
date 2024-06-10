// src/App.js
import React, { useEffect, useState } from 'react';
import FamilyTree from './FamilyTree';
import './FamilyTree.css';
import DetailModal from './FamilyDetail';

const App = () => {
  const [familyTree, setFamilyTree] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://localhost:7208/api/FamilyTree/GetFamilyTree';
    fetch(apiUrl) 
      .then((response) => response.json())
      .then((data) => setFamilyTree(data))
      .catch((error) => console.error('Error loading family tree:', error));
  }, []);


 // useEffect(() => {
  //  fetch('/myfamily.json')
   //   .then((response) => response.json())
    //  .then((data) => setFamilyTree(data))
     // .catch((error) => console.error('Error loading family tree:', error));
  //}, []);

  const handleSelectMember = (member) => {
    setSelectedMember(member);
  };

  return (
    <div className="App">
      <div className="title">Pang Mi Clan Family Tree</div>
      {familyTree ? <FamilyTree members={familyTree} onSelect={handleSelectMember} /> : <p>Loading...</p>}
      {selectedMember && (
        <div className="member-details">
          <h2>Details for {selectedMember.name}</h2>
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
      )}
    </div>
  );
};

export default App;

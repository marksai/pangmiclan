// src/App.js
import React, { useEffect, useState } from 'react';
import FamilyTree from './FamilyTree';
import './FamilyTree.css';
//import DetailModal from './FamilyDetail';

const App = () => {
  const [familyTree, setFamilyTree] = useState(null);
  //const [selectedMember, setSelectedMember] = useState(null);


  useEffect(() => {
    const apiUrl = 'https://pangmiclan-webapi.azurewebsites.net/api/FamilyTree/GetFamilyTree';
    //const apiUrl = 'https://localhost:7208/api/FamilyTree/GetFamilyTree';
    
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
    //setSelectedMember(member);
  };

  return (
    <div className="App">
      <div className="title">Pang Mi Clan Family Tree</div>
      {familyTree ? <FamilyTree members={familyTree} onSelect={handleSelectMember} /> : <p>Loading...</p>}
      
    </div>
  );
};

export default App;

// src/FamilyTree.js
import React, { useEffect, useState } from 'react';
import FamilyMember from './FamilyMember';
import './FamilyTree.css';

const FamilyTree = (treename) => {
  const [familyTree, setFamilyTree] = useState(null);
  const[treeName,setTreeName]=useState("PangMiClan");

  useEffect(() => {
    //const apiUrl = 'https://pangmiclan-webapi.azurewebsites.net/api/FamilyTree/GetFamilyTree';
    const apiUrl = 'https://localhost:7208/api/FamilyTree/GetFamilyTree?treeName='+treeName;
    
    fetch(apiUrl) 
      .then((response) => response.json())
      .then((data) => setFamilyTree(data))
      .catch((error) => console.error('Error loading family tree:', error));
  }, []);
  const handleSelectMember = () => {
    //do nothing for now
    //setSelectedMember(member);
  };
  return (
    <>
    <div className="title">{treeName} Family Tree V1</div>
    <div>
       {familyTree ?familyTree.map((member) => (
        <FamilyMember key={member.id} member={member} onSelect={handleSelectMember} />
      ))
      : <p>Loading...</p>
      } 
    </div>
    </>
   
  );
};

export default FamilyTree;


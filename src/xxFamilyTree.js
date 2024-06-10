import React,{useState,useEffect} from 'react';
import './FamilyTree.css';

/*const familyData = [
  {
    name: "Grandparent",
    details: "Details about Grandparent",
    children: [
      {
        name: "Parent 1",
        details: "Details about Parent 1",
        children: [
          { name: "Child 1.1", details: "Details about Child 1.1", children: [] },
          { name: "Child 1.2", details: "Details about Child 1.2", children: [] },
        ],
      },
      {
        name: "Parent 2",
        details: "Details about Parent 2",
        children: [
          { name: "Child 2.1", details: "Details about Child 2.1", children: [] },
          { name: "Child 2.2", details: "Details about Child 2.2", children: [] },
        ],
      },
    ],
  },
];
*/

const FamilyNode = ({ name, details, children, onNodeClick }) => {
  return (
    <li>
      <div className="node" onClick={() => onNodeClick(name, details)}>{name}</div>
      {children && children.length > 0 && (
        <ul>
          {children.map((child, index) => (
            <FamilyNode key={index} {...child} onNodeClick={onNodeClick} />
          ))}
        </ul>
      )}
    </li>
  );
};

const FamilyTree = () => {
  const [familyData,setData]=useState([]);
  const getData=()=>{
    fetch('myfamily.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }

  useEffect(()=>{
    getData()
  },[])

  const handleNodeClick = (name, details) => {
    alert(`Name: ${name}\nDetails: ${details}`);
  };

  return (
    <div>
      <h1>Family Tree</h1>

      
      <ul className="tree">
          {familyData.map((node, index) => (
         <FamilyNode key={index} {...node} onNodeClick={handleNodeClick} />
        ))}


      </ul>
    </div>
  );
};

export default FamilyTree;

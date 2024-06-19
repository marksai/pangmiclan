import React, { useState }  from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faClose, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { TextField,Button } from '@mui/material';

Modal.setAppElement('#root'); // Bind modal to the app root

const DetailModal = ({ isOpen, onRequestClose,selectedMember }) => {
  const [showEdit,setEditScreen] = useState(false);
  const [inputs, setInputs] = useState({});
  const [name, setName] = useState(selectedMember);
  const [dob, setDOB] = useState(selectedMember);
  const [spouse, setSpouse] = useState(selectedMember);
  const onEditClick = () =>{
    console.log("edit screen");
    setEditScreen(true);
  };

  const onCancelEdit = () =>{
    console.log("detail screen");
    setEditScreen(false);
  };

  const onAddChild = (selectedMember) =>{
    console.log(selectedMember);

  };

  const handleChange = (event) => {
    console.log("changing");
    console.log(event.target.value);
    
    const name = event.target.name;
    const value = event.target.value;
    //selectedMember.name=event.target.value;

    setInputs(values => ({...values, [name]: value}))
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit");
    console.log(selectedMember);
    
    try {
      const response = await fetch('https://pangmiclan-webapi.azurewebsites.net/api/FamilyTree/put/'+selectedMember.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedMember)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      //const updatedNode = await response.json();
      //onUpdate(node.id, updatedNode);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
      
      
  }
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

<span style={{display: 'flex', justifyContent: 'right'}}>
       <FontAwesomeIcon icon={faClose} onClick={onRequestClose}  />
    </span>   
{!showEdit && <div className="member-details">
          <h4>Details for {selectedMember.name}  <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={() => onEditClick()}  /></h4>

         
     
          <p>
            <strong>Name: </strong>{selectedMember.name} <br />
            <strong>Born:</strong>{selectedMember.dob? selectedMember.dob : 'N/A'}<br />
            <strong>Known As:</strong>{selectedMember.knownas? selectedMember.knownas : 'N/A'}<br />
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
            <br />
            <Button variant="contained" color="secondary" type="button" onClick={() => onAddChild(selectedMember)}> 
                    Add Child
            </Button>
        </div>
      }

        {showEdit && <div className="member-details">
          <h4>Edit for {selectedMember.name}</h4>
          <form onSubmit={handleSubmit}>
          <p>
          <TextField id="name" name="name" label="Name"
                      value={selectedMember.name}
                      style={{ width: 350 }}
                      onChange={
                        (event)=>{
                          const val=event.target.value;
                          selectedMember.name=event.target.value;
                          setName(val);
                        }
                      }
                    >
          </TextField>
          <br /> <br />
          <TextField id="dob" name="dob" label="Born in (year)"
                      value={selectedMember.dob}
                      style={{ width: 350 }}
                      onChange={
                        (event)=>{
                          const val=event.target.value;
                          selectedMember.dob=event.target.value;
                          setDOB(val);
                        }
                      }
                    >
                      
          </TextField>
          <br /> <br />
          <TextField id="spouse" name="spouse" label="Spouse"
                      value={selectedMember.spouse}
                      style={{ width: 350 }}
                      onChange={
                        (event)=>{
                          const val=event.target.value;
                          selectedMember.spouse=event.target.value;
                          setSpouse(val);
                        }
                      }
                    >
          </TextField>
            
            </p>
            <Button variant="contained" color="primary" type="submit"> 
                    Save Changes
            </Button>
            &nbsp;&nbsp;
            <Button variant="contained" color="secondary" type="button" onClick={() => onCancelEdit()}> 
                    Cancel
            </Button>

          </form>        
        </div>     
       
}


     
    </Modal>
  );
};

export default DetailModal;

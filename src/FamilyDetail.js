import React, { useState }  from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faClose } from '@fortawesome/free-solid-svg-icons';
import { TextField,Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import PhotoUpload from './PhotoUpload';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Image from './img/Portrait_placeholder.png';


Modal.setAppElement('#root'); // Bind modal to the app root

const DetailModal = ({ isOpen, onRequestClose,selectedMember,dialogOpen }) => {
  const [showEdit,setEditScreen] = useState(false);
  //const [inputs, setInputs] = useState({});
  const [name, setName] = useState(selectedMember);
  const [dob, setDOB] = useState(selectedMember);
  const [spouse, setSpouse] = useState(selectedMember);
  const [otherinfo, setOtherInfo] = useState(selectedMember);
  const [knownas, setKnownAs] = useState(selectedMember);
  const [open, setOpen] = useState(false);
  const [photoUrl,setPhotoUrl]=useState("");
  //const [children,setAddChild]=useState(selectedMember);

  const handleUpload = url =>{
    setPhotoUrl(url);
  }
  const onEditClick = () =>{
    console.log("edit screen");
    setEditScreen(true);
  };

  const onCancelEdit = () =>{
    console.log("detail screen");
    setEditScreen(false);
  };

  const onCloseDialog = () =>{
    console.log("close dialog screen");
    setOpen(false);
  };


  const onAddChild = async (selectedMember) =>{
    console.log(selectedMember);
    var res='';
    if(selectedMember.children.length>0)
    {
        var lastId=selectedMember.children[selectedMember.children.length-1].id;
        var newId=parseInt(lastId.charAt(lastId.length - 1))+1;
        res = selectedMember.id+"."+newId ;
    }
    else
    {
      res=selectedMember.id+".1";
    }
    console.log(res);
    var val={ id: res, name: "--",dob:"--",spouse:"--",knownas:"--",otherinfo:"--", children: [] };
    selectedMember.children.push(val);
    
    //setAddChild(addChildToTree(selectedMember));
    console.log(selectedMember);
    try {
      const response = await fetch('https://pangmiclan-webapi.azurewebsites.net/api/FamilyTree/put/'+selectedMember.id.charAt(0), {
        //const response = await fetch('https://localhost:7208/api/FamilyTree/put/'+selectedMember.id.charAt(0), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedMember)
      });
      setEditScreen(false);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      //const updatedNode = await response.json();
      //onUpdate(node.id, updatedNode);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
    setEditScreen(false);
    setOpen(true);
  };
/*
  const handleChange = (event) => {
    console.log("changing");
    console.log(event.target.value);
    
    const name = event.target.name;
    const value = event.target.value;
    //selectedMember.name=event.target.value;

    setInputs(values => ({...values, [name]: value}))
  };
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit");
    console.log(selectedMember);
    
    try {
      const response = await fetch('https://pangmiclan-webapi.azurewebsites.net/api/FamilyTree/put/'+selectedMember.id.charAt(0), {
       // const response = await fetch('https://localhost:7208/api/FamilyTree/put/'+selectedMember.id.charAt(0), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedMember)
        
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      else
      {
        setEditScreen(false);
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
      class="modalDetail"
    >
      <Dialog
        open={open}
        onClose={() => onCloseDialog()}  
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            A Child has been added. Please enter the information manually. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onCloseDialog()} >Close</Button>
         
        </DialogActions>
      </Dialog>  
<span style={{display: 'flex', justifyContent: 'right'}}>
       <FontAwesomeIcon icon={faClose} onClick={onRequestClose}  />
    </span>   
        {!showEdit && <div className="member-details">
          {selectedMember.id == "1" && <a href="">Add Parent</a>}
          <h4>Details for {selectedMember.name} <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={() => onEditClick()}  /></h4>

          <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
          <Grid item xs={8} sm={6}>
           <div>
           <strong>Name: </strong>{selectedMember.name} <br />
            <strong>Born:</strong>{selectedMember.dob? selectedMember.dob : 'N/A'}<br />
            <strong>Known As:</strong>{selectedMember.knownas? selectedMember.knownas : 'N/A'}<br />
            <strong>Spouse:</strong> {selectedMember.spouse ? selectedMember.spouse : 'N/A'}<br />
            <strong>Other Info:</strong> {selectedMember.otherinfo ? selectedMember.otherinfo : 'N/A'}
           </div>
            
            {selectedMember.children.length > 0 && (
            <div>
              <h4>Children:</h4>
              
              <ul>
                {selectedMember.children.map(child => (
                  <li key={child.id}>{child.name}</li>
                ))}
              </ul>
            </div>          
          )}
      
          </Grid>
          <Grid item xs={4} sm={6}>
          {photoUrl ? (
            <img className='photoImg' src={photoUrl} alt={`${name}'s photo`} />
          ) : (
           <img className='photoImg' src={Image}/>
          )}
          <br />
          {/* <PhotoUpload onUpload={handleUpload} /> */}
          </Grid>
          </Grid>
          </Box>

   
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
                      //style={{ width: 350 }}
                      fullWidth 
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
          <TextField id="name" name="knownas" label="Known As"
                      value={selectedMember.knownas}
                      fullWidth
                      onChange={
                        (event)=>{
                          const val=event.target.value;
                          selectedMember.knownas=event.target.value;
                          setKnownAs(val);
                        }
                      }
                    >
          </TextField>
          <br /> <br />
          <TextField id="dob" name="dob" label="Born in (year)"
                      value={selectedMember.dob}
                      fullWidth
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
                      fullWidth
                      onChange={
                        (event)=>{
                          const val=event.target.value;
                          selectedMember.spouse=event.target.value;
                          setSpouse(val);
                        }
                      }
                    >
          </TextField>
          <br /> <br />
          <TextField id="otherinfo" name="otherinfo" label="Other Info"
                      value={selectedMember.otherinfo}
                      fullWidth
                      multiline
                      rows={4}
                      onChange={
                        (event)=>{
                          const val=event.target.value;
                          selectedMember.otherinfo=event.target.value;
                          setOtherInfo(val);
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

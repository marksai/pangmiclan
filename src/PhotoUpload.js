import React,{  useState } from 'react';
import {storage} from './firebase';
import { ref, getDownloadURL, uploadBytesResumable,uploadBytes } from "firebase/storage";
import {Button } from '@mui/material';
import CircularProgress  from '@mui/material/CircularProgress';
import UploadFile from '@mui/icons-material/UploadFile';

const PhotoUpload=({onUpload}) => {
    const [image,setImage]= useState(null);
    const [url,setUrl]=useState("");
    const [progress,setProgress]=useState(0);

    const handleChange = e =>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
        console.log(image);
    };

    const handleUpload = (e) => {
        //const uploadTask=storage.ref(`images/${image.name}`).put(image);
        console.log(image);
        console.log(storage);
        if (!image) return;
        const storageRef = ref(storage, `files/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(progress);
            },
            error => {
              console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL)
             // storage
             //   .ref("images")
             //   .child(image.name)
              //  .getDownloadURL()
              //  .then(url => {
              //    setUrl(url);
             //     onUpload(url);
                });
            }
          );
        };
        return (
            <div>
              <UploadFile>
              <input
                  type="file"
                 hidden
                  onChange={handleChange}
              />
              </UploadFile>
              
              <CircularProgress variant="determinate" value={progress} />
              <br /><br />
              <Button variant="contained"
                size="small"
                component="label" onClick={handleUpload}>Upload</Button>
              <br />
              {url && <img src={url} alt="Uploaded" />}
            </div>
          );
};

export default PhotoUpload;

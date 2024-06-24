import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   // apiKey: process.env.REACT_APP_API_KEY,
   // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    //projectId: process.env.REACT_APP_PROJECT_ID,
   // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
   // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
   // appId: process.env.REACT_APP_APP_ID,
   apiKey: "AIzaSyA7Blcm_N3uKJMqIRdeaRSE7mj2y-alN6U",
   authDomain: "pangmiclan.firebaseapp.com",
   projectId: "pangmiclan",
   storageBucket: "pangmiclan.appspot.com",
   messagingSenderId: "929135163711",
   appId: "1:929135163711:web:76620344ec0f2347b33b8a",
  };

  export const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);
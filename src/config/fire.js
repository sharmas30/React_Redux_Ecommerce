import {initializeApp} from 'firebase/app'; 
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC2304p5pGeOi8TTx_AlQTrXhsB3-0DzAQ",
    authDomain: "react-clothing-web.firebaseapp.com",
    projectId: "react-clothing-web",
    storageBucket: "react-clothing-web.appspot.com",
    messagingSenderId: "133144133223",
    appId: "1:133144133223:web:feb572922caf0868991ec2"
  };

  const fire = initializeApp(firebaseConfig)
  export default fire;
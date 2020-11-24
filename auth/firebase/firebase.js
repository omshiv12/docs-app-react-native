import * as firebase from 'firebase';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDHoJLzxZH57R5SF39XbthhtGoN-tB4OtY",
  authDomain: "fir-rn-77d0f.firebaseapp.com",
  databaseURL: "https://fir-rn-77d0f.firebaseio.com",
  projectId: "fir-rn-77d0f",
  storageBucket: "fir-rn-77d0f.appspot.com",
  messagingSenderId: "413089855657",
  appId: "1:413089855657:web:e77f927db32eb05295d1b8",
  measurementId: "G-7LFL0ZLKKP"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {firebase};

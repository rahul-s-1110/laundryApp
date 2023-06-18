import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAul2pFNzLaY6b1DDOiGI1TWxQYjMG2DBA",
  authDomain: "laundry-app-fb422.firebaseapp.com",
  projectId: "laundry-app-fb422",
  storageBucket: "laundry-app-fb422.appspot.com",
  messagingSenderId: "296305203199",
  appId: "1:296305203199:web:d916c693e8f2ea0eecb9ca"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};
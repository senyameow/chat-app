
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth' // регистрация с гугла - импортируем это
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBcJiD7ZxEUs8NV170OsnGTiOPqu4SKUyY",
  authDomain: "chatapp-22e24.firebaseapp.com",
  projectId: "chatapp-22e24",
  storageBucket: "chatapp-22e24.appspot.com",
  messagingSenderId: "703652102356",
  appId: "1:703652102356:web:4a0d0446c05913fe12bb41",
  measurementId: "G-NYKHR8FE70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//нам надо будет Authentication и Firebase db

export const auth = getAuth(app) // создали и экспортировали переменную для входа в акк
export const provider = new GoogleAuthProvider() // и экспортируем хероту для гугла

//нам надо иметь доступ к дб файрстора

export const db = getFirestore(app)
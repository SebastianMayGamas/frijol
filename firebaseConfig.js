// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxiI5XTPqYsyNtPLIpcFn79bafzU_JOPk",
  authDomain: "invernaderaofrijolito.firebaseapp.com",
  databaseURL: "https://invernaderaofrijolito-default-rtdb.firebaseio.com/",
  projectId: "invernaderaofrijolito",
  storageBucket: "invernaderaofrijolito.appspot.com",
  messagingSenderId: "258478129006",
  appId: "1:258478129006:web:a6328fba5a57de3bf7cb7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
const database = getDatabase(app);

export { Auth, database, ref, onValue, update };

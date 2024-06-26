import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAP4OyU79d6AFWq3zOFn51VOk84YhhrOlM",
  authDomain: "devtree-f243a.firebaseapp.com",
  projectId: "devtree-f243a",
  storageBucket: "devtree-f243a.appspot.com",
  messagingSenderId: "344089588602",
  appId: "1:344089588602:web:1dafc8c403d31755ee1cc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };


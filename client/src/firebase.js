import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx8MmLoEfOP942CtvdHUEnld2E4-QPYMM",
  authDomain: "react-recipe-ee382.firebaseapp.com",
  projectId: "react-recipe-ee382",
  storageBucket: "react-recipe-ee382.appspot.com",
  messagingSenderId: "801227865851",
  appId: "1:801227865851:web:0098f482702ac49009fa5e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
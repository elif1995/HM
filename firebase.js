// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";

// Other libraries might need to also be prefixed with "compat":
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-Q8S1IVW_Td7wxCqzpzLO6DTRiFsD8kQ",
  authDomain: "homzy-993d1.firebaseapp.com",
  projectId: "homzy-993d1",
  storageBucket: "homzy-993d1.appspot.com",
  messagingSenderId: "923350869149",
  appId: "1:923350869149:web:839e0b59e2062ee2f5a074"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}

const auth = firebase.auth();

export {auth}

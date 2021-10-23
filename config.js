import firebase from "firebase"

require("@firebase/firestore")

const firebaseConfig = {
    apiKey: "AIzaSyCOHbBKTkJxWEaS_pnDle5kfJTh8gAB3u8",
    authDomain: "shoping-app-72798.firebaseapp.com",
    projectId: "shoping-app-72798",
    storageBucket: "shoping-app-72798.appspot.com",
    messagingSenderId: "250733362393",
    appId: "1:250733362393:web:5b75786bd56b3b112312c8"
  };

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
  

export default firebase.firestore()
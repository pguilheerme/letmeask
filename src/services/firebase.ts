import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS3cZc75zAKKLabs6SDz5vMaPxyMawCoY",
  authDomain: "letmeask-740af.firebaseapp.com",
  databaseURL: "https://letmeask-740af-default-rtdb.firebaseio.com",
  projectId: "letmeask-740af",
  storageBucket: "letmeask-740af.appspot.com",
  messagingSenderId: "863096729014",
  appId: "1:863096729014:web:9ef665ce3edaf1e61c2517"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };
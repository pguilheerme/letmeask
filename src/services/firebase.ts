import firebase from 'firebase/compat/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_APP_DATABASE_URL,
    projectId: import.meta.env.VITE_APP_PROJECT_ID ,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET ,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID ,
    appId: import.meta.env.VITE_APP_APP_ID
}   

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth
const database = firebase.database

export {firebase, auth, database}
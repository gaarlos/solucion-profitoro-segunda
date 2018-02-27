// Initialize Firebase
import firebase from 'firebase'

let config = {
  apiKey: 'apiKey',
  databaseURL: 'databaseURL',
  authDomain: 'authDomain',
  storageBucket: 'storageBucket'
}

let firebaseApp

if (firebase.apps.length === 0) {
  firebaseApp = firebase.initializeApp(config)
} else {
  firebaseApp = firebase.apps[0]
}

export default firebaseApp

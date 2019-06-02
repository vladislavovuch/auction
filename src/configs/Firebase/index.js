import * as firebase from "firebase/app";
import 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyDP-bbfVwnM0ugf92BfzSXCjPIHrtuTxPQ',
    // authDomain: '<your-auth-domain>',
    databaseURL: 'https://auction-a1976.firebaseio.com/',
    storageBucket: 'auction-a1976.appspot.com',
    projectId: 'auction-a1976'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

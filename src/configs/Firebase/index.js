import * as firebase from "firebase/app";

const firebaseConfig = {
    apiKey: 'AIzaSyDP-bbfVwnM0ugf92BfzSXCjPIHrtuTxPQ',
    databaseURL: 'https://auction-a1976.firebaseio.com/',
    storageBucket: 'auction-a1976.appspot.com',
    projectId: 'auction-a1976'
};

firebase.initializeApp(firebaseConfig);

export default firebase;

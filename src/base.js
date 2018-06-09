import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyCz_udEcMTjo5fxgm2QBtWFX6MVPNwzw-4",
    authDomain: "catch-of-the-day-andie-l.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-andie-l.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

//named export
export { firebaseApp };

export default base; 
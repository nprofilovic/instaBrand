import * as firebase from 'firebase'
import Rebase from 're-base'

var config = {
    
            apiKey: "AIzaSyBHd5rL293B1TQ10tH4z4xDiEqAvBudHYM",
            authDomain: "instabrand-252aa.firebaseapp.com",
            databaseURL: "https://instabrand-252aa.firebaseio.com",
            storageBucket: "instabrand-252aa.appspot.com",
       
};
const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database())


export {base};
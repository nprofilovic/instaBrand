import * as firebase from 'firebase'

class Firebase {
    static init(){
        firebase.initializeApp({
            apiKey: "AIzaSyBHd5rL293B1TQ10tH4z4xDiEqAvBudHYM",
            authDomain: "instabrand-252aa.firebaseapp.com",
            databaseURL: "https://instabrand-252aa.firebaseio.com",
            storageBucket: "instabrand-252aa.appspot.com",
        });
    }
}

module.exports = Firebase
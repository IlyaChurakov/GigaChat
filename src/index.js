import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import {getStorage} from 'firebase/storage'

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyA3ZbN3c5grMqNbFwjso5LREhBo0MYWlTY",
    authDomain: "portfolio-760c5.firebaseapp.com",
    projectId: "portfolio-760c5",
    storageBucket: "portfolio-760c5.appspot.com",
    messagingSenderId: "687054675115",
    appId: "1:687054675115:web:055b0d8b17be25ca96abee"
});

export const Context = createContext(null)

const auth = firebase.auth();
const firestore = firebase.firestore()

ReactDOM.createRoot(document.getElementById("root")).render(
	<Context.Provider value={{
		firebase,
		auth,
		firestore
	}}>
		<App/>
	</Context.Provider>
)

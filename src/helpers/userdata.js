import {useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {store,auth} from "./initFirebase";
const DATABASE_NAME = "users";
export const getUserData = async (uid)=>{
    const docRef = doc(store,DATABASE_NAME,uid);
    const snapshot = await getDoc(docRef);
    return snapshot.data();
}




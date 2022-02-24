import {useState,useEffect} from "react";
import {doc, getDoc,setDoc} from "firebase/firestore";
import {store,auth} from "./initFirebase";
import useUser from "./useUser";
const DATABASE_NAME = "users";
/**
 * Get the data associated with a user
 */
export const getUserData = async () =>{
    const uid = auth.currentUser.uid;
    const docRef = doc(store,DATABASE_NAME,uid);
    try{
        const snapshot = await getDoc(docRef);
		return snapshot.data();
    }
    catch(e){
        if(_checkLocalDataExists()){
            await setUserData(uid,getCachedLocalData());
            clearLocalData();
            return getUserData();
        }
        else throw e;
    }
}

/** 
 * Set the data associated with a user
 */
export const setUserData = async (data,options) => {
    const docRef = await doc(store,DATABASE_NAME,auth.currentUser.uid);
    await setDoc(docRef,data,options);
}


/**
 * Get the data associated with a user within a React function component
 */
export const useUserData = () =>{
    const user = useUser();
    const [data,setData] = useState(undefined);
    useEffect(() => async ()=>{
        if(user && user.uid){
            setData(await getUserData(user.uid));
        }
		else setData(null);
        }, [user]);
    return data;
}

/**
 * A wrapper function for signing up users while creating the data in firestore.
 * Usage: creatingUserWithData(
      () => createUserWithEmailAndPassword({email,password}),
      {DOB:"15/02/2000"} //extra data to store
      )
 * }
 */
export const creatingUserWithData = async (signupHook, data={}) => {
    cacheLocalData(data);
	console.debug("cache created");
    const user = await signupHook();
	console.debug("user signed in");
    await setUserData(user.uid,data);
    clearLocalData();
}

/**
 * Used as a backup store for failed signups
 */
const cacheLocalData = (data) => {
    window.localStorage.setItem(DATABASE_NAME+"/temp",JSON.stringify(data));
}

const getCachedLocalData = (data) => {
    return JSON.parse(window.localStorage.getItem(DATABASE_NAME+"/temp"));
}

const clearLocalData = (data) => {
    window.localStorage.removeItem(DATABASE_NAME+"/temp");
}

const _checkLocalDataExists = () => {
    return window.localStorage.hasItem(DATABASE_NAME+'/temp');
}

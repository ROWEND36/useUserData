import { useState, useEffect } from "react";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { store, auth } from "./initFirebase";
import useUser from "./useUser";
const DATABASE_NAME = "users";

/**
 * Get the data associated with a user
 */
export const getUserData = async () => {
  if (!auth.currentUser) return null;
  const docRef = doc(store, DATABASE_NAME, auth.currentUser.uid);
  const snapshot = await getDoc(docRef);
  const data = snapshot.data();
  if (_checkLocalDataExists()) {
    if (data === undefined) await setUserData(getCachedLocalData());
    clearLocalData();
    return data === undefined ? getUserData() : data;
  }
  return data;
};

/**
 * Set the data associated with a user
 */
export const setUserData = async (data, options) => {
  const docRef = doc(store, DATABASE_NAME, auth.currentUser.uid);
  await setDoc(docRef, data, options);
};

/**
 * Get the data associated with a user within a React function component
 */
export const useUserData = () => {
  const user = useUser();
  const [data, setData] = useState(undefined);
  useEffect(
    () =>
      (async () => {
        setData(await getUserData(user));
      })(),
    [user]
  );
  return data;
};

/**
 * A wrapper function for signing up users while creating the data in firestore.
 * Usage: creatingUserWithData(
      () => createUserWithEmailAndPassword({email,password}),
      {DOB:"15/02/2000"} //extra data to store
      )
 * }
 */
export const setupUserData = async (data = {}) => {
  cacheLocalData(data);
  await setUserData(data);
  clearLocalData();
};

export const deleteUserData = async () => {
  const docRef = doc(store, DATABASE_NAME, auth.currentUser.uid);
  await deleteDoc(docRef);
};
/**
 * Used as a backup store for failed signups
 */
const cacheLocalData = (data) => {
  window.localStorage.setItem(
    DATABASE_NAME + "/temp-" + auth.currentUser.uid,
    JSON.stringify(data)
  );
};

const getCachedLocalData = (data) => {
  return JSON.parse(
    window.localStorage.getItem(DATABASE_NAME + "/temp-" + auth.currentUser.uid)
  );
};

const clearLocalData = (data) => {
  window.localStorage.removeItem(
    DATABASE_NAME + "/temp-" + auth.currentUser.uid
  );
};

const _checkLocalDataExists = () => {
  return !!window.localStorage.getItem(
    DATABASE_NAME + "/temp-" + auth.currentUser.uid
  );
};

import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./initFirebase";
import {useState,useEffect} from "react";

const useUser = () => {
	const [user,setUser] = useState();
	useEffect(()=>{
		return onAuthStateChanged(auth,(user) => {
			setUser(user);
		});
	},[]);
	return user;
}
export default useUser;

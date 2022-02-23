import './UserDataDemo.css';
import useUser from "./helpers/useUser";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut
} from "firebase/auth";
import {useState} from "react";
import {creatingUserWithData,useUserData} from "./helpers/userdata";

const trackChange = (setData) => {
	return (ev) => setData(ev.target.value);
}

function UserDataDemo() {
	const signedIn = useUser();
	return (
		<div className="App">{signedIn?<SignOut/>:<SignIn/>}</div>
  );
}

function SignOut(){
	const user = useUser();
	const userdata = useUserData();

	const logOut = () => signOut();
	return (<div>
		<h6>{user.email} is a {userdata.gender}</h6>
		<button className="btn" onClick={logOut}>Sign Out</button>
		</div>);
}

function SignIn(){
	const [email,setEmail] = useState();
	const [gender,setGender] = useState();
	const [password,setPassword] = useState();
	const [confirmpassword,setConfirmPassword] = useState();
	const [errorText,setErrorText] = useState();
	const [isNewUser,setNewUser] = useState();
    
    const toggleNewUser = () => setNewUser(!isNewUser);
	
    const proceed = () => {
		if(isNewUser && password !== confirmpassword){
			return setErrorText("Passwords must match");
		}
		if(isNewUser){
			creatingUserWithData(() => createUserWithEmailAndPassword({email,password}),{gender});
		}
		else{
			signInWithEmailAndPassword({email,password});
		}
	}

	return (<div>
		<span className="error-text">{errorText}</span>
		{isNewUser?
			<h6>Already have an account? <button className="btn-flat" onClick={toggleNewUser}>Login</button></h6>
			:
			<h6>Don't have an account? <button className="btn-flat" onClick={toggleNewUser}>Create account</button></h6>
		}
		<input onChange={trackChange(setEmail)} value={email} type="email"/>
		{isNewUser? 
			<select onChange={trackChange(setGender)} value={gender}>
				<option value='male'>Male</option>
				<option value='female'>Female</option>
			</select>
			:undefined}
		<input onChange={trackChange(setPassword)} value={password} type="password"/>
		{isNewUser?
			<input onChange={trackChange(setConfirmPassword)} value={confirmpassword} type="password"/>
			:undefined}
		<button className="btn" onClick={proceed}>Continue</button>
		</div>);
}
export default UserDataDemo;

import './UserDataDemo.css';
import useUser from "./helpers/useUser";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut
} from "firebase/auth";
import {auth} from "./helpers/initFirebase"
import {useState} from "react";
import {creatingUserWithData,useUserData} from "./helpers/userdata";

const trackChange = (setData) => (ev) => {
	setData(ev.target.value);
}
const handleError = (handler) => (e) => {
	console.log(e.stack);
	handler(e.message)
}
function UserDataDemo() {
	const signedIn = useUser();
    return (signedIn?<SignOut/>:<SignIn/>);
}

function SignOut(){
	const user = useUser();
	const userdata = useUserData();
	const logOut = () => signOut();
	return (<div id="container">
		<h6>{user.email} is a {userdata?.gender}</h6>
		<button className="btn" onClick={logOut}>Sign Out</button>
		</div>);
}

function SignIn(){
	const [email,setEmail] = useState("");
	const [gender,setGender] = useState("male");
	const [password,setPassword] = useState("");
	const [confirmpassword,setConfirmPassword] = useState("");
	const [errorText,setErrorText] = useState("");
	const [isNewUser,setNewUser] = useState(true);
    
    const toggleNewUser = () => setNewUser(!isNewUser);
	
	
    const proceed = () => {
		if(isNewUser && password !== confirmpassword){
			return setErrorText("Passwords must match");
		}
		setErrorText("");
		if(isNewUser){
			creatingUserWithData(() => createUserWithEmailAndPassword(auth,email,password),{gender}).catch(handleError(setErrorText));
		}
		else{
			signInWithEmailAndPassword(auth,email,password).catch(handleError(setErrorText));
		}
	}

	return (<div id="container">
		<span className="error-text">{errorText}</span>
		{isNewUser?
			<h6>Already have an account? <button className="btn-flat" onClick={toggleNewUser}>Login</button></h6>
			:
			<h6>Don't have an account? <button className="btn-flat" onClick={toggleNewUser}>Create account</button></h6>
		}
		<label>Email</label>
		<input onChange={trackChange(setEmail)} value={email} type="email"/>
		{isNewUser?<label>Gender</label>:undefined}
		{isNewUser? 
			<select onChange={trackChange(setGender)} value={gender}>
				<option value='male'>Male</option>
				<option value='female'>Female</option>
			</select>
			:undefined}
		<label>Password</label>
		<input onChange={trackChange(setPassword)} value={password} type="password"/>
		{isNewUser?<label>Confirm Password</label>:undefined}
		{isNewUser?
			<input onChange={trackChange(setConfirmPassword)} value={confirmpassword} type="password"/>
			:undefined}
		<button className="btn" onClick={proceed}>Continue</button>
		</div>);
}
export default UserDataDemo;

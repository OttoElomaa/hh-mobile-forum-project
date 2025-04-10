import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import MyGenericButton from "./MyGenericButton";


export default function SignupEmailComp(props) {
	const auth = getAuth();

	const logout = () => {
		auth.signOut()
		// SET USER BACK IN APP - YEAH BIT DUMB BUT IT WORKS
		props.setUser(null)
	}

	return(
		<MyGenericButton function={logout} text="Log out"/>
	)
}
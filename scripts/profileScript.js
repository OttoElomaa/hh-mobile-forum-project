import { getDatabase, ref, push, onValue } from "firebase/database";
import { app } from "../firebaseConfig.js";
import { Alert } from "react-native";

export const updateUserProfile = (user, displayName) => {
	// CONST DEFINITIONS
	const database = getDatabase(app);

	// PUSH TO DATABASE
	if (user && displayName != "") {
		push(ref(database, "profiles/"), {
			uid: user.uid,
			displayName: displayName,
		});
	} else {
		Alert.alert("Error", "Type profile info first");
	}
};

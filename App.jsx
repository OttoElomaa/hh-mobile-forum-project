import { Alert, StyleSheet, Text, View } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles/Styles";

import Chat from "./components/chat";
import SignupEmailComp from "./components/SignupEmailComp";
import LoginComp from "./components/LoginComp";
import SignOutComp from "./components/SignOutComp";

//import AuthListener from "./auth/authStateListener";
import { useEffect, useState } from "react";
import { get, getDatabase, ref } from "firebase/database";

export default function App() {
	const auth = getAuth();
	const database = getDatabase();

	const [user, setUser] = useState(null);

	const [isLoading, setLoading] = useState(null);
	const [errorStr, setErrorStr] = useState("");

	// Function to fetch and set user profile
	const fetchUserProfile = async (uid) => {
		try {
			setLoading(true);

			// Direct Firebase implementation

			const profileRef = ref(database, `profiles/${uid}`);
			const snapshot = await get(profileRef);

			if (snapshot.exists()) {
				setUser(snapshot.val());
			} else {
				setUser(null); // No profile found
			}
			setErrorStr(null);

		} catch (err) {
			Alert.alert("Fetch profile error", err.message)
			setErrorStr("Failed to load profile");
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			
			{user && (
				<View>
					<StatusBar style="auto" />
					<View style={{ height: 20 }} />
					<Text style={styles.myHeader}>This is the message sending app!</Text>
					<Text>Welcome {user.displayName}</Text>
					<SignOutComp setUser={setUser} />

					<View style={{ height: 20 }} />

					<Chat />
					<View style={{ height: 20 }} />
				</View>
			)}

			{!user && (
				<View>
					<StatusBar style="auto" />
					<View style={{ height: 20 }} />
					<Text style={styles.myHeader}>This is the message sending app!</Text>
					<SignupEmailComp setUser={fetchUserProfile} />
					<View style={{ height: 20 }} />
					<LoginComp setUser={fetchUserProfile} />

					<View style={{ height: 20 }} />
				</View>
			)}
		</SafeAreaView>
	);
}

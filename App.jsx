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
import { Appbar } from "react-native-paper";

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
			Alert.alert("Fetch profile error", err.message);
			setErrorStr("Failed to load profile");
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<SafeAreaView style={styles.container}>
				<StatusBar style="auto" />
				<Appbar>
					<View style={[styles.spaceEvenly]}>
						<Text style={styles.myHeader}>Message App</Text>{" "}
						<View>{user && <Text>Welcome {user.displayName}</Text>}</View>
					</View>
				</Appbar>

				{/* LOGGED IN VIEW */}
				{user && (
					<View style={[styles.spaceEvenly]}>
						<SignOutComp setUser={setUser} />
						<Chat user={user} />
					</View>
				)}

				{/* LOGGED OUT VIEW */}
				{!user && (
					<>
						<View style={styles.spaceEvenly}>
							<View style={{ height: 20 }} />
							<SignupEmailComp setUser={fetchUserProfile} />
							<View style={{ height: 20 }} />
							<LoginComp setUser={fetchUserProfile} />

							<View style={{ height: 20 }} />
						</View>
						<View style={styles.spaceEvenly} />
					</>
				)}
			</SafeAreaView>
		</>
	);
}

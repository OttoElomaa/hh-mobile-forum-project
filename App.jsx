import { StyleSheet, Text, View } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles/Styles";

import Chat from "./components/chat";
import SignupEmailComp from "./components/SignupEmailComp";
import LoginComp from "./components/LoginComp";
import SignOutComp from "./components/SignOutComp";

import AuthListener from "./auth/authStateListener";
import { useEffect, useState } from "react";

export default function App() {
	const auth = getAuth();

	const [user, setUser] = useState(null);

	
	if (user) {
		return (
			<SafeAreaView style={styles.container}>
				<View>
					<StatusBar style="auto" />
					<View style={{ height: 20 }} />
					<Text style={styles.myHeader}>This is the message sending app!</Text>
					<Text>Welcome {user.email}</Text>
					<SignOutComp   setUser={setUser}/>

					<View style={{ height: 20 }} />

					<Chat />
					<View style={{ height: 20 }} />
				</View>
			</SafeAreaView>
		);
	} else {
		return (
			<SafeAreaView style={styles.container}>
				<View>
					<StatusBar style="auto" />
					<View style={{ height: 20 }} />
					<Text style={styles.myHeader}>This is the message sending app!</Text>
					<SignupEmailComp    setUser={setUser}/>
					<View style={{ height: 20 }} />
					<LoginComp  setUser={setUser}/>

					<View style={{ height: 20 }} />
				</View>
			</SafeAreaView>
		);
	}
}

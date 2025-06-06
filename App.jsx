import { Alert, StyleSheet, Text, View } from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import { get, getDatabase, ref } from "firebase/database";
import {
	getAuth,
	createUserWithEmailAndPassword,
	initializeAuth,
	getReactNativePersistence,
} from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {auth, database} from "./firebaseConfig"

import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import {
	createStaticNavigation,
	NavigationContainer,
} from "@react-navigation/native";

import styles from "./styles/Styles";

import Chat from "./components/chat";
import SignupEmailComp from "./components/SignupEmailComp";
import LoginComp from "./components/LoginComp";
import SignOutComp from "./components/SignOutComp";
import ChatListComp from "./components/ChatsListComp";
import ProfileScreen from "./components/ProfileScreen";

import { Appbar } from "react-native-paper";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

export const UserContext = createContext({
	user: null,
	setUser: () => {}, // Add setUser to context
});

export default function App() {



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

	const MyTabs = createBottomTabNavigator({
		// Source: Reactnavigation. Customizing Bottom Tab Bar.
		// Linkki: https://reactnavigation.org/docs/customizing-tabbar?config=static
		screenOptions: ({ route }) => ({
			tabBarIcon: ({ focused, color, size }) => {
				let iconName;

				if (route.name === "Chat") {
					iconName = "chatbubble";
				} else if (route.name === "ChatList") {
					iconName = "chatbubbles";
				} else if (route.name === "Profile") {
					iconName = "person";
				}
				// You can return any component that you like here!
				return <Ionicons name={iconName} size={size} color={color} />;
			},
		}),

		screens: {
			ChatList: {
				screen: ChatListComp,
			},
			Chat: {
				screen: Chat,
			},
			Profile: {
				screen: ProfileScreen,
			},
		},
	});

	const Navigation = createStaticNavigation(MyTabs);

	const userContextValues = {
		user,
		setUser,
	};

	return (
		<>
			<StatusBar style="auto" />

			{/* LOGGED IN VIEW */}
			<UserContext.Provider value={userContextValues}>
				{user && <Navigation />}
			</UserContext.Provider>

			{/* LOGGED OUT VIEW */}
			{!user && (
				<SafeAreaView style={styles.container}>
					<View style={styles.spaceEvenly}>
						<View style={{ height: 20 }} />
						<SignupEmailComp setUser={fetchUserProfile} />
						<View style={{ height: 20 }} />
						<LoginComp setUser={fetchUserProfile} />

						<View style={{ height: 20 }} />
					</View>
					<View style={styles.spaceEvenly} />
				</SafeAreaView>
			)}
		</>
	);
}

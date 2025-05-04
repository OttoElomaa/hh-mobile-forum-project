import { useContext, useEffect, useState } from "react";
import { Alert, Button, FlatList, Text, TextInput, View } from "react-native";

import dayjs from "dayjs";

import { app } from "../firebaseConfig.js";
import { getDatabase, ref, push, onValue } from "firebase/database";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";

import styles from "../styles/Styles";
import MyGenericButton from "./MyGenericButton";
import { UserContext } from "../App.jsx";

export default function Chat() {
	// CONST DEFINITIONS
	const database = getDatabase(app);
	const navigation = useNavigation();
	const {user, setUser} = useContext(UserContext);

	const [newChat, setNewChat] = useState({
		chatTitle: "",
		date: dayjs,
		userId: "",
		userName: "",
	});

	//SAVE -> PUSH MESSAGE TO FIREBASE
	const handleSave = () => {
		if (newChat.chatTitle) {
			push(ref(database, "chats/"), newChat);
		} else {
			Alert.alert("Error", "Type chat title first");
		}
	};

	return (
		<>
			<Text style={styles.myHeader}>New component</Text>

			<TextInput
				placeholder="Chat Name"
				onChangeText={(text) =>
					setNewChat({
						...newChat,
						chatTitle: text,
						userId: user.userId,
						userName: user.displayName,
						date: dayjs().toJSON(),
					})
				}
				value={newChat.chatTitle}
			/>

			<MyGenericButton function={handleSave} text="Send" />
		</>
	);
}

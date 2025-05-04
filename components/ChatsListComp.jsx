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
	const { user, setUser } = useContext(UserContext);

	const [newChat, setNewChat] = useState({
		chatTitle: "",
		date: dayjs,
		userId: "",
		userName: "",
	});
	const [chats, setChats] = useState([]);

	//SAVE -> PUSH MESSAGE TO FIREBASE
	const handleSave = () => {
		if (newChat.chatTitle) {
			push(ref(database, "chats/"), newChat);
		} else {
			Alert.alert("Error", "Type chat title first");
		}
	};

	// THIS READS MESSAGES FROM DATABASE?
	// Execute onValue inside the useEffect
	useEffect(() => {
		const itemsRef = ref(database, "chats/");
		onValue(itemsRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				setChats(Object.values(data));
			} else {
				setChats([]); // Handle the case when there are no items
			}
		});
	}, []);

	return (
		<>
			<Appbar>
				<View>
					{user != undefined && <Text>Welcome {user.displayName}</Text>}
				</View>
			</Appbar>

			{/*List showing each message in chat*/}
			<FlatList
				style={styles.myList}
				renderItem={({ item }) => (
					<>
						<View style={styles.listItem}>
							<Text style={{ fontSize: 18 }}>
								{item.userName}
								{"      "} {dayjs(item.date).format("DD.MM HH:mm")}
							</Text>
							<Text style={{ fontSize: 18 }}>{item.chatTitle}</Text>
						</View>
						<View style={{ height: 10 }} />
					</>
				)}
				data={chats}
			/>

			<TextInput
				placeholder="New Chat Name"
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

			<MyGenericButton function={handleSave} text="Create New Chat" />
		</>
	);
}

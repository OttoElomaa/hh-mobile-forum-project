import { useContext, useEffect, useState, useId } from "react";
import {  } from 'react';
import {
	Alert,
	Button,
	FlatList,
	Pressable,
	Text,
	TextInput,
	View,
} from "react-native";

import dayjs from "dayjs";

import { app } from "../firebaseConfig.js";
import { getDatabase, ref, push, onValue } from "firebase/database";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";

import styles from "../styles/Styles";
import MyGenericButton from "./MyGenericButton";

import { UserContext } from "../App.jsx";
import Ionicons from "react-native-vector-icons/Ionicons";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';




export default function Chat() {
	// CONST DEFINITIONS
	const database = getDatabase(app);
	const navigation = useNavigation();
	const { user, setUser } = useContext(UserContext);

	const [newChat, setNewChat] = useState({
		chatId: uuidv4(),  //This is a unique id
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
						<Pressable onPress={() => navigation.navigate('Chat', {chatId: item.chatId})}>
							<View style={styles.listItem}>
								<View style={styles.row}>
									<Text style={styles.listItemTitle}>{item.chatTitle}</Text>
									<Text style={{ fontSize: 15 }}>
										{dayjs(item.date).format("DD.MM HH:mm")}
									</Text>
									<Ionicons
										name="arrow-forward"
										size={20}
										color="black"
										style={{ marginLeft: 30 }}
									/>
								</View>
								<Text style={{ fontSize: 18 }}>Started by {item.userName}</Text>
							</View>
						</Pressable>
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

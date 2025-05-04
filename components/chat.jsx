import { useContext, useEffect, useState } from "react";
import { Alert, Button, FlatList, Pressable, Text, TextInput, View } from "react-native";

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

import ChatListComp from "./ChatsListComp.jsx";

export default function Chat() {
	// CONST DEFINITIONS
	const database = getDatabase(app);
	const navigation = useNavigation();

	const [messages, setMessages] = useState([]);
	const { user, setUser } = useContext(UserContext);

	const [message, setMessage] = useState({
		mText: "",
		date: dayjs,
		userId: "",
		userName: "",
		title: "",
	});

	//SAVE -> PUSH MESSAGE TO FIREBASE
	const handleSave = () => {
		if (message.title && message.mText) {
			push(ref(database, "messages/"), message);
		} else {
			Alert.alert("Error", "Type message text first");
		}
	};

	// THIS READS MESSAGES FROM DATABASE?
	// Execute onValue inside the useEffect
	useEffect(() => {
		const itemsRef = ref(database, "messages/");
		onValue(itemsRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				setMessages(Object.values(data));
			} else {
				setMessages([]); // Handle the case when there are no items
			}
		});
	}, []);

	return (
		<>
			<Appbar>
				<Pressable>
				<Ionicons name="arrow-back" size={20} color="black" />
					<Text>Back to Chats</Text>
				</Pressable>
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
							<Text style={{ fontSize: 18 }}>{item.mText}</Text>
						</View>
						<View style={{ height: 10 }} />
					</>
				)}
				data={messages}
			/>

			{/*Here user types message*/}

			<TextInput
				placeholder="Message Text"
				onChangeText={(text) =>
					setMessage({
						...message,
						mText: text,
						title: "re: conversation",
						userId: user.userId,
						userName: user.displayName,
						date: dayjs().toJSON(),
					})
				}
				value={message.mText}
			/>

			<MyGenericButton function={handleSave} text="Send" />
		</>
	);
}

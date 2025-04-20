import { useEffect, useState } from "react";
import { Alert, Button, FlatList, Text, TextInput, View } from "react-native";

import dayjs from "dayjs";

import { app } from "../firebaseConfig.js";
import { getDatabase, ref, push, onValue } from "firebase/database";

import styles from "../styles/Styles";
import MyGenericButton from "./MyGenericButton";

export default function Chat(props) {
	// CONST DEFINITIONS
	const database = getDatabase(app);
	const [messages, setMessages] = useState([]);

	const [message, setMessage] = useState({
		mText: "",
		date: dayjs,
		userId:"",
		userName:"",
		title: "",
	});

	//SAVE -> PUSH MESSAGE TO FIREBASE
	const handleSave = () => {
		if (message.title && message.mText) {
			push(ref(database, "messages/"), message);
		} else {
			Alert.alert("Error", "Type product and amount first");
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
			{/*List showing each message in chat*/}
			<FlatList
				renderItem={({ item }) => (
					<>
						<View style={styles.listItem}>
							<Text style={{ fontSize: 18 }}>
								{" "}
								{item.userName} {dayjs(item.date).format("DD.MM HH:mm")}
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
						userName: props.user.displayName,
						date: dayjs().toJSON(),
					})
				}
				value={message.mText}
			/>

			<MyGenericButton function={handleSave} text="Send" />
		</>
	);
}

import { app } from "../firebaseConfig.js";
import { getDatabase, ref, push, onValue } from "firebase/database";
import styles from "../styles/Styles";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, Text, TextInput, View } from "react-native";

export default function Chat() {
	// CONST DEFINITIONS
	const database = getDatabase(app);
	const [messages, setMessages] = useState([]);

	const [message, setMessage] = useState({
		title: "",
		mText: "",
	});

	//SAVE -> PUSH MESSAGE TO FIREBASE
	const handleSave = () => {
		if (message.title && message.mText) {
			push(ref(database, "messages/"), message);
		} else {
			Alert.alert("Error", "Type product and amount first");
		}
	};

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
			<View style={styles.container}>
				<TextInput
					placeholder="Title"
					onChangeText={(text) => setMessage({ ...message, title: text })}
					value={message.title}
				/>
				<TextInput
					placeholder="Message Text"
					onChangeText={(text) => setMessage({ ...message, mText: text })}
					value={message.mText}
				/>
				<Button onPress={handleSave} title="Save" />

				<FlatList
					renderItem={({ item }) => (
						<View style={styles.listItem}>
							<Text style={{ fontSize: 18 }}>
								{item.title}
							</Text>
							<Text style={{ fontSize: 18 }}>
								{item.mText}
							</Text>
						</View>
					)}
					data={messages}
				/>
			</View>
		</>
	);
}

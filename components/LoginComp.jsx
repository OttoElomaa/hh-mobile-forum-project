import { useEffect, useState } from "react";
import {
	Alert,
	Button,
	FlatList,
	Modal,
	Text,
	TextInput,
	View,
} from "react-native";

import {
	getAuth,
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	getReactNativePersistence,
} from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../styles/Styles";
import modalStyles from "../styles/modalStyles.js";
import MyGenericButton from "./MyGenericButton";

export default function LoginComp(props) {
	const auth = getAuth();
	// PERSISTENCE FIX: franjuju and Mark Peschel. Firebase V9 - "INTERNAL ASSERTION FAILED: Expected a class definition" on React Native app. Stack Overflow. 
	// Link: https://stackoverflow.com/questions/76748402/firebase-v9-internal-assertion-failed-expected-a-class-definition-on-react
	const localPersistence = getReactNativePersistence(ReactNativeAsyncStorage);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const loginEmail = (email, password) => {
		setPersistence(auth, localPersistence)
			.then(() => {
				// Existing and future Auth states are now persisted in the current session only.
				// Closing the window would clear any existing state even if a user forgets to sign out.
				// New sign-in will be persisted with session persistence.
				return signInWithEmailAndPassword(auth, email, password);
			})
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// SET USER BACK IN APP - YEAH BIT DUMB BUT IT WORKS
				props.setUser(user.uid);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				Alert.alert("Login error! ", error.message);
			});
	};

	const [modalVisible, setModalVisible] = useState(false);
	const showModal = () => setModalVisible(true);
	const hideModal = () => {
		setModalVisible(false);
		loginEmail(email, password);
	};

	return (
		<>
			<Modal
				animationType="slide"
				transparent={false}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.spaceEvenly}>
					<Text>Give account info to login</Text>

					<TextInput
						placeholder="Type email"
						onChangeText={(text) => setEmail(text)}
						value={email}
					/>
					<TextInput
						placeholder="Type password"
						onChangeText={(text) => setPassword(text)}
						value={password}
					/>

					<MyGenericButton function={hideModal} text="Log me in" />
				</View>
				<View style={styles.spaceEvenly} />
			</Modal>

			<MyGenericButton function={showModal} text="Login" />
		</>
	);
}

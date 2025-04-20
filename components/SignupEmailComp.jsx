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

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import styles from "../styles/Styles";
import modalStyles from "../styles/modalStyles.js";
import MyGenericButton from "./MyGenericButton";

import { updateUserProfile } from "../scripts/profileScript.js";

export default function SignupEmailComp(props) {
	const auth = getAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [displayName, setDisplayName] = useState("");

	const signupWithEmail = (email, password) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed up
				console.log(userCredential);
				const user = userCredential.user;
				updateUserProfile(user, displayName);

				// SET USER BACK IN APP - YEAH BIT DUMB BUT IT WORKS
				props.setUser(user.uid);
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage)
				Alert.alert(errorCode, errorMessage)
				// ..
			});
	};

	const [modalVisible, setModalVisible] = useState(false);
	const showModal = () => setModalVisible(true);
	const hideModal = () => {
		setModalVisible(false);
		signupWithEmail(email, password);
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
				<View style={styles.container}>
					<Text>Give info to create account</Text>

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

					<TextInput
						placeholder="Type display name"
						onChangeText={(text) => setDisplayName(text)}
						value={displayName}
					/>

					<MyGenericButton function={hideModal} text="Send Signup Request" />
				</View>
			</Modal>

			<MyGenericButton function={showModal} text="Sign up" />
		</>
	);
}

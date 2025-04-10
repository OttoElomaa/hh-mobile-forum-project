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

import dayjs from "dayjs";

import { app } from "../firebaseConfig.js";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import styles from "../styles/Styles";
import modalStyles from "../styles/modalStyles.js";
import MyGenericButton from "./MyGenericButton";

import { useForm, SubmitHandler } from "react-hook-form";

/* type Inputs = {
  example: string
  exampleRequired: string
} */

export default function SignupEmailComp() {
	const auth = getAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signupWithEmail = (email, password) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed up
				const user = userCredential.user;
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
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

				<Text>Hello World!</Text>
				<MyGenericButton function={hideModal} text="Send Signup Request" />
			</Modal>

			<MyGenericButton function={showModal} text="Sign up" />
		</>
	);

	return (
		<>
			<MyGenericButton function={signupWithEmail} text="Sign Up" />
		</>
	);
}

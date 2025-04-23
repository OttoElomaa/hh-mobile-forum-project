import { useContext, useState } from "react";
import SignOutComp from "../components/SignOutComp";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../styles/Styles";
import { UserContext } from '../App.jsx'; 


export default function ProfileScreen() {
	const navigation = useNavigation();
	const {user, setUser} = useContext(UserContext);

	return (
		<SafeAreaView style={styles.container}>
			<SignOutComp setUser={setUser} />
		</SafeAreaView>
	);
}

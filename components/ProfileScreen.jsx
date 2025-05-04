import { useContext, useState } from "react";
import SignOutComp from "../components/SignOutComp";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../styles/Styles";
import { UserContext } from '../App.jsx'; 
import { Text, View } from "react-native";


export default function ProfileScreen() {
	const navigation = useNavigation();
	const {user, setUser} = useContext(UserContext);

	return (
		<>
		<View style={styles.spaceEvenly}>
		<Text>User: {user.displayName}</Text>

			<SignOutComp setUser={setUser} />
			</View>
			<View style={{height:80}}/>
		</>
	);
}

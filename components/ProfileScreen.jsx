import { useContext, useState } from "react";
import SignOutComp from "../components/SignOutComp";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ProfileScreen() {
	const navigation = useNavigation();
	const SetUserContext = useContext(SetUserContext);

	return (
		<SafeAreaView style={styles.container}>
			<SignOutComp setUser={setUser} />
		</SafeAreaView>
	);
}

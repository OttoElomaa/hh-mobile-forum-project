import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Chat from "./components/chat";
import styles from "./styles/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import SignupEmailComp from "./components/SignupEmailComp";

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<StatusBar style="auto" />
				<View style={{ height: 20 }} />
				<Text style={styles.myHeader}>This is the message sending app!</Text>
        <SignupEmailComp/>

				<View style={{ height: 20 }} />

				<Chat />
				<View style={{ height: 20 }} />
			</View>
		</SafeAreaView>
	);
}

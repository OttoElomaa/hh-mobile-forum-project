import { Pressable, Text, StyleSheet, Alert } from 'react-native';

import styles from '../styles/Styles'


export default function MyGenericButton(props) {


	const buttonPressed = () => {
		Alert.alert("Button 1 pressed");
	};


	return (
		<Pressable
			style={
				({ pressed }) =>
					[
						styles.button, styles.margin1,
						{ backgroundColor: pressed ? 'darkred' : 'orange' },
					]}
			onPress={props.function}
		>
			<Text style={styles.buttonText}>{props.text}</Text>
		</Pressable>
	);
}





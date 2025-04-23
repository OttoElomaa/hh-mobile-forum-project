import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "90%",

		margin:"auto",
		marginBottom: 20,

		alignItems: "center",
		flexDirection: "column", // Column is default
		backgroundColor: "white",
	},
	spaceEvenly: {
		flex: 1,
		width: "100%",
		justifyContent: "space-evenly",
	},
	row: {
		flexDirection: "row",
	},

	myHeader: {
		fontSize: 20,
		color: "blue",
		fontWeight: "bold",
	},

	myInputField: {
		borderWidth: 1, // Light gray border
		borderColor: "lightgray",
		fontSize: 16, // Good size for mobile screens
		paddingVertical: 10, // Vertical padding
		paddingHorizontal: 15, // Horizontal padding
		borderRadius: 8, // Slightly rounded corners
		width: "100%", // Responsive width
		backgroundColor: "#fff", // Background color for input
	},

	margin1: {
		marginHorizontal: 5, // Vertical padding
		marginVertical: 0, // Horizontal padding
	},

	flexItem1: { flex: 1 },

	button: {
		borderRadius: 25,
		paddingVertical: 10,
		paddingHorizontal: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 22,
		fontWeight: "bold",
	},
	listItem: {
		justifyContent: "center",
		alignItems: "center",

		paddingVertical: 10,
		paddingHorizontal: 20,

		borderRadius: 25, // CORNERS PRETTIER
		backgroundColor: "#f0f0f0",
	},

	myPicker: {
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#575959",
		borderStyle: "solid",
		width: 200,
	},
});

export default styles;

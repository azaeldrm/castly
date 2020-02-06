import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Block, Text} from "galio-framework";
import firebase from "firebase";

import Colors from "../constants/Themes";

let THEMESTYLE = "dark";

export default class Loading extends React.Component {

	user = firebase.auth().currentUser;

	logOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				console.log("Log out successfully.");
			})
			.catch((error) => {
				console.log(`LOG OUT ERROR: ${error}`)
			})
		}

	render() {
		return (
			<Block flex={1} style={{alignSelf: 'center', width: '100%', backgroundColor: theme.background}}>
				<Block style={{height: 24}} />
				<Block
					style={{marginHorizontal: 40, paddingTop: 30, paddingBottom: 50}}
				>
					<Text h3 style={{color: theme.info}}>
						Hi {this.user.displayName}!
					</Text>
					<Text style={[{color: theme.info}, vars.subtitleText]}>
						Explore and make changes to your settings:
					</Text>
				</Block>
				<Block
					style={{marginHorizontal: 40, paddingTop: 30, paddingBottom: 50}}
				>
					<TouchableOpacity
						style={{paddingVertical: 20}}
						onPress={() => {this.props.navigation.navigate("SettingsPrediction")}}
					>
						<Text h3 style={[{color: theme.info}, vars.infoText]}>
							Prediction preferences
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{paddingVertical: 20}}
						onPress={() => {this.props.navigation.navigate("SettingsPersonal")}}
					>
						<Text h3 style={[{color: theme.info}, vars.infoText]}>
							Personal information
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{paddingVertical: 20}}
						onPress={() => {this.props.navigation.navigate("SettingsNotifs")}}
					>
						<Text h3 style={[{color: theme.info}, vars.infoText]}>
							Notifications
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{paddingVertical: 20}}
						onPress={() => this.logOut()}
					>
						<Text h3 style={[{color: theme.info, marginBottom: 30}, vars.infoText]}>
							Log out
						</Text>
					</TouchableOpacity>
				</Block>

			</Block>
		);
	}
}

const theme = THEMESTYLE === "dark" ? Colors.dark : Colors.light;

const vars = {
	subtitleText: {
		fontSize: 12,
		color: theme.subtitle
	},
	infoText: {
		fontSize: 18,
		color: theme.info
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});

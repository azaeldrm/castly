import React from "react";
import {
	ScrollView,
	StyleSheet,
	ImageBackground,
	SafeAreaView,
	widthNavigation,
	Dimensions
} from "react-native";
import {Block, Text, Button, Icon, Input} from "galio-framework";
import {Video} from "expo-av";

let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_HEIGHT = Dimensions.get('window').height;

export default class SplashScreen extends React.Component {
	render() {
		return (
			<Block flex>
				<Video
					source={require("../assets/videos/clouds2.mp4")}
					rate={1.25}
					isMuted={true}
					resizeMode="cover"
					shouldPlay
					isLooping
					style={styles.backgroundVideo}
				/>
				<Block flex>
					<Block flex={4} style={{marginTop: 100, marginHorizontal: 40}}>
						<Text h3 color="rgb(255, 255, 255)">
							castly.
						</Text>
						<Text p color="rgb(255, 255, 255)" style={{marginBottom: 40}}>
							Find the best time to shoot outdoors.
						</Text>
					</Block>

					<Block row center flex>
						<Button
							size="small"
							radius={0}
							styles={{elevation: 0}}
							color="rgba(0, 0, 0, 0)"
							onPress={() => this.props.navigation.navigate("Login")}
						>
							LOG IN
						</Button>
						<Button
							size="small"
							radius={0}
							buttonStyle={{elevation: 0}}
							color="rgba(0, 0, 0, 0)"
							onPress={() => this.props.navigation.navigate("SignUp")}
						>
							SIGN UP
						</Button>
					</Block>
				</Block>
			</Block>
		);
	}
}

SplashScreen.navigationOptions = {
	header: null
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: "#fff"
	},
	backgroundVideo: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		height: SCREEN_HEIGHT,
		width: SCREEN_WIDTH
	}
});

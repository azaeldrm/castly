import React from "react";
import {
	ScrollView,
	StyleSheet,
	ImageBackground,
	SafeAreaView
} from "react-native";
import {Block, Text, Button, Icon, Input, NavBar} from "galio-framework";
import firebase from "firebase";

export default class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errorMessage: null
		};
	}

	Login = (email, password) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				this.props.navigation.navigate("Main");
			})
			.catch(error => {
				this.setState({
					errorMessage: error.message
				});
				console.log(this.state.errorMessage);
			});
	};

	render() {
		return (
			<ImageBackground
				source={require("../assets/images/backgrounds/cloudy1.jpg")}
				style={styles.imageBackground}
			>
				<Block flex>
					<Block flex={2.5} style={{marginTop: 100, marginHorizontal: 40}}>
						<Text h3 color="rgb(255, 255, 255)">
							Welcome back!
						</Text>
						<Text p color="rgb(255, 255, 255)" style={{marginBottom: 60}}>
							Log in using your email and password.
						</Text>
						<Input
							rounded
							borderless={true}
							bgColor="rgba(255, 255, 255, 0.2)"
							color="rgb(255, 255, 255)"
							type="email-address"
							placeholderTextColor="rgb(220, 220, 220)"
							autoCapitalize="none"
							placeholder="Email"
							onChangeText={email => this.setState({email})}
						/>
						<Input
							rounded
							borderless={true}
							bgColor="rgba(255, 255, 255, 0.2)"
							color="rgb(255, 255, 255)"
							placeholderTextColor="rgb(220, 220, 220)"
							password
							placeholder="Password"
							onChangeText={password => this.setState({password})}
						/>
						{this.state.errorMessage && (
							<Text p center color="rgb(227, 79, 79)" style={{marginTop: 20}}>
								{this.state.errorMessage}
							</Text>
						)}
					</Block>
					<Block flex center>
						<Text p
							color="rgb(255, 255, 255)"
							onPress={() =>
								this.Login(
									this.state.email,
									this.state.password
								)
							}
							style={{marginVertical: 30}}
						>
							LOG IN
						</Text>
						<Text
							p
							color="rgb(255, 255, 255)"
							onPress={() => this.props.navigation.navigate("SignUp")}
							style={{marginTop: 20, marginBottom: 60}}
						>
							Don't have an account? Sign up!
						</Text>
					</Block>

					{/*<Block center style={{marginHorizontal: 20}}>
                <Text p color="rgb(255, 255, 255)" style={{marginBottom: 10}}>
                  Or sign up using your favorite platform!
                </Text>
                <Block row>
                  <Button
                    color="rgb(78, 144, 228)"
                    style={{flex: 1, marginRight: 10}}
                  >
                    <Icon
                      name="google"
                      family="Zocial"
                      color="rgb(255, 255, 255)"
                      size={20}
                    />
                  </Button>
                  <Button
                    color="rgb(228, 78, 78)"
                    style={{flex: 1, marginLeft: 10}}
                  >
                    <Icon
                      name="google"
                      family="Zocial"
                      color="rgb(255, 255, 255)"
                      size={20}
                    />
                  </Button>
                </Block>
              </Block>*/}
				</Block>
			</ImageBackground>
		);
	}
}

LoginScreen.navigationOptions = {
	headerTransparent: true
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: "#fff"
	},
	imageBackground: {
		flex: 1,
		resizeMode: "cover",
		width: "100%",
		height: "100%"
	}
});

import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Block, Text, Card, Icon} from "galio-framework";

import Header from "../components/Header";

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errorMessage: null
		};
	}

	render() {
		return (
			<Block flex>
				{/*Introduction block*/}
				{/*<Header title='Dashboard'/>*/}
				<Block flex={0.4} style={{marginTop: 50, marginHorizontal: 40}}>
					<Text h3 color="rgb(0, 0, 0)">
						Welcome Azael!
					</Text>
					<Text p color="rgb(0, 0, 0)">
						These are the stats for your location:
					</Text>
				</Block>

				{/*Main block*/}
				<ScrollView style={{flex: 1}}>
					<Block flex={2}>
						<Block row style={{marginHorizontal: 20, marginBottom: 40}}>
							<Block flex={1} center>
								<Ionicons
									name="md-information-circle"
									size={30}
									style={{marginLeft: 30}}
									color="rgb(0, 0, 0)"
								/>
							</Block>
							<Block flex={4} center>
								<Text p>The temperature is 70F</Text>
							</Block>
						</Block>
						<Block row style={{marginHorizontal: 20, marginBottom: 40}}>
							<Block flex={1} center>
								<Ionicons
									name="md-information-circle"
									size={30}
									style={{marginLeft: 30}}
									color="rgb(0, 0, 0)"
								/>
							</Block>
							<Block flex={4} center>
								<Text p>The temperature is 70F</Text>
							</Block>
						</Block>
						<Block row style={{marginHorizontal: 20, marginBottom: 40}}>
							<Block flex={1} center>
								<Ionicons
									name="md-information-circle"
									size={30}
									style={{marginLeft: 30}}
									color="rgb(0, 0, 0)"
								/>
							</Block>
							<Block flex={4} center>
								<Text p>The temperature is 70F</Text>
							</Block>
						</Block>
						<Block row style={{marginHorizontal: 20, marginBottom: 40}}>
							<Block flex={1} center>
								<Ionicons
									name="md-information-circle"
									size={30}
									style={{marginLeft: 30}}
									color="rgb(0, 0, 0)"
								/>
							</Block>
							<Block flex={4} center>
								<Text p>The temperature is 70F</Text>
							</Block>
						</Block>
						<Block row style={{marginHorizontal: 20, marginBottom: 40}}>
							<Block flex={1} center>
								<Ionicons
									name="md-information-circle"
									size={30}
									style={{marginLeft: 30}}
									color="rgb(0, 0, 0)"
								/>
							</Block>
							<Block flex={4} center>
								<Text p>The temperature is 70F</Text>
							</Block>
						</Block>
						<Block row style={{marginHorizontal: 20, marginBottom: 40}}>
							<Block flex={1} center>
								<Ionicons
									name="md-information-circle"
									size={30}
									style={{marginLeft: 30}}
									color="rgb(0, 0, 0)"
								/>
							</Block>
							<Block flex={4} center>
								<Text p>The temperature is 70F</Text>
							</Block>
						</Block>
						<Block row style={{marginHorizontal: 20, marginBottom: 40}}>
							<Block flex={1} center>
								<Ionicons
									name="md-information-circle"
									size={30}
									style={{marginLeft: 30}}
									color="rgb(0, 0, 0)"
								/>
							</Block>
							<Block flex={4} center>
								<Text p>The temperature is 70F</Text>
							</Block>
						</Block>
					</Block>
				</ScrollView>
			</Block>
		);
	}
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

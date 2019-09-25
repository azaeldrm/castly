import React from "react";
import {ScrollView, StyleSheet, View, Keyboard, Dimensions} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Block, Text, Card, Icon} from "galio-framework";
import {
	VictoryChart,
	VictoryGroup,
	VictoryLine,
	VictoryScatter,
	VictoryTooltip,
	VictoryVoronoiContainer,
	VictoryBar,
	Bar,
	VictoryAxis
} from "victory-native";

import Header from "../components/Header";

let THEMESTYLE = 'dark';

export default class DetailsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const predictionObject = this.props.navigation.state.params;

		var sentence = `The algorithm recommends you do outdoor photography at this location `
		for (time in predictionObject.forecast[0].optimalTime) {
			console.log(time)
			if (time ==! 0) {
				sentence += ", and ";
			}
			if (predictionObject.forecast[0].optimalTime[time].to === null) {
				sentence += `at ${predictionObject.forecast[0].optimalTime[time].from}`;
			} else {
				sentence += `between ${
					predictionObject.forecast[0].optimalTime[time].from
				} and ${predictionObject.forecast[0].optimalTime[time].to}`;
			}
		}
		sentence += ' for best results.'

		return (
			<Block flex style={{backgroundColor: theme.background}}>
				{/*Introduction block*/}
				<Header title="More details" textStyle={{color: theme.info}}/>

				{/*Main block*/}
				<Block
					style={{
						marginTop: 10,
						marginHorizontal: 40,
						justifyContent: "flex-end"
					}}
				>
					<Text h4 style={{textAlign: "center", color: theme.info}}>
						{predictionObject.location}
					</Text>
				</Block>
				<Block
					backgroundColor={"rgba(0, 0, 0, 0)"}
					center
					style={{width: "100%"}}
				>
					<Block style={{width: "100%", backgroundColor: "rgba(0, 255, 0, 0)"}}>
						<Block center style={{backgroundColor: "rgba(201, 131, 195, 0)"}}>
							<VictoryChart
								width={vars.labelWidth}
								height={vars.labelHeight}
								style={{parent: {backgroundColor: theme.container}}}
								maxDomain={{y: 1.1}}
								containerComponent={
									<VictoryVoronoiContainer voronoiDimension="x" />
								}
							>
								<VictoryLine
									data={predictionObject.forecast[0].optimalPair}
									interpolation={"monotoneX"}
									labels={({datum}) =>
										`At ${datum.hour}, conditions are ${Math.floor(datum.value * 100)}% optimal`
									}
									x="time"
									y="value"
									y0={() => 0}
									range={{y: [-0.05, 2]}}
									// domainPadding={[0.25, 0.25]}
									style={{
										data: {
											stroke: "rgb(217, 204, 91)",
											strokeWidth: 3,
											strokeLinecap: "round"
										}
									}}
									labelComponent={
										<VictoryTooltip
											constrainToVisibleArea
											center={{x: vars.labelWidth / 2, y: 24}}
											fontSize={6}
											style={{fill: theme.subtitle}}
											flyoutStyle={{
												strokeWidth: 0,
												fill: "rgba(0, 0, 0, 0)"
											}}
										/>
									}
								/>
								<VictoryScatter
									data={predictionObject.forecast[0].optimalPair}
									x="time"
									y="value"
									y0={() => -0.05}
									size={4}
									style={{
										data: {
											fill: theme.background,
											stroke: "rgb(217, 204, 91)",
											strokeWidth: 3
										}
									}}
								/>
								<VictoryAxis
									dependentAxis
									tickFormat={t => `${t * 100}%`}
									style={{
										axis: {stroke: "none"},
										tickLabels: {fill: theme.subtitle, fontSize: 10}
									}}
								/>
								<VictoryAxis
									crossAxis
									tickFormat={t =>
										t / 12 >= 1
											? t / 12 === 1
												? `${t}PM`
												: `${t - 12}PM`
											: `${t}AM`
									}
									style={{
										axis: {stroke: "none"},
										tickLabels: {fill: theme.subtitle, fontSize: 10}
									}}
								/>
							</VictoryChart>
						</Block>

						<Block
							style={{
								backgroundColor: "rgba(138, 214, 148, 0)",
								marginHorizontal: 40,
								marginTop: 10
							}}
						>
							<Text
								style={[{textAlign: "left", marginBottom: 2}, vars.subtitleText]}
							>
								Optimal time calculated
							</Text>
							<Text style={[{textAlign: "left", marginBottom: 30}, vars.infoText]}>
								{sentence}
							</Text>
							<Text
								style={[{textAlign: "left", marginBottom: 2}, vars.subtitleText]}
							>
								Overall condition
							</Text>
							<Text style={[{textAlign: "left", marginBottom: 30}, vars.infoText]}>
								{predictionObject.forecast[0].summary}
							</Text>
						</Block>
					</Block>
				</Block>
			</Block>
		);
	}
}

const colors = {
	dark: {
		subtitle: 'rgb(185, 185, 185)',
		info: 'rgb(255, 255, 255)',
		component: 'rgb(38, 38, 38)',
		optimalColor: "rgb(136, 193, 101)",
		nonOptimalColor: 'rgb(130, 130, 130)',
		background: 'rgb(26, 26, 26)'
	}
}

const theme = THEMESTYLE === 'dark' ? colors.dark : colors.light

const vars = {
	optimalColor: "rgb(95, 154, 59)",
	nonOptimalColor: "rgb(230, 230, 230)",
	labelWidth: Dimensions.get("window").width - 20,
	labelHeight: Dimensions.get("window").height / 3,
	appTitle: "Castly",
	appColor: {
		background: {
			weather: "rgba(255, 218, 29, 0.62)",
			normal: "rgb(240, 240, 240)",
			dark: "rgb(26, 26, 26)",
			card: "rgb(245, 245, 245)"
		},
		font: {
			normal: "rgb(26, 26, 26)",
			dark: "rgb(235, 235, 235)",
			card: "rgb(26, 26, 26)"
		}
	},
	fontSize: {
		mini: 8,
		small: 10,
		medium: 16,
		large: 20,
		xlarge: 24
	},
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
		paddingTop: 15,
		backgroundColor: "#fff"
	},
	imageBackground: {
		flex: 1,
		resizeMode: "cover",
		width: "100%",
		height: "100%"
	},
	searchBar: {
		height: 50,
		borderColor: vars.appColor.background.card,
		borderRadius: 8,
		backgroundColor: vars.appColor.background.card,
		alignSelf: "stretch",
		elevation: 3,
		flexDirection: "row"
	}
});

import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

let THEMESTYLE = 'dark';

const colors = {
	dark: {
		subtitle: "rgb(185, 185, 185)",
		info: "rgb(255, 255, 255)",
		component: "rgb(38, 38, 38)",
		optimalColor: "rgb(136, 193, 101)",
		nonOptimalColor: "rgb(130, 130, 130)",
		background: "rgb(26, 26, 26)"
	},
	light: {
		subtitle: "rgb(150, 150, 150)",
		info: "rgb(0, 0, 0)",
		component: "rgb(223, 223, 223)",
		optimalColor: "rgb(95, 156, 58)",
		nonOptimalColor: "rgb(200, 200, 200)",
		background: "rgb(255, 255, 255)"
	}
};

const theme = THEMESTYLE === "dark" ? colors.dark : colors.light;

export default function TabBarIcon(props) {
  return (
    <MaterialCommunityIcons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? theme.optimalColor : theme.nonOptimalColor}
    />
  );
}

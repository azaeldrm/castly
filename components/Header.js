import React from "react";
import {
	ScrollView,
	StyleSheet,
	ImageBackground,
	SafeAreaView
} from "react-native";
import {Block, Text, Button, Icon, Input, NavBar} from "galio-framework";

export default function Header(props) {
  return (
    <Block row space={'around'} style={[props.headerStyle,{height: 80, paddingTop: 36}]}>
      <Block>
        <Text p style={[props.textStyle,{textAlign: 'center', fontWeight: 'bold', fontSize: 20, fontFamily: 'Roboto'}]}>
          {props.title}
          </Text>
        </Block>
    </Block>
  );
}

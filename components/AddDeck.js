import React, {Component} from "react";
import {Text, View} from "react-native";
import {styles} from "../utils/styles";

export default class AddDeck extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Add Deck</Text>
            </View>
        )
    }
}